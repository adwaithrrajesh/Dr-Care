import adminInstance from "../instance/adminInstance";
import { toast } from "react-hot-toast";

// ---------------------------------------------------------------- GETTING DASHBOARD -------------------------------------------------------------------//
export const getDashboardDetailsForAdmin = async() =>{
    try {
        const response = await adminInstance.get("/admin/getDashboardDetailsForAdmin")
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ---------------------------------------------------------------- GETTING Appointment Graph -------------------------------------------------------------------//

export const getAppointmentGraphForAdmin = async()=>{
    try {
        const response = await adminInstance.get('/admin/getAppointmentGraphForAdmin')
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// ---------------------------------------------------------------- GETTING REPORTED DOCTORS -------------------------------------------------------------------//
export const getReportedDoctorsForAdmin = async()=>{
  try {
    const response = await adminInstance.get('/admin/getReportedDoctors')
    return response
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

