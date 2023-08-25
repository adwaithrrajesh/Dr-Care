import React from "react";
import { useState } from "react";
import toast from 'react-hot-toast'
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from 'react-router-dom'
import { addScheduleTime,getScheduledTime,deletingScheduledTime } from "../../API/doctor";


const ScheduleTime = () => {

// ---------------------------------------------------------------Array Details-------------------------------------------------------------------//
  const startTime = ['7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm']
  const endTime = ['7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm']


  const navigate = useNavigate()


// ---------------------------------------------------------------States-------------------------------------------------------------------//

  const [startingTime,setStartingTime] = useState()
  const [endingTime,setEndingTime] = useState()
  const [slot,setSlot] = useState() 
  const [refresh,setRefresh] = useState()
  const [date,setDate] = useState()
  const [loading,setLoading] = useState(false)
  
  const [scheduledTime,setScheduledTime] = useState([])
// ---------------------------------------------------------------Fetching details to pass to the backend-------------------------------------------------------------------//

  const details ={date,startingTime,endingTime,slot}
  
// ---------------------------------------------------------------Passing every value to back end-------------------------------------------------------------------//
  const handleSubmit = async(e) =>{
    e.preventDefault()
    Swal.fire({
      title: 'Scedule Time',
      text: "Are you sure want to add time",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Schedule Time'
    }).then(async(result) => {
      if (result.isConfirmed) {

        if(!date || !startingTime || !endingTime || !slot){
          toast.error('Please make sure that you entered everything')
        }else if(startingTime == endingTime){
          toast.error('Please enter a valid Time')
        }else if(slot == 0){
          toast.error(`slot can't be zero`)
        }else{
          const response = await addScheduleTime(details)
            setRefresh(response)
           toast.success(response.data.message)
        }
      }
    })
    
  }

// ---------------------------------------------------------------Fetching the scheduled time from backend-------------------------------------------------------------------//
useEffect(() => {
  gettingSceduledTime()
}, [refresh]);

const gettingSceduledTime = async() =>{
  setLoading(true)
  const response = await getScheduledTime()
  setScheduledTime(response.data.scheduledTime)
  setLoading(false)
}

// --------------------------------------------------------------------Delete the scheduled time-------------------------------------------------------------------//
const deleteScheduledTime = async(scheduledTimeId)=>{

  Swal.fire({
    title: 'Delete Sceduled Time',
    text: "Are you sure want to delete the scheduled Time",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete'
  }).then(async(result) => {
    if (result.isConfirmed) {
    const response = await deletingScheduledTime(scheduledTimeId)
    setRefresh(response)
    toast.success(response.data.message)
    }
  })
}


  


  return (
    <div>
         {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
      <div>
        <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer">
              <article class="overflow-hidden rounded-lg shadow-lg  bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48 rounded-full object-cover"
                    src="https://static.vecteezy.com/system/resources/previews/005/972/642/original/medical-appointment-time-icon-on-white-vector.jpg"
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline font-bold text-xl text-cyan-800">
                      Schedule Time
                    </p>
                  </h1>
                </header>

                <form onSubmit={handleSubmit}>

               <header class="flex items-center  justify-start leading-tight mt-2">
                  <h1 class="text-lg">
                    <p class="no-underline text-cyan-900 text-lg">Select Date</p>
                  </h1>
                </header>

                <DatePicker
                    selected={date}
                    className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   bg-white dark:text-black border-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholderText="Choose a date"
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                  />  

                <header class="flex items-center  justify-start leading-tight mt-4">
                  <h1 class="text-lg">
                    <p class="no-underline text-lg text-cyan-900">Start Time</p>
                  </h1>
                </header>

                <select
                  id="countries"  
                  class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   bg-white dark:text-black border-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e)=>setStartingTime(e.target.value)}>
                  <option hidden selected>Set Time</option>
                  {
                    startTime.map((time)=>(
                      <option>{time}</option>
                    ))
                  }

                </select>


                <header class="flex items-center  justify-start leading-tight mt-4">
                  <h1 class="text-lg">
                    <p class="no-underline text-lg text-cyan-900">End Time</p>
                  </h1>
                </header>
                
                <select
                  id="countries"  
                  class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   bg-white dark:text-black border-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e)=>setEndingTime(e.target.value)}>

                  <option selected hidden>Set Time</option>

                  {
                    endTime.map((time)=>(
                      <option>{time}</option>
                    ))
                  }
                 
                </select>

                <header class="flex items-center  justify-start leading-tight mt-4">
                  <h1 class="text-lg">
                    <p class="no-underline text-lg text-cyan-900">Slots</p>
                  </h1>
                </header>

                <input
                  id="countries"  
                  type="number"
                  min={0}
                  onChange={(e)=>setSlot(e.target.value)}
                  class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   bg-white dark:text-black border-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

              
              <div className="flex items-baseline justify-center mb-10">
                <button type="submit" className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                  Schedule Time
                </button>
              </div>
                </form>
              </article>
            </div>
          </div>
        </div>
      </div>

{
  scheduledTime.length > 0 &&
  <div class="container my-12 mx-auto px-4 md:px-12">
  <div class="flex flex-wrap -mx-1 lg:-mx-4">
    <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer">
      <article class="overflow-hidden rounded-lg shadow-lg h-[auto]">

        <header class="flex items-center justify-center leading-tight">
          <h1 class="text-lg">
            <p class="no-underline font-bold text-xl text-cyan-800">
              Available Time
            </p>
          </h1>
        </header>

        {
          scheduledTime.map((schedule)=>(
        <div class="border border-gray-300  h-auto text-sm rounded-lg   focus:border-blue-500 inline-block w-full p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1">
          <h1 class="text-lg">
            <div class="no-underline font-bold  text-cyan-800 mt-1 ">
            ○ {new Date(schedule.date).toLocaleDateString()} : {schedule.startingTime} to {schedule.endingTime}
            </div>
            <div className='flex justify-end'>
            <button className='text-cyan-400 hover:text-cyan-600 mr-4'onClick={()=>navigate('/doctor/editScheduledTime',{state:schedule._id})} >Edit</button>
            <button className='text-red-400 hover:text-red-600' onClick={()=>deleteScheduledTime(schedule._id)}>Delete</button>
            </div>
            <div class="no-underline font-serif text-gray-500">
              {schedule.slot == 0 ? 
              <p className="text-green-700">Every Slot got booked</p>
              :
              <>
              ○ Slots : {schedule.slot}
              </>
            }
            </div>
          </h1>
        </div>

          ))
        }

      </article>
    </div>
  </div>
</div> 
}
     
    </div>
  );
};

export default ScheduleTime;
