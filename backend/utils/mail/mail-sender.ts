import nodemailer from "nodemailer";
import { loadEnv } from "../../utils/dotenv";
loadEnv();

if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD)
  throw new Error("Email or Email password not found in .env file");

interface SendEmailProps {
  email: string;
  title: string;
  htmlBody: string;
}

export const sendEmail = async ({ email, title, htmlBody }: SendEmailProps) => {
  if (!process.env.EMAIL) throw new Error("Email not found in.env file");
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: title,
    html: htmlBody,
  };
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = transporter.sendMail(mailOptions);
    info
      .then((_) => {
        console.log("Email sent");
      })
      .catch((_) => {
        console.log("Email not sent");
      });
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
