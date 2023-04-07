const mailOptions = require("../helpers/otp");
const userHelper = require("../helpers/userHelper");
const userModel = require("../model/user");
const TokenHelper = require("../helpers/tokenHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const departmentModel = require("../model/department");
const doctorModel = require("../model/doctor");
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
// ------------------------------------------------------------OTP verification-----------------------------------------------------------------------//
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
            })
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
      mailOptions.sendOtp(user.email).then((OTP) => {
          process.env.OTP = OTP;
          res.status(200).json({ message: `Otp resend to ${user.email}` });
        }).catch(() => {
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
    const passwordMatch = await bcrypt.compare(newPassword,userDetails.password);

    if (passwordMatch) {
      res.status(404).json({ message: "This is Your Previous Password Set a new Password" });
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
        res.status(404).json({error})
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
};
