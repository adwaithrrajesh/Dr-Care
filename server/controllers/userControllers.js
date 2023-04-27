const mailOptions = require("../helpers/otp");
const userHelper = require("../helpers/userHelper");
const userModel = require("../model/user");
const TokenHelper = require("../helpers/tokenHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const departmentModel = require("../model/department");
const doctorModel = require("../model/doctor");
const AppointmentModel = require('../model/appointment')
const Razorpay = require('razorpay')
const crypto = require('crypto');
const bookedAppointmentModel = require('../model/bookedAppointments')
require('dotenv').config()


let user;

module.exports = {
  // ----------------------------------------------------------------OTP-------------------------------------------------------------------//

  otp: async (req, res) => {
    delete req.body.value.confirmPassword;
    user = req.body.value;
    const userExist = await userModel.findOne({ email: user.email });
    if (!userExist) {
      await mailOptions.sendOtp(user.email).then((OTP) => {
        process.env.OTP = OTP;
        res.status(200).json({ message: `Otp send to ${user.email}` });
      });
    } else {
      res.status(404).json({ message: "Email already exist" });
    }
  },
  // ------------------------------------------------------------OTP verification--------------------------------------------------------------------//
  otpVerify: (req, res) => {
    let userOTP = req.body.otpCode;
    let OTP = process.env.OTP;

    if (userOTP === OTP) {
      userHelper.userStore(user).then((response) => {
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
  // ---------------------------------------------------------------------Resend Otp--------------------------------------------------------------//
  resendOtp: (req, res) => {
    mailOptions
      .sendOtp(user.email)
      .then((OTP) => {
        process.env.OTP = OTP;
        res.status(200).json({ message: `Otp resend to ${user.email}` });
      })
      .catch(() => {
        res.status(500).json({ message: "We are sorry internal server error" });
      });
  },
  // ------------------------------------------------------------------LOGIN-----------------------------------------------------------------//

  login: async (req, res) => {
    const user = req.body.value;
    const userDatabase = await userModel.findOne({ email: user.email });
    if (!userDatabase) {
      res.status(404).json({ message: "Invalid Email" });
    } else {
      if (userDatabase.block) {
        res.status(404).json({ message: "You are blocked by the Admin" });
      } else {
        userHelper.doLogin(user, userDatabase).then((response) => {
          if (response) {
            const userData = response;
            TokenHelper.generateToken(userData).then((token) => {
              res.status(200).json({ token, message: "Login successful!" });
            });
          } else {
            res.status(404).json({ message: "Incorrect Password" });
          }
        });
      }
    }
  },
  // -------------------------------------------------------------------Forgot Password----------------------------------------------------------------//
  ForgotPasswordOtp: async (req, res) => {
    user = req.body.value;
    const Emailverfied = await userModel.findOne({ email: user.email });
    if (Emailverfied) {
      mailOptions
        .sendOtp(user.email)
        .then((OTP) => {
          process.env.OTP = OTP;
          res.status(200).json({ message: `Otp resend to ${user.email}` });
        })
        .catch(() => {
          res.status(500).json({ message: "Internal server error" });
        });
    } else {
      res.status(404).json({ message: "Email Doesnot Exist" });
    }
  },
  // ----------------------------------------------------------------------Forgot password Otp verification------------------------------------------------//
  ForgotPasswordOtpVerify: (req, res) => {
    const userOTP = req.body.otpCode;
    if (userOTP === process.env.OTP) {
      res.status(200).json({ message: "Otp Verified Successfully" });
    } else {
      res.status(404).json({ message: "Incorrect Otp" });
    }
  },
  // ----------------------------------------------------------------------Reset Password-------------------------------------------------------------//

  resetPassword: async (req, res) => {
    const newPassword = req.body.value.password;
    const userEmail = user.email;
    const userDetails = await userModel.findOne({ email: userEmail });
    const passwordMatch = await bcrypt.compare(
      newPassword,
      userDetails.password
    );

    if (passwordMatch) {
      res
        .status(404)
        .json({ message: "This is Your Previous Password Set a new Password" });
    } else {
      userHelper.resetPassword(userEmail, newPassword).then((response) => {
        if (response) {
          res.status(200).json({ message: "Password Changed Successfully" });
        } else {
          res.status(404).json({ message: "Unable to Change the password" });
        }
      });
    }
  },
  // ------------------------------------------------------------------------Token Verification-----------------------------------------------------------//

  TokenVerify: async(req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)
    try {
      const jwtVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findOne({_id:jwtVerify.userId})
      if(user.block == false){
        res.status(200).json({ message: "JWT Verified" });
      }else{
        res.status(404).json({message:"userBlocked"})
      }
    } catch (error) {
      console.log(error)
      res.status(404).json({ error });
    }
  },
  // --------------------------------------------------------------------------View Department---------------------------------------------------------//

  viewDepartments: async (req, res) => {
    const departments = await departmentModel.find({ show: true });
    res.status(200).json({ departments });
  },
  // ---------------------------------------------------------------------------View Doctors--------------------------------------------------------//
  viewDoctors: async (req, res) => {
    try {
      const doctors = await doctorModel.find({ verificationStatus: true, block:false });
      res.status(200).json({ doctors });
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
  },

  // ---------------------------------------------------------------------------Search Department--------------------------------------------------------//

  departmentSearchResult: (req, res) => {
    const search = req.body.search.trim();
    const regex = new RegExp(search.split(/\s+/).join("|"), "i");
    const fieldsToSearch = ["departmentName", "departmentDiscription"];
    const searchPromise = departmentModel.find({
      $and: [{ $or: fieldsToSearch.map((field) => ({ [field]: regex })) },{ show: true }]}).exec();

    searchPromise.then((results) => {
        res.status(200).json({ results });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .json({ message: "Unable to process your search request" });
      });
  },

  // ---------------------------------------------------------------------------Fetching Doctors--------------------------------------------------------//
  fetchDoctor: async (req, res) => {

    const departmentName = req.query.department.trim() ?? null
    const search = req.query.search ?? null
    const sort = req.query.sort ?? undefined
    const filter = req.query.filter ?? undefined

    let query = {
      block: false,
      verificationStatus: true,
    }
    let sortBy ={}

    if(departmentName !== 'undefined'){
      departmentName && (query.departmentName = departmentName)
    }
    if(search !== 'undefined'){
      search && (query.firstName = { $regex: new RegExp(`^${search}.*`, "i") })
    }
      sort && (sort === 'priceDescending' && (sortBy.fee = -1))
      sort && (sort === 'priceAscending' && (sortBy.fee = 1))
      sort && (sort === 'experienceAscending' && (sortBy.experience = 1))
      sort && (sort === 'experienceDescending' && (sortBy.experience = -1))
    
      filter && (filter === '500-800' && (query.fee = {$gte:500 ,$lte:800}))
      filter && (filter === '800-1000' && (query.fee = {$gte:800 ,$lte:1000}))
      filter && (filter === '1000-2000' && (query.fee = {$gte:1000 ,$lte:2000}))
    
  doctorModel.find(query).sort(sortBy).then((response)=>{
    res.status(200).json({doctorDetails:response})
  }).catch((error)=>{
    res.status(500).json('Internal Server error')
  })

  },
  // ---------------------------------------------------------------------------Fetch Doctor With Id --------------------------------------------------------//
  fetchDoctorWithId: async(req,res)=>{
    const doctorId = req.body.doctorId
    await doctorModel.findOne({_id:doctorId}).then((response)=>{
      res.status(200).json({doctorDatas:response})
    }).catch((error)=>{
      res.status(500).json({message:'Internal server error'})
    })
  },
  // ---------------------------------------------------------------------------Fetch Doctor With Id --------------------------------------------------------//
  getBookingDetails: async(req,res)=>{
    const doctor = req.body.doctorId
    const fee = await doctorModel.findOne({_id:doctor})
    await AppointmentModel.find({doctorId:doctor,slot:{ $gt: 0 }}).then((response)=>{
      res.status(200).json({bookingDetails:response,fee:fee.fee})
    }).catch((error)=>{
      console.log(error)
      res.status(500).json({message:'Internal Server Error'})
    })
  },
  // ---------------------------------------------------------------------------Initializing Payment --------------------------------------------------------//
  initializePayment: async(req,res)=>{
    const { doctorId } = req.body;
    const { fee: order } = await doctorModel.findOne({ _id: doctorId });
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  var options = {
    amount: order * 100,
    currency: 'INR'
  }
  instance.orders.create(options, function (err, order) {
    if (err) {
        res.status(500).json({message:'Internal Server Error'})
    }
    res.status(200).json({ order: order })
})
  },

  // ---------------------------------------------------------------------------Verifying Payment --------------------------------------------------------//

  verifyPayment:async(req,res)=>{
    const userId = req.userId
    const { appointmentId, response } = req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");   
    
    if (razorpay_signature === expectedSignature) {
      userHelper.bookAppointment(userId,appointmentId).then((response)=>{
        res.status(200).json({message:'Successfully Booked an Appointment'})
      }).catch((error)=>{
        res.status(404).json({message:'Unable to Book an Appointment'})
      })
    }else{
      res.status(404).json({message:"Unable to book an Appointment"})
    }
    
  },
  // ---------------------------------------------------------------------------Getting User Profile Picture --------------------------------------------------------//

  getUserProfilePhoto: async(req,res)=>{
    try {      
      const userId = req.userId   
      const user = await userModel.findOne({_id:userId})
      res.status(200).json({profilePhoto:user.profilePhoto})
    } catch (error) {
      res.status(500).json({message:"internal Server Error"})
    }
  },

  // ---------------------------------------------------------------------------Getting User Details --------------------------------------------------------//
  getUserDetails: async(req,res)=>{
    try {
     const userId = req.userId 
     const user = await userModel.findOne({_id: userId});
     res.status(200).json({userDetails:user})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Internal Server Error'})
    }
  },

  // ---------------------------------------------------------------------------UPDATE PROFILE PHOTO --------------------------------------------------------//

  updateProfilePhoto: async(req,res)=>{
    const userId = req.body.userId
    const profilePhoto = req.body.profile
    await userModel.updateOne({_id:userId},{profilePhoto}).then((response)=>{
      res.status(200).json({message:"Profile Photo updated"})
    }).catch((error)=>{
      res.status(500).json({message:'Unable to update Profile Photo'})
    })
  },

  // ---------------------------------------------------------------------------UPDATE PROFILE PHOTO --------------------------------------------------------//

  updateProfileDetails: async(req,res)=>{
    const userId = req.userId 
    const details = req.body.details
    const profileUpdateDetails = Object.fromEntries(Object.entries(details).filter(([key, value]) => value !== null))
    await userModel.updateOne({_id:userId},{...profileUpdateDetails}).then((response)=>{
      res.status(200).json({message:"Profile Details uploaded Successfully"})
    }).catch((error)=>{
      res.status(404).json({message:'Unable to update profile Details'})
    })
  },

  // ---------------------------------------------------------------------------GETTING BOOKED APPOINTMENTS --------------------------------------------------------//

  getBookedAppointments: async(req,res)=>{
    try {    
      const userId = req.userId
      // Finding Appointments Which user is existed
      const appointments = await bookedAppointmentModel.find({userId:userId, cancelled: false}).populate('doctorId').populate('userId')
      res.status(200).json({appointments: appointments})
    } catch (error) {
      res.status(500).json({message:'Internal Server Error'})
    }
  },

  // ---------------------------------------------------------------------------CANCELLING APPOINTMENT--------------------------------------------------------//

  cancelAppointment: async(req,res)=>{
    try {     
      const bookedAppointmentId = req.body.AppointmentId
      await bookedAppointmentModel.updateOne({_id:bookedAppointmentId},{$set:{ cancelled:true}}).then(async(response)=>{
        const Appointment = await bookedAppointmentModel.findOne({_id:bookedAppointmentId})
        const appointmentId = Appointment.appointmentId
        const userId = Appointment.userId
        const amountPaid = Appointment.amountPaid
        // Increasing Slot
        const slotIncrease = await AppointmentModel.findByIdAndUpdate(appointmentId,{ $inc: { slot: 1 } },{ new: true });
        if(slotIncrease){
          const refundMoney = await userModel.findByIdAndUpdate(userId,{$inc:{wallet:amountPaid}},{new:true})
          res.status(200).json({message:`Appointment Cancelled Successfully and ₹${amountPaid} credited to your wallet`})
        }else{
          res.status(404).json({message:"Unable to defund money"})
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Internal Server Error'})
    }

  },

  // --------------------------------------------------------------------------- GETTING WALLET BALANCE--------------------------------------------------------//

  getWalletBalance: async(req,res)=>{
    try {  
      // Finding UserId 
      const token = req?.headers["authorization"]?.split(" ")[1];
      const user = await userModel.findOne({_id: jwt?.verify(token, process.env.JWT_SECRET_KEY)?.userId})
      const walletBalance = user.wallet
      res.status(200).json({walletBalance:walletBalance})
    } catch (error) {
      res.status(404).json({message:"An unknown error Occured Please try again later"})
    }
  },

  // ---------------------------------------------------------------------------GET CANCELLED APPOINTMENTS--------------------------------------------------------//

  getCancelledAppointments: async(req,res)=>{
    const userId = req.userId
    const appointments = await bookedAppointmentModel.find({userId:userId, cancelled: true}).populate('doctorId')
    res.status(200).json({appointments: appointments})
  },

  // ---------------------------------------------------------------------------DOING WALLET PAYMENT--------------------------------------------------------//

  doWalletPayment: async(req,res)=>{
    const userId = req.userId
    try {
      const { wallet } = await userModel.findOne({_id:userId})
   const { fee } = await doctorModel.findOne({_id:req.body.doctorId})
   const appointmentId = req.body.appointmentId
   if(fee <= wallet) {
    const updatedWalletBalance = wallet - fee;
    userHelper.bookAppointment(userId,appointmentId).then(async(response)=>{
    // Debit from wallet 
    const debitMoney =  await userModel.updateOne({_id:userId}, { $set: { wallet: updatedWalletBalance } });
    res.status(200).json({message:'Successfully Booked an Appointment'})
    }).catch((error)=>{
    res.status(404).json({message:'Unable to Book an Appointment'})
    })
   } else {
   res.status(404).json({message:"Not enough balance in your wallet"})
   }
    } catch (error) {
      res.statu(500).json("Internal Server error")
    }
   
  },

  // -----------------------------------------------------------------------------------------------------------------------------------//


};
