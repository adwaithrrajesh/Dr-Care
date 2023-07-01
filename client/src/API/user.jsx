import { toast } from "react-hot-toast";
import instance from "../instance/instance";



// ----------------------------------------------------------------USER REGISTER OTP-------------------------------------------------------------------//

export const userRegisterOtp = async(value)=>{
    try {
        console.log(value)
        const response =  await instance.post('/otp',{value})
        return response 
    } catch (error) { 
        toast.error(error.response.data.message)
    }
}
// ----------------------------------------------------------------VERIFY OTP IN REGISTERATION-------------------------------------------------------------------//

export const otpVerify = async(otpCode)=>{
    try {
        const response = await instance.post("/otpVerify", { otpCode })
        return response
    } catch (error) {
        toast.error(error.reponse.data.message)   
    }
}

// ------------------------------------------------------------------------USER LOGIN-------------------------------------------------------------------//

export const doLogin = async (value)=>{
    try {
        const response = await instance.post('/login',{value})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------------FORGOT PASSWORD OTP SENDING-------------------------------------------------------------------//
export const forgotPasswordOtp = async(value) =>{
    try {
        const response = await instance.post('/forgotPasswordOtp',{value})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------------FORGOT PASSWORD OTP VERIFYING-------------------------------------------------------------------//

export const forgotPasswordOtpVerify = async(otpCode) =>{
    try {
        const response = await instance.post("/ForgotPasswordOtpVerify", { otpCode })
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------------RESET PASSWORD-------------------------------------------------------------------//

export const resetPassword = async(value)=>{
    try {
       const response = instance.post('/resetPassword',{value})
       return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------EDIT PROFILE----------------------------------------------------------------//

export const getProfileDetails = async()=>{
    try {
        const response = await instance.get('/getUserDetails')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GET DOCTORS----------------------------------------------------------------//

export const getDoctors = async()=>{
    try{
        const response = await instance.get('/viewDoctors')
        return response
    }catch(error){
        toast.error(error.response.data.message)
    }
} 

// -------------------------------------------------------------------------GETTING APPOINTMENTS----------------------------------------------------------------//

export const getAppointments = async() =>{
    try {
        const response = instance.get('/getBookedAppointments')
        return response
    } catch (error) {
        toast.error(error.response.data.message)      
    }
}

// -------------------------------------------------------------------------GETTING BOOKING DETAILS----------------------------------------------------------------//

export const getBookingDetails = async(doctorId) =>{
    try {
   const response  =  instance.post("/getBookingDetails", { doctorId })
   return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GETTING CANCELLED APPOINTMENTS----------------------------------------------------------------//

export const getCancelledAppointments = async()=>{
    try {
        const response =  await instance.get("/getCancelledAppointments")
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GETTING DEPARTMENTS----------------------------------------------------------------//

export const getDepartments = async() =>{
    try {
        const response = await instance.get('/viewDepartments')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GETTING WALLET BALANCE----------------------------------------------------------------//

export const getWalletBalance = async () =>{
    try {
        const response = await  instance.get('/walletBalance')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GETTING CHATTABLE DOCTORS----------------------------------------------------------------//

export const getChattableDoctors = async () =>{
    try {
        const response = await instance.get('/getChattableDoctors')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GETTING DOCTOR WITH ID----------------------------------------------------------------//

export const getDoctorWithId = async (doctorId) =>{
    try {
       const response = await instance.post('/getDoctorWithId',{doctorId})
       return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------SEND MESSAGE----------------------------------------------------------------//
export const sendMessage = async (currentChat,message) =>{
    try{
        const response = await instance.post('/message/addMessage',{
            to: currentChat,
            message:message
        })
        return response
    }catch(error){
        toast.error(error.response.data.message)
    }
}
// -------------------------------------------------------------------------GET MESSAGE----------------------------------------------------------------//
export const getMessagesForUsers = async(doctorId)=>{
    try {
        const response = await instance.post("/message/getMessages",{to:doctorId})
        return response
    } catch (error) {
        toast.dismiss()  
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GET DOCTOR FOR HOME SCREEN----------------------------------------------------------------//

export const getDoctorsForHomeScreen = async() =>{
    try {       
        const response = await instance.get('/getDoctorsForHomeScreen')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------GET DEPARTMENT FOR HOME SCREEN----------------------------------------------------------------//

export const getDepartmentForHomeScreen = async () =>{
    try {
        const response = await instance.get('/getDepartmentForHomeScreen')
        return response 
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------------REPORT DOCTOR----------------------------------------------------------------//

export const reportDoctor = async(reportDiscription,doctorId)=>{
    try {
        const response = await instance.post('/reportDoctor',{reportDiscription,doctorId})
        return response
    } catch (error) {
        console.log(error)
    }
}