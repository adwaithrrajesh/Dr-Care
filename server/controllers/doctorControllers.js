const mailOptions = require("../helpers/otp");
const drHelper = require("../helpers/doctorHelper");
const doctorModel = require("../model/doctor");
const TokenHelper = require('../helpers/tokenHelper')
const bcrypt = require('bcrypt')
require("dotenv").config();
let doctor; //Doctor details will store here

module.exports = {
  otp: async (req, res) => {
    delete req.body.value.confirmPassword;
    doctor = req.body.value;
    const doctorExist = await doctorModel.findOne({ email: doctor.email });
    if (doctorExist) {
      res.status(404).json({ message: "Email Already Exist" });
    } else {
      await mailOptions.sendOtp(doctor.email).then((OTP) => {
        process.env.OTP = OTP;
        res.status(200).json({ message: `Otp send to ${doctor.email}` });
      });
    }
  },

  otpVerify: (req, res) => {
    let doctorOTP = req.body.otpCode;
    let OTP = process.env.OTP;

    if (doctorOTP === OTP) {
      drHelper.drStore(doctor).then((response) => {
        if (response) {
          res.status(200).json({ message: "Successfully registered" });
        } else {
          res.status(404).json({ message: "An error occured" });
        }
      });
    } else {
      res.status(401).json({ message: "Incorrect Otp" });
    }
  },
  resendOtp: (req, res) => {
    mailOptions.sendOtp(doctor.email).then((OTP) => {
        process.env.OTP = OTP;
        res.status(200).json({ message: `Otp resend to ${doctor.email}` });
      })
      .catch((error) => {
        res.status(500).json({ message: "We are sorry internal server error" });
      });
  },
  Login: async (req, res) => {
    const doctor = req.body.value;
    const doctorDatabase = await doctorModel.findOne({ email: doctor.email });
    if (!doctorDatabase) {
      res.status(404).json({ message: "Email doesnot exist" });
    } else {
      drHelper.doLogin(doctor,doctorDatabase).then((response) => {
        if (response) {
          const doctorData = response;
          TokenHelper.generateToken(doctorData).then((token) => {
            res.status(200).json({ token, message: "Login successful!" });
          });
        } else {
          res.status(404).json({ message: "Incorrect Password" });
        }
      });
    }
  },
  ForgotPasswordOtp:async(req,res)=>{
    doctor = req.body.value
    const Emailverfied = await doctorModel.findOne({email:doctor.email})
    if(Emailverfied){
        mailOptions.sendOtp(doctor.email).then((OTP)=>{
            process.env.OTP = OTP
            res.status(200).json({message:`Otp resend to ${doctor.email}`})
        }).catch((error)=>{
            res.status(500).json({message:'Internal server error'})
        })
    }else{
        res.status(404).json({message:'Email Doesnot Exist'})
    }
  },
  ForgotPasswordOtpVerify:(req,res)=>{
    const doctorOTP  = req.body.otpCode
    if(doctorOTP === process.env.OTP){
        res.status(200).json({message:'Otp Verified Successfully'})
    }else{
        res.status(404).json({message:'Incorrect Otp'})
    }
  },
  resetPassword: async(req,res)=>{
        const newPassword = req.body.value.password
        const doctorEmail = doctor.email
        const doctorDetails = await doctorModel.findOne({email:doctorEmail})
        const passwordMatch = await bcrypt.compare(newPassword,doctorDetails.password)
        
        if(passwordMatch){
            res.status(404).json({message:'This is Your Previous Password Set a new Password'})
        }else{
            drHelper.resetPassword(doctorEmail,newPassword).then((response)=>{
                if(response){
                    res.status(200).json({message:'Password Changed Successfully'})
                }else{
                    res.status(404).json({message:'Unable to Change the password'})
                }
            })
        }
  }
};
