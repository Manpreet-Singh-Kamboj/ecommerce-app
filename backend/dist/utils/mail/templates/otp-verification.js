"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerificationMail = void 0;
const otpVerificationMail = (otp) => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verify your OTP - Khareedo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #FCFCFC;
      color: #231F20;
      padding: 40px 20px;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FCFCFC;
      border-radius: 18px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .email-header {
      background-color: #231F20;
      color: #FCFCFC;
      padding: 24px;
      text-align: center;
    }
    .email-header h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .email-header p {
      font-size: 14px;
      color: #ccc;
    }
    .email-body {
      padding: 30px 24px;
    }
    .email-body h2 {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 24px;
    }
    .otp-box {
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 12px;
      color: #FCFCFC;
      background-color: #231F20;
      padding: 16px 0;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }
    .note {
      font-size: 13px;
      color: #777;
      text-align: center;
    }
    .email-footer {
      text-align: center;
      font-size: 12px;
      color: #aaa;
      padding: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <h1>Khareedo</h1>
      <p>Your favorite shopping destination</p>
    </div>
    <div class="email-body">
      <h2>Verify Your Email</h2>
      <p>Hey there 👋<br><br>
      Use the following OTP to complete your sign-in process. It’s valid for the next <strong>5 minutes</strong>.</p>
      <div class="otp-box">${otp}</div>
      <p class="note">Please do not share this code with anyone for security reasons.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Khareedo. All rights reserved.<br>
      123 Fashion Avenue, New York, NY
    </div>
  </div>
</body>
</html>
    `;
};
exports.otpVerificationMail = otpVerificationMail;
