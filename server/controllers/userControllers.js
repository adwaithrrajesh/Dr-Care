const mailOptions = require('../helpers/otp')
const userHelper = require('../helpers/userHelper')
const userModel = require('../model/user')
let user;

module.exports = {
    login:(req,res)=>{
        console.log('here')
    },
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
                if(response.status){
                    res.status(200).json({message:'Successfully registered'})
                }else{
                    res.status(404).json({message:'An error occured'})
                }
            })
        }else{
            res.status(401).json({message:'Incorrect Otp'})
        }
    }
}