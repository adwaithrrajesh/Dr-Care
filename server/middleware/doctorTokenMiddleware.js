require("dotenv").config();
const doctorModel = require('../model/doctor')
const jwt = require('jsonwebtoken')

const tokenMiddleware = async(req,res,next)=>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if(token){
      const jwtVerify = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const doctor = await doctorModel.findOne({_id:jwtVerify.doctorId})
      req.doctorId = doctor._id
      next()
    }else{
      res.status(404).json({message:"Please Login Again"})
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
}

module.exports = tokenMiddleware
