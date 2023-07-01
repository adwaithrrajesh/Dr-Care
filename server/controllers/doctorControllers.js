const mailOptions = require("../helpers/otp");
const drHelper = require("../helpers/doctorHelper");
const doctorModel = require("../model/doctor");
const TokenHelper = require("../helpers/tokenHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const appointmentModel = require('../model/appointment')
const bookedAppointmentModel = require('../model/bookedAppointments');
const userModel = require('../model/user');
const doctorHelper = require("../helpers/doctorHelper");

let doctor; //Doctor details will store here

module.exports = {
// ----------------------------------------------------------------OTP SEND-------------------------------------------------------------------//

  otp: async (req, res) => {
    delete req.body.value.confirmPassword;
    doctor = req.body.value;
    const doctorExist = await doctorModel.findOne({ email: doctor.email });
    if (doctorExist) {
      res.status(404).json({ message: "Email Already Exist" });
    }else{  
      try {
        await mailOptions.sendOtp(doctor.email).then((OTP) => {
          process.env.OTP = OTP;
          res.status(200).json({ message: `Otp send to ${doctor.email}` });
        });
      } catch (error) {
        res.status(500).json({ message: "Unable to send Otp" });
      }
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
    const { ...details } = req.body.value;
    const idCardImage = req.body.IdcardImage;
    const certificateImage = req.body.certificateImage;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const doctor = jwt.decode(token);
    try {
      await doctorModel.updateOne({ _id: doctor.doctorId },{ ...details, idCardImage, certificateImage, showRequest: true });
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
      res.status(404).json({message:'Schedule already exist'})
    }else{
      new appointmentModel({ date, startingTime, endingTime, doctorId,slot }).save().then((response)=>{
      res.status(200).json({message:`Successfully created an Appointment at ${startingTime} to ${endingTime}`})
    }).catch((err)=>{
      res.status(500).json({message:'Internal server error'})
    })
    }
  },

// ---------------------------------------------------------------Add Scheduled time-------------------------------------------------------------------//

  getScheduledTime: async(req,res)=>{
    const { doctorId } = jwt.decode(req.headers.authorization?.split(" ")[1]);
    if(doctorId){
      await appointmentModel.find({doctorId:doctorId}).then((response)=>{
        res.status(200).json({scheduledTime:response})
      })
    }else{
      res.status(500).json({message:'Internal Server Error'})
    }
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
  
// ---------------------------------------------------------------GET BOOKED APPOINTMENTS-------------------------------------------------------------------//
getBookedAppointments: async(req,res)=>{
  try {    
    // Finding UserId 
    const token = req?.headers["authorization"]?.split(" ")[1];
    const doctor = await doctorModel.findOne({_id: jwt?.verify(token, process.env.JWT_SECRET_KEY)?.doctorId})
    const appointments = await bookedAppointmentModel.find({doctorId:doctor._id, cancelled: false,appointmentStatus: { $nin: [false, true] } }).populate('userId')
    res.status(200).json({appointments: appointments})
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'})
  }
},

// ---------------------------------------------------------------FILTERING APPOINTMENTS BY DATE-------------------------------------------------------------------//

filterAppointmentsByDate: async(req,res)=>{
  try{
    const token = req?.headers["authorization"]?.split(" ")[1];
    const doctor = await doctorModel.findOne({_id: jwt?.verify(token, process.env.JWT_SECRET_KEY)?.doctorId})
    const date = req.body.date
    const appointments = await bookedAppointmentModel.find({doctorId:doctor._id,date:date,cancelled:false}).sort({date: -1}).populate('userId')
    res.status(200).json({filteredAppointments:appointments})
  }catch(error){
    res.status(404).json({message:'Unable to process your request'})
  }
},

// ---------------------------------------------------------------CANCEL APPOINTMENT-------------------------------------------------------------------//

cancelAppointment: async(req,res)=>{
  try {
    const { appointmentId } = req.body;
    await bookedAppointmentModel.updateOne({ _id: appointmentId }, { appointmentStatus: false });
    const { amountPaid, userId, appointmentIdFromBookedAppointments } = await bookedAppointmentModel.findOne({ _id: appointmentId });
    await userModel.findByIdAndUpdate(userId, { $inc: { wallet: amountPaid } });
    await appointmentModel.updateOne({ _id: appointmentIdFromBookedAppointments }, { $inc: { slot: 1 } });
    res.json({ message: 'Appointment Cancelled Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
},

// --------------------------------------------------------------- PATIENT VISITED CLINIC -------------------------------------------------------------------//

patientVisitedClinic:async(req,res)=>{
  try {
  const appointmentId = req.body.appointmentId
  await bookedAppointmentModel.updateOne({_id:appointmentId},{$set:{appointmentStatus:true}}).then(()=>{
    res.status(200).json({message:"Patient visited you clinic"})
  }) 
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'})
  }
},

// --------------------------------------------------------------------------GETTING DASHBOARD COUNT-------------------------------------------------------------//

getDashboardDetails : async(req,res) =>{
  try {
    const { doctorId } = req;
    const visitedAppointments = await bookedAppointmentModel.find({ doctorId, appointmentStatus: true });
    const visitedPatients = visitedAppointments.length;
    const totalRevenue = visitedAppointments.reduce((sum, { amountPaid }) => sum + amountPaid, 0);
    const cancelledAppointments = await bookedAppointmentModel.countDocuments({ doctorId, appointmentStatus: false });
    const bookedAppointments = await bookedAppointmentModel.countDocuments({ doctorId, cancelled: false, appointmentStatus: { $nin: [false, true] } });
    res.status(200).json({ visitedPatients, totalRevenue, cancelledAppointments, bookedAppointments })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

},

// ---------------------------------------------------------------------------GETTING APPOINTMENT DETAILS WITH ID-----------------------------------------------------------//

getAppointmentDetailsWithId: async(req,res) =>{
  try {
  const appointmentId = req.body.appointmentId
  const appointment = await appointmentModel.findOne({_id:appointmentId})
  res.status(200).json({appointment:appointment})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
  }

},

// ---------------------------------------------------------------------------EDITING APPOINTMENT-----------------------------------------------------------//

editAppointmentDetails: async(req,res)=>{
  const {appointmentId,startingTime,endingTime,slot}= req.body
  try {
    const updatedAppointment = await appointmentModel.findOneAndUpdate({ _id: appointmentId },{ startingTime, endingTime, slot },{ new: true });
    res.status(200).json({message:"Appointment Updated Successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
},

// ---------------------------------------------------------------------------GETTING APPOINTMENT GRAPH DETAILS -----------------------------------------------------------//

getAppointmentGraph: async(req,res)=>{
  try {
  const doctorId = req.doctorId
  const graphDetails = await doctorHelper.getAppointmentGraph(doctorId)
  res.status(200).json({graphDetails:graphDetails})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
},

// ---------------------------------------------------------------------------GETTING CHATTABLE USERS-----------------------------------------------------------//

getChattableUsers: async(req,res)=>{
  try {
    const doctorId = req.doctorId
    const userIds = await bookedAppointmentModel.distinct("userId", { doctorId })
    const users = await userModel.find({ _id: userIds});
    res.status(200).json({chattableUsers:users})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
},

// ---------------------------------------------------------------------------GETTING USER DETAILS WITH ID -----------------------------------------------------------//

getUserDetailsWithId: async(req,res)=>{
  try {
    const {userId} = req.body
    const userDetails = await userModel.findOne({_id:userId})
    res.status(200).json({userDetails:userDetails})
  } catch (error) {
    res.status(500).json({message:"Internal server error"})
  }
},

// ---------------------------------------------------------------------------GETTING SCHEDULED TIME WITH ID -----------------------------------------------------------//

getScheduledTimeWithId: async(req,res)=>{
  try {
    const {appointmentId} = req.body
    const scheduledTime = await appointmentModel.findOne({_id:appointmentId})
    res.status(200).json({scheduledTime:scheduledTime})
  } catch (error) {
    res.status(500).json({message:"Internal server error"})
  }
}




};
