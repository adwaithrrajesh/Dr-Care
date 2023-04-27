import doctorInstance from "../instance/doctorInstance";
import { toast } from "react-hot-toast";

// ----------------------------------------------------------------GETTING BOOKED APPOINTMENTS-------------------------------------------------------------------//
export const getBookedAppointments = async() =>{
    try {
        const response = await doctorInstance.get("/doctor/getBookedAppointments")
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ----------------------------------------------------------GETTING BOOKED APPOINTMENTS FILTERED BY DATE-------------------------------------------------------------------//

export const getBookedAppointmentsByDate = async(date) =>{
    try {
        const response = await doctorInstance.post("/doctor/filterAppointmentsByDate",{ date })
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------FORGOT PASSWORD OTP SENDING-------------------------------------------------------------------//

export const forgotPasswordOtpSend = async(value) =>{
    try {
        const response = await doctorInstance.post('/doctor/forgotPasswordOtp',{value})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------FORGOT PASSWORD OTP SENDING-------------------------------------------------------------------//

export const forgotPasswordOtpVerify = async(otpCode) =>{
    try {
        const response = await doctorInstance.post("/doctor/ForgotPasswordOtpVerify", { otpCode })
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
// ------------------------------------------------------------------GET VERIFICATION STATUS-------------------------------------------------------------------//

export const getVerificationStatus = async ()=>{
    try {
        const response = await doctorInstance.get("/doctor/verificationStatus")
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------ADD SCHEDULED TIME-------------------------------------------------------------------//
export const addScheduleTime = async (details) =>{
    try {
        const response = await doctorInstance.post('/doctor/addScheduleTime',{details})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
// ------------------------------------------------------------------GET SCHEDULED TIME-------------------------------------------------------------------//

export const getScheduledTime = async () =>{
    try {
        const response = await doctorInstance.get('/doctor/getScheduledTime')
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------DELETE SCHEDULED TIME-------------------------------------------------------------------//

export const deletingScheduledTime = async (scheduledTimeId) =>{
    try {
      const response = await doctorInstance.post('/doctor/deleteScheduledTime',{scheduledTimeId})   
      return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------GET DOCTOR DETAILS-------------------------------------------------------------------//

export const getDoctorDetails = async () =>{
    try {
        const response = await doctorInstance.get("/doctor/doctorDetails")
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ---------------------------------------------------------------------Resend Otp-------------------------------------------------------------------//

export const doctorResendOtp = async () =>{
    try {
        const response = await doctorInstance.get("/doctor/resendOtp")
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ---------------------------------------------------------------------RESET PASSWORD-------------------------------------------------------------------//
 
export const DoctorResetPasswordAPI = async (value) =>{
    try {
        const response = await doctorInstance.patch('/doctor/resetPassword',{value})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------OTP VERIFICATION-------------------------------------------------------------------//

export const OtpVerification = async(otpCode) =>{
    try {
        const response = await doctorInstance.post("/doctor/otpVerify", { otpCode })
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------OTP SEND-------------------------------------------------------------------//

export const otpSend = async(value)=>{
    try {
        const response = await doctorInstance.post('/doctor/otp',{value})
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}