import React from "react";
import { useState, useEffect } from "react";
import { getCancelledAppointments } from "../../API/user";

const CancelledAppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    cancelledAppointments()
  }, []);
  
  const cancelledAppointments = async()=>{
    const response = await getCancelledAppointments()
    setAppointments(response.data.appointments);
  }

  return (
    <div>
      <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
        <img
          src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/512/cancel-icon.png"
          className="h-72 rounded-full"
        />
      </div>
      <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
        <p class="not-italic font-medium text-2xl text-red-700">
          Cancelled Appointments
        </p>
      </div>

      {appointments?.map((data) => (
        <>
          <div class="bg-red-50 justify-center  flex rounded-xl shadow-md overflow-hidden w-full mt-4">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img
                  class="w-full object-contain h-32"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/OOjs_UI_icon_cancel-destructive.svg/1200px-OOjs_UI_icon_cancel-destructive.svg.png"
                />
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm p-1 text-red-600 font-semibold">
                  Appointment Cancelled
                </div>
                <p class="mt-5 text-slate-700">
                  You have cancelled your appointment with Dr{" "}
                  {data.doctorId.firstName} {data.doctorId.lastName} for{" "}
                  {Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                    new Date(data.date)
                  )}
                  , {new Date(data.date).toLocaleDateString()}, from {data.time}
                  .
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CancelledAppointmentDetails;
