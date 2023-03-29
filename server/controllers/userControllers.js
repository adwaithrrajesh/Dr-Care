const mailOptions = require('../helpers/otp')
const userHelper = require('../helpers/userHelper')
const userModel = require('../model/user')
const TokenHelper = require('../helpers/tokenHelper')
const _ = require('lodash');
const bcrypt = require('bcrypt')
let user;

module.exports = {
    otp:async(req,res)=>{
        delete req.body.value.confirmPassword 
        user = req.body.value;
        const userExist = await userModel.findOne({email:user.email})
        if(!userExist){
            await mailOptions.sendOtp(user.email).then((OTP)=>{
                process.env.OTP = OTP
                res.status(200).json({message:`Otp send to ${user.email}`})
            })
        }else{
            res.status(404).json({message:'Email already exist'})
        }
    },
    otpVerify:(req,res)=>{
        let userOTP = req.body.otpCode
        let OTP = process.env.OTP
        
        if(userOTP === OTP){
            userHelper.userStore(user).then((response)=>{
                if(response){
                    res.status(200).json({message:'Successfully registered'})
                }else{
                    res.status(404).json({message:'An error occured'})
                }
            })
        }else{
            res.status(401).json({message:'Incorrect Otp'})
        }
    },
    resendOtp:(req,res)=>{
            mailOptions.sendOtp(user.email).then((OTP)=>{
                process.env.OTP = OTP
                res.status(200).json({message:`Otp resend to ${user.email}`})
            }).catch((error)=>{
                res.status(500).json({message:'We are sorry internal server error'})
        })
    },
    login:async(req,res)=>{
        const user = req.body.value
        const userDatabase = await userModel.findOne({email:user.email})
        if(!userDatabase){
            res.status(404).json({message:'Invalid Email'})
        }else{
            userHelper.doLogin(user,userDatabase).then((response)=>{
                if(response){
                    const userData = response
                    TokenHelper.generateToken(userData).then((token)=>{
                        res.status(200).json({token , userData})
                    })
                }else{
                    res.status(404).json({message:'Incorrect Password'})
                }
            })
        }
    },
    ForgotPasswordOtp: async(req,res)=>{
        user = req.body.value
        const Emailverfied = await userModel.findOne({email:user.email})
        if(Emailverfied){
            mailOptions.sendOtp(user.email).then((OTP)=>{
                process.env.OTP = OTP
                res.status(200).json({message:`Otp resend to ${user.email}`})
            }).catch((error)=>{
                res.status(500).json({message:'Internal server error'})
            })
        }else{
            res.status(404).json({message:'Email Doesnot Exist'})
        }
    },
    ForgotPasswordOtpVerify:(req,res)=>{
        const userOTP  = req.body.otpCode
        if(userOTP === process.env.OTP){
            res.status(200).json({message:'Otp Verified Successfully'})
        }else{
            res.status(404).json({message:'Incorrect Otp'})
        }
    },
    resetPassword : async(req,res)=>{
        const newPassword = req.body.value.password
        const userEmail = user.email
        const userDetails = await userModel.findOne({email:userEmail})
        const passwordMatch = await bcrypt.compare(newPassword,userDetails.password)
        
        if(passwordMatch){
            res.status(404).json({message:'This is Your Previous Password Set a new Password'})
        }else{
            userHelper.resetPassword(userEmail,newPassword).then((response)=>{
                if(response){
                    res.status(200).json({message:'Password Changed Successfully'})
                }else{
                    res.status(404).json({message:'Unable to Change the password'})
                }
            })
        }
    }
}