const mailOptions = require("../helpers/otp");
const drHelper = require("../helpers/doctorHelper");
const doctorModel = require("../model/doctor");
const TokenHelper = require("../helpers/tokenHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const appointmentModel = require('../model/appointment')
let doctor; //Doctor details will store here

module.exports = {
// ----------------------------------------------------------------OTP SEND-------------------------------------------------------------------//

  otp: async (req, res) => {
    delete req.body.value.confirmPassword;
    doctor = req.body.value;
    const doctorExist = await doctorModel.findOne({ email: doctor.email });
    if (doctorExist) {
      res.status(404).json({ message: "Email Already Exist" });
    }
      try {
        await mailOptions.sendOtp(doctor.email).then((OTP) => {
          process.env.OTP = OTP;
          res.status(200).json({ message: `Otp send to ${doctor.email}` });
        });
      } catch (error) {
        res.status(500).json({ message: "Unable to send Otp" });
      }
  },

// ----------------------------------------------------------------OTP Verify-------------------------------------------------------------------//

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

// ----------------------------------------------------------------RESEND OTP-------------------------------------------------------------------//

  resendOtp: (req, res) => {
    mailOptions.sendOtp(doctor.email).then((OTP) => {
        process.env.OTP = OTP;
        res.status(200).json({ message: `Otp resend to ${doctor.email}` });
      })
      .catch((error) => {
        res.status(500).json({ message: "We are sorry internal server error" });
      });
  },

// ----------------------------------------------------------------Login-------------------------------------------------------------------//

  Login: async (req, res) => {
    const { email, password } = req.body.value;

    try {
      const doctorDatabase = await doctorModel.findOne({ email });
      if (!doctorDatabase) {
        return res.status(404).json({ message: "Email does not exist" });
      }
      if (doctorDatabase.block) {
        return res.status(404).json({ message: "You are blocked by the admin" });
      }
      const doctorData = await drHelper.doLogin({ email, password },doctorDatabase);
      if (doctorData) {
        const token = await TokenHelper.generateToken(doctorData);
        return res.status(200).json({ token, message: "Login successful!" });
      }
      return res.status(404).json({ message: "Incorrect password" });
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
// ----------------------------------------------------------------FORGOTPASSWORD-------------------------------------------------------------------//

  ForgotPasswordOtp: async (req, res) => {
    doctor = req.body.value;
    const emailVerified = await doctorModel.findOne({ email: doctor.email });

    if (!emailVerified) {
      return res.status(404).json({ message: "Email Doesnot Exist" });
    }

    mailOptions.sendOtp(doctor.email).then((OTP) => {
        process.env.OTP = OTP;
        res.status(200).json({ message: `Otp resend to ${doctor.email}` });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal server error" });
      });
  },

// -----------------------------------------------------------FORGOTPASSWORD OTP VERIFICATION-------------------------------------------------------------------//

  ForgotPasswordOtpVerify: (req, res) => {
    const doctorOTP = req.body.otpCode;
    if (doctorOTP === process.env.OTP) {
      res.status(200).json({ message: "Otp Verified Successfully" });
    } else {
      res.status(404).json({ message: "Incorrect Otp" });
    }
  },
// ----------------------------------------------------------------RESET PASSWORD-------------------------------------------------------------------//

  resetPassword: async (req, res) => {
    const newPassword = req.body.value.password;
    const doctorEmail = doctor.email;
    const doctorDetails = await doctorModel.findOne({ email: doctorEmail });
    const passwordMatch = await bcrypt.compare(newPassword,doctorDetails.password);
    if (passwordMatch) {
      return res
        .status(404)
        .json({ message: "This is Your Previous Password Set a new Password" });
    }
    try {
      await drHelper.resetPassword(doctorEmail, newPassword);
      res.status(200).json({ message: "Password Changed Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to Change the password" });
    }
  },

// -----------------------------------------------------------ADDING DOCTOR ADDITIONAL DETAILS-------------------------------------------------------------------//

  addDoctorDetails: async (req, res) => {
    const { email, ...details } = req.body.value;
    const idCardImage = req.body.IdcardImage;
    const certificateImage = req.body.certificateImage;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Please enter your registered Email" });
    }
    try {
      await doctorModel.updateOne(
        { email },
        { ...details, idCardImage, certificateImage, showRequest: true }
      );
      res.status(200).json({ message: "Verification Submitted successfully!" });
    } catch (error) {
      res.status(404).json({ message: "Unable to upload your Details" });
    }
  },

// --------------------------------------------------------------TOKEN VERIFY-------------------------------------------------------------------//

  tokenVerify: (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.status(200).json({ message: "JWT Verified" });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error });
    }
  },

