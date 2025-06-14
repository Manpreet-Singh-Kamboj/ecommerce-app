import express from "express";
import { loadEnv } from "./utils/dotenv";
import authRouter from "./routes/auth.routes";
import connectToDatabase from "./config/database";
import passport from "passport";
import { passportConfiguration } from "./config/passport";
import { generateJwtToken } from "./utils/jwt";
const PORT = process.env.PORT || 5000;
const app = express();

const setupServer = () => {
  app.use(express.json());
  app.use(passport.initialize());
  app.use("/api/auth", authRouter);
  app.get("/api/auth/google", (req, res, next) => {
    const redirectUri = req.query.redirect_uri as string;
    if (!redirectUri) {
      res.status(400).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
      return;
    }
    const state = encodeURIComponent(redirectUri);
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state,
      session: false,
      prompt: "select_account",
    })(req, res, next);
  });

  app.get("/api/auth/google/callback", (req, res, next) => {
    const redirectUri = decodeURIComponent(req.query.state as string);
    if (!redirectUri) {
      res.status(400).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
      return;
    }
    passport.authenticate(
      "google",
      { session: false },
      (
        err: any,
        user?: any,
        info?: object | string | Array<string | undefined>
      ) => {
        if (err || !user) {
          const errorUrl = `${redirectUri}?error=access_denied`;
          return res.redirect(errorUrl);
        }
        const accessTokenPayload = {
          userId: user._id,
          email: user.email,
          role: user.role,
        };
        const accessToken = generateJwtToken({
          jwtPayload: accessTokenPayload,
          jwtExpiry: "30m",
          jwtSecret: process.env.ACCESS_TOKEN_SECRET!,
        });
        const refreshTokenPayload = {
          userId: user._id,
        };
        const refreshToken = generateJwtToken({
          jwtPayload: refreshTokenPayload,
          jwtExpiry: "7d",
          jwtSecret: process.env.REFRESH_TOKEN_SECRET!,
        });
        const successUrl = `${redirectUri}?access_token=${accessToken}&refresh_token=${refreshToken}`;
        return res.redirect(successUrl);
      }
    )(req, res, next);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Server is running");
  });
};

loadEnv();
connectToDatabase();
passportConfiguration();
setupServer();

export default app;
