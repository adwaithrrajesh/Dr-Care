import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { doctorCancelAppointment,patientVisitedClinic } from "../../API/doctor";
import {
  getBookedAppointments,
  getBookedAppointmentsByDate,
} from "../../API/doctor";
import { toast } from "react-hot-toast";

const AppointmentList = () => {
  // ---------------------------------------------------------------STATE-------------------------------------------------------------------//

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [date, setDate] = useState();
  const [selectableDates, setSelectableDates] = useState([]);
  const [refresh,setRefresh] = useState(false)

  // ---------------------------------------------------------------FETCHING APPOINTMENTS-------------------------------------------------------------------//

  useEffect(() => {
    getAppointments();
  }, [refresh]);

  const getAppointments = async () => {
    const response = await getBookedAppointments();
    setAppointments(response.data.appointments);
  };

  // ---------------------------------------------------------------FILTERING ONLY DATES-------------------------------------------------------------------//

  useEffect(() => {
    const filteredDates = appointments
      .filter((item) => item.date)
      .map((item) => new Date(item.date));
    const formattedDates = filteredDates.map((date) =>
      date.toISOString().slice(0, 10)
    );
    console.log(formattedDates);
    setSelectableDates(formattedDates);
  }, [appointments]);

  // ---------------------------------------------------------------FILTERING SELECTABLE DATES-------------------------------------------------------------------//

  const isDateSelectable = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return selectableDates.includes(dateString);
  };

  // ---------------------------------------------------------------FILTERING USING DATE-------------------------------------------------------------------//

  const handleDateSubmit = (date) => {
    setDate(date)
    getFilteredAppointments(date);
  };

  const getFilteredAppointments = async (date) => {
    const response = await getBookedAppointmentsByDate(date);
    if (response.data.filteredAppointments.length == 0) {
      setFilteredAppointments(null);
    } else {
      setFilteredAppointments(response?.data?.filteredAppointments);
    }
  };

  // ---------------------------------------------------------------CANCEL APPOINTMENT-------------------------------------------------------------------//
  const cancelAppointment = (AppointmentId) => {
    Swal.fire({
      title: 'Cancel Appointment',
      text: "Are you sure want to cancel the Appointment",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancel Appointment'
    }).then(async(result) => {
      if (result.isConfirmed) {
       const response = await doctorCancelAppointment(AppointmentId)
       setRefresh(!refresh)
       toast.success(response.data.message)
      }
    })
  }

  // ---------------------------------------------------------------PATIENT VISITED-------------------------------------------------------------------//
  const patientVisited = (AppointmentId) =>{
    Swal.fire({
      title: 'Patient Visited',
      text: "Are you sure the patient visited your clinic",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Visited'
    }).then(async(result) => {
      if (result.isConfirmed) {
       const response = await patientVisitedClinic(AppointmentId)
       setRefresh(!refresh,"i")
       toast.success(response.data.message)
      }
    })
  }



  return (
    <div>
      <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
        <img
          src="https://icon-library.com/images/appointment-icon/appointment-icon-25.jpg"
          className="h-72 rounded-full"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
        <p class="not-italic font-medium text-2xl text-cyan-700">
          Appointments
        </p>
      </div>

      <div className="flex justify-end">
        {appointments.length !== 0 && (
          <div>
            <DatePicker
              selected={date}
              onChange={(date) => handleDateSubmit(date)}
              placeholderText="Filter with date"
              className="w-48  px-9 py-2 border rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-cyan-600"
              dateFormat="dd/MM/yyyy"
              filterDate={isDateSelectable}
            />
          </div>
        )}
      </div>

      {filteredAppointments && filteredAppointments.length !== 0 ? (
        filteredAppointments.map((data) => (
          <>
            <div class="bg-cyan-50 justify-center  flex rounded-xl shadow-md overflow-hidden w-full mt-4">
              <div class="md:flex">
                <div class="md:flex-shrink-0">
                  <img
                    class="w-full object-contain h-32"
                    src="https://www.citypng.com/public/uploads/small/11664612218uepxmb9ytcdhknpfwq4ajq88gdnhmrvv7i81bnzjmjutke4kfnrfgphvpmfqjvt5hqkvx2togb46akypny4blsv8iweiwqzx8q9v.png"
                  />
                </div>
                <div class="p-8">
                  <div class="uppercase tracking-wide text-sm p-1 text-green-800 font-semibold">
                    Appointment Confirmed
                  </div>
                  <p class="mt-5 text-slate-700">
                    {data.userId?.firstName} {data.userId?.lastName} scheduled
                    an appointment with you on{" "}
                    {Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                      new Date(data.date)
                    )}
                    ,{new Date(data.date).toLocaleDateString()}, from{" "}
                    {data.time}.
                  </p>
                  <div className="mt-5 inline-flex space-x-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Visited
                    </button>
                    <button
                      onClick={() => cancelAppointment(data._id)}
                      class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <>
          {filteredAppointments == null ? (
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer ">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-96 w-full rounded-full object-cover"
                      src="https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png"
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-4xl text-black">
                      Appointments Not found
                    </p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>
                    We are really sorry we couldn't find the Appointment Date
                    that you entered
                  </p>
                </div>
              </article>
            </div>
          ) : (
            <>
              {appointments.length == 0 ? (
                <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer ">
                  <article class="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
                    <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                      <a href="#">
                        <img
                          alt="Placeholder"
                          class="block h-96 w-full rounded-full object-cover"
                          src="https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png"
                        />
                      </a>
                    </div>

                    <header class="flex items-center justify-center leading-tight">
                      <h1 class="text-lg">
                        <p class="no-underline text-4xl text-black">
                          No Appointments
                        </p>
                      </h1>
                    </header>

                    <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                      <p>No one scheduled Appointment with you</p>
                    </div>
                  </article>
                </div>
              ) : (
                <>
                  {appointments?.map((data) => (
                    <>
                      <div class="bg-cyan-50 justify-center  flex rounded-xl shadow-md overflow-hidden w-full mt-4">
                        <div class="md:flex">
                          <div class="md:flex-shrink-0">
                            <img
                              class="w-full object-contain h-32"
                              src="https://www.citypng.com/public/uploads/small/11664612218uepxmb9ytcdhknpfwq4ajq88gdnhmrvv7i81bnzjmjutke4kfnrfgphvpmfqjvt5hqkvx2togb46akypny4blsv8iweiwqzx8q9v.png"
                            />
                          </div>
                          <div class="p-8">
                            <div class="uppercase tracking-wide text-sm p-1 text-green-800 font-semibold">
                              Appointment Confirmed
                            </div>
                            <p class="mt-5 text-slate-700">
                              {data.userId?.firstName} {data.userId?.lastName}{" "}
                              scheduled an appointment with you on{" "}
                              {Intl.DateTimeFormat("en-US", {
                                weekday: "long",
                              }).format(new Date(data.date))}
                              ,{new Date(data.date).toLocaleDateString()}, from{" "}
                              {data.time}.
                            </p>
                            <div className="mt-5 inline-flex space-x-2">
                              <button onClick={()=> patientVisited(data._id)}
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Visited
                              </button>
                              <button
                                onClick={() => cancelAppointment(data._id)}
                                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentList;