// --------------------------------------------------------DOCTOR VERIFICATION STATUS-------------------------------------------------------------------//

  verificationStatus: async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const doctor = jwt.decode(token);
      const verificationStatus = await doctorModel.findOne({ _id: doctor.doctorId },{ showRequest: true });
      res.status(200).json(verificationStatus.showRequest);
    } catch (err) {
      console.log(err);
    }
  },

// -------------------------------------------------------------GET DOCTOR DETAILS-------------------------------------------------------------------//
  
  getDoctorDetails: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const doctor = jwt.decode(token);
    const doctorDetails = await doctorModel.findOne({ _id: doctor.doctorId });
    res.status(200).json({ doctorDetails });
  },

// ---------------------------------------------------------------UPDATE PROFILE-------------------------------------------------------------------//

  updateProfile: async (req, res) => {
    try {
      const profilePhoto = req.body.profile;
      const doctorId = req.body.doctorId;
      await doctorModel.updateOne({ _id: doctorId }, { profilePhoto });
      res.status(200).json({ message: "Profile Updated Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Unable to upload the Profile" });
    }
  },

// ---------------------------------------------------------------UPDATE PROFILE-------------------------------------------------------------------//

  updateProfileDetails: async(req,res)=>{

    const details = req.body.details;
    const profileUpdateDetails = Object.fromEntries(Object.entries(details).filter(([key, value]) => value !== null));
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const doctor = jwt.decode(token);
  
    await doctorModel.updateOne({ _id: doctor.doctorId },{ ...profileUpdateDetails }).then((response)=>{
      res.status(200).json({message:"Profile Details updated Successfully"})
    }).catch((error)=>{
      console.log(error)
      res.status(404).json({message:'Unable to update Profile Details'})
    })
  },
// ---------------------------------------------------------------Adding Scheduled time-------------------------------------------------------------------//

  addScheduleTime: async(req,res)=>{
    const { date, startingTime, endingTime,slot } = req.body.details;
    const { doctorId } = jwt.decode(req.headers.authorization?.split(" ")[1]);
    // Checking whether Date is already existed 
    const checkDateExist = await appointmentModel.findOne({doctorId:doctorId,date:date})

    if(checkDateExist){

    }

    new appointmentModel({ date, startingTime, endingTime, doctorId,slot }).save().then((response)=>{
      res.status(200).json({message:`Successfully created an Appointment at ${startingTime} to ${endingTime}`})
    }).catch((err)=>{
      res.status(500).json({message:'Internal server error'})
    })
  },

// ---------------------------------------------------------------Add Scheduled time-------------------------------------------------------------------//

  getScheduledTime: async(req,res)=>{
    const { doctorId } = jwt.decode(req.headers.authorization?.split(" ")[1]);
    await appointmentModel.find({doctorId:doctorId}).then((response)=>{
      res.status(200).json({scheduledTime:response})
    })
  },

// ---------------------------------------------------------------Delete Scheduled time-------------------------------------------------------------------//

  deleteScheduleTime: async(req,res)=>{
   const scheduleTimeId = req.body.scheduledTimeId
   await appointmentModel.deleteOne({_id:scheduleTimeId}).then((response)=>{
    res.status(200).json({message:"Scheduled Time deleted successfully"})
   }).catch((error)=>{
    res.status(404).json({message:'Unable to delete the scheduled time'})
   })
  },
  
// ---------------------------------------------------------------Delete Scheduled time-------------------------------------------------------------------//


};
