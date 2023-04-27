import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import instance from "../../instance/instance";
import { toast } from "react-hot-toast";  
import { useNavigate } from "react-router-dom";
import { getBookingDetails } from "../../API/user";





const BookingForm = () => {
  // ----------------------------------------------------------------States, Location && Navigate -------------------------------------------------------------------//
  const location = useLocation();
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [selectableDates, setSelectableDates] = useState([]);
  const [date, setDate] = useState(null);
  const [startTime,setStartTime] = useState([])
  const [endTime,setEndTime] = useState([])
  const [slot,setSlot] = useState()
  const [selectedDate,setSelectedDate] = useState()
  const [paymentOption, setPaymentOption] = useState('');
  const [fee,setFee] = useState()
  const [appointmentId,setAppointmentId] = useState()
  const [reload,setReload] = useState(false)
  
  const navigate = useNavigate()


  // ----------------------------------------------------------------FETCHING APPOINTMENT DETAILS USING DOCTOR_ID-------------------------------------------------------------------//
  useEffect(() => {
    const doctorId = location.state;
    getBookingDetailsApi(doctorId)
    }, []);
    
    const getBookingDetailsApi = async(doctorId) =>{
      const response = await getBookingDetails(doctorId)
      setAppointmentDetails(response.data.bookingDetails);
      setFee(response.data.fee)
  }

  // ----------------------------------------------------------------------------FILTERING THE DATES-------------------------------------------------------------------//

  useEffect(() => {
    const filteredDates = appointmentDetails.filter((item) => item.date).map((item) => new Date(item.date));
    const formattedDates = filteredDates.map((date) =>
      date.toISOString().slice(0, 10)
    )
    setSelectableDates(formattedDates);
  }, [appointmentDetails,reload]);

  // ------------------------------------------------------------------SHOWING THE NECESSERY DATE ON DATE SELECTER-------------------------------------------------------------------//

  const isDateSelectable = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return selectableDates.includes(dateString);
  }

  // ------------------------------------------------------------------GET TIME AND SLOT-------------------------------------------------------------------//
  const getTime = (date) => {
    setSelectedDate(date)
    const localDate = new Date(date)
    const inputDate = localDate.toISOString()
    appointmentDetails.map(obj => {
      if(obj.date == inputDate){
        setDate(obj.date)
        setSlot(obj.slot)
        setAppointmentId(obj._id)
        setStartTime(obj.startingTime)
        setEndTime(obj.endingTime)
      }
    })
  }

  // ------------------------------------------------------------------Validating-------------------------------------------------------------------//

  const handleBooking = () =>{
    if(!date){
      toast.error('Please select A date')
    }else if(!startTime && endTime){
      toast.error('Please select Time')
    }else if(!paymentOption){
      toast.error('Please select a payment Option')
    }else{
  // -------------------------------------------------------------------------------RazorPay------------------------------------------------------//
  if(paymentOption == 'onlinePayment'){
    const doctorId = location.state
    InitializePayement(doctorId)
  }else{
    const doctorId = location.state
    doWalletPayment(doctorId)
  }
 }
  }  
  // -------------------------------------------------------------------------------Initializing Razorpay------------------------------------------------------//
  const InitializePayement = async(doctorId) =>{
    toast.loading('loading...')
    await instance.post('/initializePayment',{doctorId}).then((response)=>{
      handleRazorPay(response?.data.order)
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  }

  // -------------------------------------------------------------------------------Verify Razorpay------------------------------------------------------//
  const handleRazorPay = (order) => {
    const options = {
        "key": import.meta.env.VITE_RAZORPAY_ID,
        "amount": order.amount,
        "currency": order.currency,
        "name": 'Dr Care',
        "order_id": order.id,
        handler:async function (response) {
        const clientToken = JSON.parse(localStorage.getItem('clientToken'))
          instance.post('/verifyPayment',{appointmentId,response},{headers: {Authorization: `Bearer ${clientToken}`}}).then((response)=>{
            toast.success(response.data.message)
            setReload(!reload)
            navigate('/appointments')
          }).catch((error)=>{
            toast.error(error.response.data.message)
          })
        }
    }
    toast.dismiss()
    const rzp = new window.Razorpay(options)
    rzp.open();
}

  // -------------------------------------------------------------------------------DOING WALLET PAYMENT------------------------------------------------------//
  const doWalletPayment = (doctorId) =>{
    const clientToken = JSON.parse(localStorage.getItem('clientToken'))
    instance.post('/doWalletPayment',{doctorId,appointmentId},{headers: {Authorization: `Bearer ${clientToken}`}}).then((response)=>{
      toast.success(response.data.message)
      setReload(!reload)
      navigate('/appointments')
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  }




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
                  selected={selectedDate}
                  placeholderText="Choose a Date"
                  className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-cyan-600"
                  onChange={(date) => {
                    getTime(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                  filterDate={isDateSelectable}
                  minDate={new Date()}
                />


                {date && (
                    <select
                    class="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-cyan-600"
                    name="departmentName">
                    {/* <option selected hidden className="text-gray-500">
                      Choose Time
                    </option> */}
                    <option>{startTime} to {endTime}</option>
                  </select>
                
                )}
              </div>

              {date && (
                <>
                {slot !== 0 ?
                   <div>

                  <div class="flex items-center mt-10">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      onChange={() => setPaymentOption('onlinePayment')}
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
                      name="default-radio"
                      onChange={() => setPaymentOption('walletPayment')}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-2"
                      class="ml-2 text-sm font-medium text-gray-900">
                      Pay with wallet
                    </label>
                  </div>
                </div>
                :
                <div>
                  <p className="text-red-600">No Slot available</p>
                </div>
                }
                
                </>
               
              )}

              <div className="mt-4">
                <div className="flex items-baseline justify-center">
                  <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800" onClick={handleBooking}>
                  Book ₹{fee}
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
