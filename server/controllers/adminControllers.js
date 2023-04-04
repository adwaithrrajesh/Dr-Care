const bcrypt = require("bcrypt");
const adminModel = require("../model/admin");
const adminHelper = require("../helpers/adminHelper");
const jwt = require("jsonwebtoken");
const TokenHelper = require("../helpers/tokenHelper");
const userModel = require("../model/user");
const doctorModel = require("../model/doctor");
const departmentModel = require("../model/department");

module.exports = {
  login: async (req, res) => {
    const admin = req.body.value;
    const adminDetails = await adminModel.findOne({ email: admin.email });
    if (adminDetails) {
      try {
         adminHelper.doLogin(admin, adminDetails).then((response) => {
           const adminData = response;
          TokenHelper.generateToken(adminData).then((token) => {
            res.status(200).json({ token, message: "Login successful!" });
          })})
        } catch (error) {
        res.status(500).json({message:'Internal server Error'})
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }

  },
  getUsers: async (req, res) => {
    const users = await userModel.find();
    res.status(200).json({ users });
  },
  getDoctors: async (req, res) => {
    const doctors = await doctorModel.find();
    res.status(200).json({ doctors });
  },
  addDepartment: async(req, res) => {
    const departmentName = req.body.value.departmentName;
    const departmentDiscription = req.body.value.departmentDiscription;
    const departmentImage = req.body.departmentImage;
    const department = {departmentName,departmentDiscription,departmentImage};
    const departmentExist = await departmentModel.findOne({departmentName : department.departmentName})
      
    if(departmentExist){
        res.status(404).json({message:'Department Already Exist'})
      }else{
      departmentModel.create(department).then((response) => {
        res.status(200).json({ message: `${departmentName} added Successfully` });
      }).catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
    }
  },
  viewDepartments: async (req, res) => {
    try {
    const departments = await departmentModel.find();
    res.status(200).json({ departments });
    } catch (error) {
      res.status(500).json({message:'Internal Server Error'})
    }
   
  },
  blockUser: async (req, res) => {
    const userId = req.body.userId;
    try {
     await userModel.updateOne({ _id: userId },{ $set: { block: true } });
     res.status(200).json({ message: "User Blocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to Block the User" });
    }
  },
  unBlockUser: async (req, res) => {
    const userId = req.body.userId;
    try {
      await userModel.updateOne({ _id: userId },{ $set: { block: false } });
      res.status(200).json({ message: "User unBlocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to unBlock the User" });
    }    
  },
  blockDoctor: async (req, res) => {
    const doctorId = req.body.doctorId;
    try {
        await doctorModel.updateOne({ _id: doctorId },{ $set: { block: true } });
        res.status(200).json({ message: "Doctor Blocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to Block the Doctor" });
    }
  },
  unBlockDoctor: async (req, res) => {
    const doctorId = req.body.doctorId;
    try {
        await doctorModel.updateOne({ _id: doctorId },{ $set: { block: false } });
        res.status(200).json({ message: "Doctor unblocked Successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to unblock the Doctor" });
    }
  },
  hideDepartment: async (req, res) => {
    const departmentId = req.body.departmentId;
    try {
      await departmentModel.updateOne({ _id: departmentId },{ $set: { show: false } });
      res.status(200).json({ message: "Department Hidden successfully" });
    } catch (error) {
      res.status(404).json({ message: "Unable to hide the department" });
    }
  },
  showDepartment: async (req, res) => {
    const departmentId = req.body.departmentId;
    try {
      await departmentModel.updateOne({ _id: departmentId },{$set: {show: true}});
      res.status(200).json({message:'Department shown successfully'})
    } catch (error) {
      res.status(404).json({message:'Unable to show the department'})
    }
  },
  getVerificationRequests: async(req,res)=>{
    try{
    const doctorData  = await doctorModel.find({showRequest:true}) 
    res.status(200).json({doctorData})
    }catch(error){
      console.log(error)
      res.status(404).json({message:'There is an error'})
    }

  },
  verifyDoctor: async(req,res)=>{
    const doctorId = req.body.doctorId
    try{
    await doctorModel.updateOne({_id:doctorId},{$set:{verificationStatus:true}})
    res.status(200).json({message:"Doctor Verified Successfully"})
    }catch(err){
      res.status(404).json({message:"Unable to verify the doctor"})
    }
  },
  unVerifyDoctor: async(req,res)=>{
    const doctorId = req.body.doctorId
    try{
    await doctorModel.updateOne({_id:doctorId},{$set:{verificationStatus:false}})
    res.status(200).json({message:"Doctor Unverified Successfully"})
    }catch(err){
      res.status(404).json({message:"Unable to unverify the doctor"})
    }
  }
};
