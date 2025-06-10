import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { loadEnv } from "../utils/dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { VerifyCallback, VerifyErrors } from "jsonwebtoken";
import { Request } from "express";
import { Cart } from "../models/cart.model";
import { Wishlist } from "../models/wishlist.model";

loadEnv();

export const passportConfiguration = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:4000/api/auth/google/callback",
        passReqToCallback: true,
      },
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
      ) => {
        const email = profile.emails[0].value;
        if (!email) {
          const err = new Error("Google email not found") as VerifyErrors & {
            code?: string;
          };
          err.code = "NO_EMAIL";
          return done(err, undefined);
        }
        try {
          const user = await User.findOne({ email });
          if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(email, salt);
            const newUser = await User.create({
              name: profile.displayName,
              email,
              password: hashedPassword,
              isEmailVerified: true,
            });
            const cart = await Cart.create({ userId: newUser._id });
            const wishlist = await Wishlist.create({ userId: newUser._id });
            newUser.cart = cart._id;
            newUser.wishlist = wishlist._id;
            await newUser.save();
            console.log(newUser);
            return done(null, {
              ...newUser._doc,
              _id: newUser._doc._id.toString(),
              cart: newUser._doc.cart.toString(),
              wishlist: newUser._doc.wishlist.toString(),
            });
          }
          return done(null, {
            ...user._doc,
            _id: user._doc._id.toString(),
            cart: user._doc.cart.toString(),
            wishlist: user._doc.wishlist.toString(),
          });
        } catch (error) {
          console.log(error);
          return done(error as VerifyErrors, undefined);
        }
      }
    )
  );
};
