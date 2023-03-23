const mailOptions = require("../helpers/otp");
const Helper = require('../helpers/doctorHelper')

require('dotenv').config()
let doctor;

module.exports = {
  otp: async (req, res) => {
    delete req.body.value.confirmPassword;
    doctor = req.body.value;
    await mailOptions.sendOtp(doctor.email).then((OTP) => {
      process.env.OTP = OTP;
      res.status(200).json({ message: `Otp send to ${doctor.email}` });
    });
  },
  otpVerify: (req, res) => {
    let doctorOTP = req.body.otpCode;
    let OTP = process.env.OTP;
    console.log(OTP)
    if (doctorOTP === OTP) {
      Helper.drStore(doctor).then((response) => {
        if (response.status) {
          res.status(200).json({ message: "Successfully registered" });
        } else {
          res.status(404).json({ message: "An error occured" });
        }
      });
    } else {
      res.status(401).json({ message: "Incorrect Otp" });
    }
  },
};
