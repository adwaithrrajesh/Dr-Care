const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
require('dotenv').config()


module.exports = {

// ----------------------------------------------------------------SENDING OTP-------------------------------------------------------------------//

  sendOtp: (mail) => {
    return new Promise(async(resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.OTP_EMAIL,
          pass: process.env.OTP_PASSWORD,
        },
      });
    
      const OTP = otpGenerator.generate(6, { digits: true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false });
    
      const mailOptions = {
        from: process.env.OTP_EMAIL,
        to: mail,
        subject: 'OTP Verification',
        html: `<h1>Here is your OTP Verification code : ${OTP}</h1>`,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        resolve(OTP)
      } catch (error) {
        resolve(error)
      }
    });
  }
};