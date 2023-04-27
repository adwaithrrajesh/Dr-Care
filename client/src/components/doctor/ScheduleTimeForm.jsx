import React from "react";
import { useState } from "react";
import toast from 'react-hot-toast'
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addScheduleTime,getScheduledTime,deletingScheduledTime } from "../../API/doctor";


const ScheduleTime = () => {

// ---------------------------------------------------------------Array Details-------------------------------------------------------------------//
  const startTime = ['7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm']
  const endTime = ['7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm']



// ---------------------------------------------------------------States-------------------------------------------------------------------//

  const [startingTime,setStartingTime] = useState()
  const [endingTime,setEndingTime] = useState()
  const [slot,setSlot] = useState() 
  const [refresh,setRefresh] = useState()
  const [date,setDate] = useState()
  
  const [scheduledTime,setScheduledTime] = useState([])
// ---------------------------------------------------------------Fetching details to pass to the backend-------------------------------------------------------------------//

  const details ={date,startingTime,endingTime,slot}
  
// ---------------------------------------------------------------Passing every value to back end-------------------------------------------------------------------//
  const handleSubmit = async(e) =>{
    e.preventDefault()

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

// ---------------------------------------------------------------Fetching the scheduled time from backend-------------------------------------------------------------------//
useEffect(() => {
  gettingSceduledTime()
}, [refresh]);

const gettingSceduledTime = async() =>{
  const response = await getScheduledTime()
  setScheduledTime(response.data.scheduledTime)
}

// --------------------------------------------------------------------Delete the scheduled time-------------------------------------------------------------------//
const deleteScheduledTime = async(scheduledTimeId)=>{
  const response = await deletingScheduledTime(scheduledTimeId)
    setRefresh(response)
    toast.success(response.data.message)
}


  


  return (
    <div>
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
            <button className='text-red-400 hover:text-red-600' onClick={()=>deleteScheduledTime(schedule._id)}>delete</button>
            </div>
            <div class="no-underline font-serif text-gray-500">
            ○ Slots : {schedule.slot}
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