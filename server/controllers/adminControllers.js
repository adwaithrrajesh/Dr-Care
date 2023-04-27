const bcrypt = require("bcrypt");
const adminModel = require("../model/admin");
const adminHelper = require("../helpers/adminHelper");
const jwt = require("jsonwebtoken");
const TokenHelper = require("../helpers/tokenHelper");
const userModel = require("../model/user");
const doctorModel = require("../model/doctor");
const departmentModel = require("../model/department");

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
    const userId = req.body.userId;
    try {
     await userModel.updateOne({ _id: userId },{ $set: { block: true } });
     res.status(200).json({ message: "User Blocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to Block the User" });
    }
  },

// ----------------------------------------------------------------UNBLOCK USER-------------------------------------------------------------------//

  unBlockUser: async (req, res) => {
    const userId = req.body.userId;
    try {
      await userModel.updateOne({ _id: userId },{ $set: { block: false } });
      res.status(200).json({ message: "User unBlocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to unBlock the User" });
    }    
  },

// ----------------------------------------------------------------BLOCK DOCTOR-------------------------------------------------------------------//

  blockDoctor: async (req, res) => {
    const doctorId = req.body.doctorId;
    try {
        await doctorModel.updateOne({ _id: doctorId },{ $set: { block: true } });
        res.status(200).json({ message: "Doctor Blocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to Block the Doctor" });
    }
  },

// ----------------------------------------------------------------UNBLOCK DOCTOR-------------------------------------------------------------------//

  unBlockDoctor: async (req, res) => {
    const doctorId = req.body.doctorId;
    try {
        await doctorModel.updateOne({ _id: doctorId },{ $set: { block: false } });
        res.status(200).json({ message: "Doctor unblocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to unblock the Doctor" });
    }
  },

// ----------------------------------------------------------------HIDE DEPARTMENT-------------------------------------------------------------------//

  hideDepartment: async (req, res) => {
    const departmentId = req.body.departmentId;
    try {
      await departmentModel.updateOne({ _id: departmentId },{ $set: { show: false } });
      res.status(200).json({ message: "Department Hidden successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to hide the department" });
    }
  },

// ----------------------------------------------------------------SHOW DEPARTMENT-------------------------------------------------------------------//

  showDepartment: async (req, res) => {
    const departmentId = req.body.departmentId;
    try {
      await departmentModel.updateOne({ _id: departmentId },{$set: {show: true}})
      res.status(200).json({message:'Department shown successfully'})
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

  
};