const mailOptions = require("../helpers/otp");
const userHelper = require("../helpers/userHelper");
const userModel = require("../model/user");
const TokenHelper = require("../helpers/tokenHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const departmentModel = require("../model/department");
const doctorModel = require("../model/doctor");
const AppointmentModel = require('../model/appointment')

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

  TokenVerify: (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
      const jwtVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(jwtVerify);
      res.status(200).json({ message: "JWT Verified" });
    } catch (error) {
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
      const doctors = await doctorModel.find({ verificationStatus: true });
      res.status(200).json({ doctors });
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
  },

  // ---------------------------------------------------------------------------View Doctors--------------------------------------------------------//

  departmentSearchResult: (req, res) => {
    const search = req.body.search.trim();
    const regex = new RegExp(search.split(/\s+/).join("|"), "i");
    const fieldsToSearch = ["departmentName", "departmentDiscription"];
    const searchPromise = departmentModel
      .find({ $or: fieldsToSearch.map((field) => ({ [field]: regex })) })
      .exec();

    searchPromise
      .then((results) => {
        res.status(200).json({ results });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .json({ message: "Unable to process your search request" });
      });
  },

  // ---------------------------------------------------------------------------View Doctors--------------------------------------------------------//

  doctorSearchResult: (req, res) => {
    const search = req.body.search;
    const regex = new RegExp(search.split(/\s+/).join("|"), "i");
    const fieldsToSearch = ["firstName", "lastName", "departmentName"];
    const searchPromise = doctorModel
      .find({ $or: fieldsToSearch.map((field) => ({ [field]: regex })) }).exec();

    searchPromise
      .then((results) => {
        res.status(200).json({ results });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .json({ message: "Unable to process your search request" });
      });
  },

  // ---------------------------------------------------------------------------View Doctors--------------------------------------------------------//

  findDoctorDepartment: async (req, res) => {
    try {
      const department = req.body.departmentName.trim();
      const doctors = await doctorModel.find({ departmentName: department });
      res.status(200).json({ doctors });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
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
    await AppointmentModel.find({doctorId:doctor}).then((response)=>{
      res.status(200).json({bookingDetails:response})
    }).catch((error)=>{
      console.log(error)
      res.status(500).json({message:'Internal Server Error'})
    })
  }
};
