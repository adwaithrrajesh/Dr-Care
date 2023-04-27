import React from "react";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import instance from "../../instance/instance";
import { toast } from "react-hot-toast";
import { getAppointments } from "../../API/user";

const Appointments = () => {

// ---------------------------------------------------------------TOKEN && STATE-------------------------------------------------------------------//

const token = JSON.parse(localStorage.getItem("clientToken"));

const [appointments,setAppointments] = useState([])
const [reload,setReload] = useState(false)
  
// ---------------------------------------------------------------FETCHING APPOINTMENTS-------------------------------------------------------------------//

useEffect(() => {
    getAppointmentApi()
  }, [reload]);

  const getAppointmentApi = async() =>{
    const response = await getAppointments()
    setAppointments(response.data.appointments)
  }

// ---------------------------------------------------------------CANCELLING APPOINTMENT-------------------------------------------------------------------//

const cancelAppointment = (AppointmentId) =>{
    instance.patch('/cancelAppointment',{AppointmentId}).then((response)=>{
        toast.success(response.data.message)
        setReload(!reload)
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })
}
  

  return (
    <div>
      
            <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
                    <img
                        src="https://icon-library.com/images/appointment-icon/appointment-icon-25.jpg"
                        className="h-72 rounded-full"
                        alt="" />
                </div><div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
                        <p class="not-italic font-medium text-2xl text-cyan-700">
                            Appointments
                        </p>
                    </div><div className="flex justify-end mr-6 mt-10">
                        <Link to={'/viewCancelledAppointments'} className="text-green-600 hover:text-green-800">View Cancelled Appointments</Link>
                    </div>
                    
                    {
            appointments?.map((data)=>(
     <>
                    <div class="bg-cyan-50 justify-center  flex rounded-xl shadow-md overflow-hidden w-full mt-4">
                        <div class="md:flex">
                            <div class="md:flex-shrink-0">
                                <img
                                    class="w-full object-contain h-32"
                                    src="https://www.citypng.com/public/uploads/small/11664612218uepxmb9ytcdhknpfwq4ajq88gdnhmrvv7i81bnzjmjutke4kfnrfgphvpmfqjvt5hqkvx2togb46akypny4blsv8iweiwqzx8q9v.png" />
                            </div>
                            <div class="p-8">
                                <div class="uppercase tracking-wide text-sm p-1 text-green-800 font-semibold">
                                    Appointment Successful
                                </div>
                                <p class="mt-5 text-slate-700">
                                    You have successfully booked your appointment with Dr {data.doctorId.firstName} {data.doctorId.lastName} for {Intl.DateTimeFormat('en-US', {weekday:'long'}).format(new Date(data.date))}, {new Date(data.date).toLocaleDateString()}, from {data.time}.
                                </p>
                                <div className="mt-8 text-red-600 hover:text-red-400" onClick={()=>cancelAppointment(data._id)}>
                                    <Link>Cancel Appointment</Link>
                                </div>
                            </div>
                        </div>
                    </div>
             </>
            ))
        }

      
    </div>
  );
};

export default Appointments;
