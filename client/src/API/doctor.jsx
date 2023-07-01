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
        console.log(details,"hereeeeeeeeeeeeeeeee")
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

// ------------------------------------------------------------------CANCEL APPOINTMENT-------------------------------------------------------------------//

export const doctorCancelAppointment = async(appointmentId)=>{
    try {
        const response = await doctorInstance.patch('/doctor/cancelAppointment',{appointmentId})
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------PATIENT VISITED CLINIC-------------------------------------------------------------------//

export const patientVisitedClinic = async(appointmentId)=>{
    try {
        const response = await doctorInstance.patch('/doctor/patientVisited',{appointmentId})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------GET DASHBOARD DETAILS-------------------------------------------------------------------//

export const getDashboardDetails = async() =>{
    try {
        const response = await doctorInstance.get('/doctor/getDashboardDetails')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ------------------------------------------------------------------GET APPOINTMENT DETAILS-------------------------------------------------------------------//

export const getAppointmentDetailsWithId = async(appointmentId) =>{
    try {
        const response = await doctorInstance.post('/doctor/getAppointmentDetailsWithId',{appointmentId})
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------EDIT APPOINTMENT DETAILS-------------------------------------------------------------------//
 
export const editAppointmentDetails = async (appointmentId,startingTime,endingTime,slot) =>{
    try {
        const response = await doctorInstance.post('/doctor/editAppointmentDetails',{appointmentId,startingTime,endingTime,slot})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------GET DASHBOARD GRAPH DETAILS-------------------------------------------------------------------//
 
export const getAppointmentGraph = async() =>{
    try {
       const response = await doctorInstance.get('/doctor/getAppointmentGraph')
       return response
    } catch (error) {
        toast.error(error.response.data.message)
   }
}  
   
// -------------------------------------------------------------------GET CHATTABLE USERS-------------------------------------------------------------------//

export const getChattableUsers = async ()=>{
    try {
        const response = await doctorInstance.get('/doctor/getChattableUsers')
        return response  
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------GETTING USER DETAILS WITH ID-------------------------------------------------------------------//
export const getUserDetailsWithId = async (userId) =>{
    try {
        const response = await doctorInstance.post('/doctor/getUserDetailsWithId',{userId})
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------GETTING MESSAGES FOR DOCTOR-------------------------------------------------------------------//

export const getMessagesForDoctors = async (userId) =>{
    try {
        toast.loading('loading...')
        const response = await doctorInstance.post("/message/getMessagesForDoctor",{to:userId})
        toast.dismiss()
        return response
    } catch (error) {
        toast.dismiss()
        toast.error(error.response.data.message)
    }
}

// -------------------------------------------------------------------GETTING MESSAGES FROM DOCTOR-------------------------------------------------------------------//

export const sendMessageFromDoctor = async (currentChat,message) =>{
        try{
            const response = await doctorInstance.post('/message/addMessageFromDoctor',{ to: currentChat,message:message})
            return response
        }catch(error){
            toast.error(error.response.data.message)
        }
}

// -------------------------------------------------------------------GETTING SCHEDULED TIME FOR DOCTORS-------------------------------------------------------------------//

export const getScheduledTimeWithId = async(appointmentId) =>{
    try {
       const response =  doctorInstance.post('/doctor/getScheduledTimeWithId',{appointmentId})
       return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}