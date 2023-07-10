const bcrypt = require("bcrypt");
const adminModel = require("../model/admin");
const adminHelper = require("../helpers/adminHelper");
const jwt = require("jsonwebtoken");
const TokenHelper = require("../helpers/tokenHelper");
const userModel = require("../model/user");
const doctorModel = require("../model/doctor");
const departmentModel = require("../model/department");
const bookedAppointments = require("../model/bookedAppointments");
const reportModel = require('../model/report')

module.exports = {

// ----------------------------------------------------------------LOGIN-------------------------------------------------------------------//
  
  login: async (req, res) => { 
    const admin = req.body.value;
    const adminDetails = await adminModel.findOne({ email: admin.email });
    if (!adminDetails) {
      return res.status(404).json({ message: "Email not found" });
    }
    try {
      const adminData = await adminHelper.doLogin(admin, adminDetails)
      if(adminData){
        const token = await TokenHelper.generateToken(adminData);
        res.status(200).json({ token, message: "Login successful!" });
      }else{
        res.status(404).json({message:'Incorrect Password'})
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
// ----------------------------------------------------------------GET USER-------------------------------------------------------------------//

  getUsers: async (req, res) => {
    try {
    const users = await userModel.find();
    res.status(200).json({ users });
    } catch (error) {
       console.log(error)
    }
  },

// ----------------------------------------------------------------GET DOCTORS-------------------------------------------------------------------//

  getDoctors: async (req, res) => {
    const doctors = await doctorModel.find();
    res.status(200).json({ doctors });
  },

// ----------------------------------------------------------------ADD DEPARTMENT-------------------------------------------------------------------//

  addDepartment: async(req, res) => {
    const departmentImage = req.body.departmentImage
    const { departmentName, departmentDiscription } = req.body.value;
    const department = { departmentName, departmentDiscription, departmentImage }
    try {
      const departmentExist = await departmentModel.findOne({ departmentName: { $regex: new RegExp(`^${departmentName}$`, 'i') } });
      if (departmentExist) {
        return res.status(404).json({ message: 'Department Already Exist' });
      }else{
        await departmentModel.create(department);
        return res.status(200).json({ message: `${departmentName} added Successfully` });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

// ----------------------------------------------------------------VIEW DEPARTMENTS-------------------------------------------------------------------//

  viewDepartments: async (req, res) => {
    try {
    const departments = await departmentModel.find();
    res.status(200).json({ departments });
    } catch (error) {
      res.status(500).json({message:'Internal Server Error'})
    }
  },

// ----------------------------------------------------------------BLOCK USER-------------------------------------------------------------------//

  blockUser: async (req, res) => {
    try {
      const userId = req.body.userId;
      const userExist = await userModel.findOne({ _id: userId });
      if (!userExist) {
        return res.status(404).json({ message: "Invalid UserId" });
      }
      await userModel.updateOne({ _id: userId }, { $set: { block: true } });
      return res.status(200).json({ message: "User Blocked Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Unable to Unblock the User" });
    }
  },

// ----------------------------------------------------------------UNBLOCK USER-------------------------------------------------------------------//

unblockUser: async (req, res) => {
  try {
    const userId = req.body.userId;
    const userExist = await userModel.findOne({ _id: userId });

    if (!userExist) {
      return res.status(404).json({ message: "Invalid UserId" });
    }

    await userModel.updateOne({ _id: userId }, { $set: { block: false } });
    return res.status(200).json({ message: "User Unblocked Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Unable to Unblock the User" });
  }
}


// ----------------------------------------------------------------BLOCK DOCTOR-------------------------------------------------------------------//

blockDoctor: async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const doctorExist = await doctorModel.findOne({ _id: doctorId });
    if (!doctorExist) {
      return res.status(404).json({ message: "Invalid Doctor Id" });
    }
    await doctorModel.updateOne({ _id: doctorId }, { $set: { block: true } });
    return res.status(200).json({ message: "Doctor Blocked Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Unable to Block the Doctor" });
  }
}


// ----------------------------------------------------------------UNBLOCK DOCTOR-------------------------------------------------------------------//

  unBlockDoctor: async (req, res) => {
    const doctorId = req.body.doctorId;
    try {
      const doctorExist = await doctorModel.findOne({_id:doctorId})
      if(doctorExist){
        await doctorModel.updateOne({ _id: doctorId },{ $set: { block: false } });
        res.status(200).json({ message: "Doctor unblocked Successfully" });
      }else{
        res.status(404).json({message:"Invalid Doctor Id"})
      }
    } catch (error) {
      res.status(404).json({ message: "Unable to unblock the Doctor" });
    }
  },

// ----------------------------------------------------------------HIDE DEPARTMENT-------------------------------------------------------------------//

  hideDepartment: async (req, res) => {
    const departmentId = req.body.departmentId;
    try {
      const departmentExist = await departmentModel.findOne({_id:departmentId})
      if(departmentExist){
        await departmentModel.updateOne({ _id: departmentId },{ $set: { show: false } });
        res.status(200).json({ message: "Department Hidden successfully" });
      }else{
        res.status(404).json({message:"Invalid Department Id"})
      }
    } catch (error) {
      res.status(404).json({ message: "Unable to hide the department" });
    }
  },

// ----------------------------------------------------------------SHOW DEPARTMENT-------------------------------------------------------------------//

  showDepartment: async (req, res) => {
    const departmentId = req.body.departmentId;
    try {
      const departmentExist = await departmentModel.findOne({_id:departmentId})
      if(departmentExist){
      await departmentModel.updateOne({ _id: departmentId },{$set: {show: true}})
      res.status(200).json({message:'Department shown successfully'})
      }else{
        res.status(404).json({message:"Invalid Department Id"})
      }
    } catch (error) {
      res.status(404).json({message:'Unable to show the department'})
    }
  },

// ----------------------------------------------------------------GET VERIFICATION REQUESTS---------------------------------------------------------//

  getVerificationRequests: async(req,res)=>{
    try{
    const doctorData  = await doctorModel.find({showRequest:true}) 
    console.log(doctorData)
    res.status(200).json({doctorData})
    }catch(error){
      console.log(error)
      res.status(404).json({message:'There is an error'})
    }
  },

// ----------------------------------------------------------------VERIFY DOCTOR-------------------------------------------------------------------//

  verifyDoctor: async(req,res)=>{
    const doctorId = req.body.doctorId
    try{
    await doctorModel.updateOne({_id:doctorId},{$set:{verificationStatus:true}})
    res.status(200).json({message:"Doctor Verified Successfully"})
    }catch(err){
      res.status(404).json({message:"Unable to verify the doctor"})
    }
  },

// ----------------------------------------------------------------UNVERIFY DOCTOR-------------------------------------------------------------------//

  unVerifyDoctor: async(req,res)=>{
    const doctorId = req.body.doctorId
    try{
    await doctorModel.updateOne({_id:doctorId},{$set:{verificationStatus:false}})
    res.status(200).json({message:"Doctor Unverified Successfully"})
    }catch(err){
      res.status(404).json({message:"Unable to unverify the doctor"})
    }
  },

// ----------------------------------------------------------------VERIFY TOKEN-------------------------------------------------------------------//

  tokenVerify:(req,res)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
     jwt.verify(token, process.env.JWT_SECRET_KEY);
     res.status(200).json({ message: "JWT Verified" });
     } catch (error) {
       res.status(404).json({error})
     }
  },

// --------------------------------------------------------------GET DASHBOARD DETAILS---------------------------------------------------------------//
getDashboardDetails : async(req,res)=>{
  try {
  const activeUsers = await userModel.find({block:false}).count()
  const blockedUsers = await userModel.find({block:true}).count()
  const activeDoctors = await doctorModel.find({block:false}).count()
  const blockedDoctors = await doctorModel.find({block:true}).count()
  const verifiedDoctors = await doctorModel.find({verificationStatus:true}).count()
  const unVerifiedDoctors = await doctorModel.find({verificationStatus:false,showRequest:true}).count()
  const revenue = await bookedAppointments.find({ appointmentStatus: true });
  const totalRevenue = revenue.reduce((sum, { amountPaid }) => sum + amountPaid, 0)
  const successfulAppointments = await bookedAppointments.find({ cancelled: false,appointmentStatus:true }).count()
  const cancelledAppointments = await bookedAppointments.find({$or: [{ cancelled: true },{ appointmentStatus: false }]}).count()
  
  res.status(200).json({activeUsers,blockedUsers,activeDoctors,blockedDoctors,verifiedDoctors,unVerifiedDoctors,totalRevenue,successfulAppointments,cancelledAppointments})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
},

// --------------------------------------------------------------GET DASHBOARD DETAILS---------------------------------------------------------------//

getAppointmentGraphForAdmin : async(req,res)=>{
  try {
  const appointmentGraph = await adminHelper.getAppointmentGraphForAdmin()
  res.status(200).json({appointmentGraph:appointmentGraph}) 
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
},

// --------------------------------------------------------------GET REPORTED DOCTOR DETAILS---------------------------------------------------------------//

getReportedDoctors: async(req,res)=>{
  try {
    const reports = await reportModel.find()
      .populate('doctorId', 'firstName lastName _id profilePhoto')
      .populate('userId', 'firstName lastName _id profilePhoto')
      .exec();
  
    const reportData = reports.map((report) => {
      const { doctorId, userId, reportDiscription } = report;
      const doctorName = `${doctorId.firstName} ${doctorId.lastName}`;
      const userName = `${userId.firstName} ${userId.lastName}`;
      const doctorProfilePhoto = doctorId.profilePhoto;
      const userProfilePhoto = userId.profilePhoto;
      return {
        doctorId: doctorId._id,
        userId: userId._id,
        doctorName,
        userName,
        doctorProfilePhoto,
        userProfilePhoto,
        reportDiscription: reportDiscription || 'No description available',
      };
    });
  
    res.status(200).json({ reports: reportData });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
}

  
};
