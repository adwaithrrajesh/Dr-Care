const tokenHelper = require('../helpers/tokenHelper')
require("dotenv").config();
const userModel = require('../model/user')
const jwt = require('jsonwebtoken')

const tokenMiddleware = async(req,res,next)=>{

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if(token){
      const jwtVerify = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const user = await userModel.findOne({_id:jwtVerify.userId})
      req.userId = user._id
      next()
    }else{
      res.status(404).json({message:"Please login again"})
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
}

module.exports = tokenMiddleware
