import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import instance from "../../instance/instance";
import { toast } from "react-hot-toast";

const BookingForm = () => {
  // ----------------------------------------------------------------States and Location-------------------------------------------------------------------//
  const location = useLocation();
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [selectableDates, setSelectableDates] = useState([]);
  const [date, setDate] = useState(null);
  const [startTime,setStartTime] = useState([])
  const [endTime,setEndTime] = useState([])
  const [slot,setSlot] = useState()

  // ----------------------------------------------------------------FETCHING APPOINTMENT DETAILS USING DOCTOR_ID-------------------------------------------------------------------//
  useEffect(() => {
    const doctorId = location.state;
    instance
      .post("/getBookingDetails", { doctorId })
      .then((response) => {
        setAppointmentDetails(response.data.bookingDetails);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  // ----------------------------------------------------------------------------FILTERING THE DATES-------------------------------------------------------------------//

  useEffect(() => {
    const filteredDates = appointmentDetails.filter((item) => item.date).map((item) => new Date(item.date));
    const formattedDates = filteredDates.map((date) =>
      date.toISOString().slice(0, 10)
    );
    setSelectableDates(formattedDates);
  }, [appointmentDetails]);

  // ------------------------------------------------------------------SHOWING THE NECESSERY DATE ON DATE SELECTER-------------------------------------------------------------------//

  const isDateSelectable = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return selectableDates.includes(dateString);
  };

  // ------------------------------------------------------------------GET TIME AND SLOT-------------------------------------------------------------------//
  const getTime = (date) => {
    const localDate = new Date(date)
    const inputDate = localDate.toISOString()
    appointmentDetails.map(obj => {
      if(obj.date == inputDate){
        setSlot(obj.slot)
        setEndTime(obj.endingTime)
      }
    })
  };

  // console.log(slot)
  console.log(startTime)


  // -----------------------------------------------------------------------CODE-------------------------------------------------------------------//


  return (
    <div>
      <div className="bg-[url('https://st2.depositphotos.com/3051589/46575/i/450/depositphotos_465750336-stock-photo-doctor-appointment-schedule-checkup-calendar.jpg')] bg-no-repeat bg-cover">
        <div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="px-16 py-20 mt-7 text-left bg-blue-50 shadow-lg rounded-lg">
              <p className="text-2xl text-center">Book Appointment</p>

              <div className="mt-4">
                <label className="text-gray-500">Choose a Date</label>
                <DatePicker
                  selected={date}
                  placeholderText="Choose a Date"
                  className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-cyan-600"
                  onChange={(date) => {
                    getTime(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                  filterDate={isDateSelectable}
                />

                {date && (
                  <select
                    class="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-cyan-600"
                    name="departmentName">
                    <option selected hidden className="text-gray-500">
                      Choose Time
                    </option>
                    <option>demo</option>
                  </select>
                )}
              </div>

              {date && (
                <div>
                  <div class="flex items-center mt-10">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-1"
                      class="ml-2 text-sm font-medium text-gray-900">
                      Pay Online
                    </label>
                  </div>
                  <div class="flex items-center mt-4">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-2"
                      class="ml-2 text-sm font-medium text-gray-900">
                      Pay with wallet
                    </label>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <div className="flex items-baseline justify-center">
                  <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                    Book now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
