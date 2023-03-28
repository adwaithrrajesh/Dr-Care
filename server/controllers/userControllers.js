const mailOptions = require('../helpers/otp')
const userHelper = require('../helpers/userHelper')
const userModel = require('../model/user')
const TokenHelper = require('../helpers/tokenHelper')
const _ = require('lodash');
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
    }
}