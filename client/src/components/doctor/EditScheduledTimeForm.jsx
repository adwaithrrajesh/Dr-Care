import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { editAppointmentDetails } from '../../API/doctor';
import { getScheduledTimeWithId } from '../../API/doctor';

const EditScheduledTimeForm = () => {
    const location = useLocation()
    let appointmentId = location?.state

    const startTime = ['7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm']
    const endTime = ['7:00 am','8:00 am','9:00 am','10:00 am','11:00 am','12:00pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm','6:00 pm','7:00 pm','8:00 pm','9:00 pm','10:00 pm']
  

    const[startingTime,setStartingTime] = useState()
    const[endingTime,setEndingTime] = useState()
    const[slot,setSlot] = useState()
    const [scheduleTime,setScheduledTime] = useState()
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        Swal.fire({
            title: 'Edit Scedule Time',
            text: "Are you sure want to edit scheduled time",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Edit Schedule Time'
          }).then(async(result) => {
            if (result.isConfirmed) {
              if(!startingTime || !endingTime || !slot){
                toast.error('Please make sure that you entered everything')
              }else if(startingTime == endingTime){
                toast.error('Please enter a valid Time')
              }else if(slot == 0){
                toast.error(`slot can't be zero`)
              }else{
                const response = await editAppointmentDetails(appointmentId,startingTime,endingTime,slot)
                toast.success(response.data.message)
                navigate('/doctor/scheduleTime')
              }
            }
          })
    }

    useEffect(() => {
      findScheduledTime()
    }, []);

    const findScheduledTime = async() =>{
      setLoading(true)
      const response = await getScheduledTimeWithId(appointmentId)
      setLoading(false)
      setScheduledTime(response.data?.scheduledTime)
    }



    return (
        <div>
             {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
        <div class="container my-20 mx-auto px-4 md:px-12">
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
                      Edit Schedule Time
                    </p>
                  </h1>
                </header>

                <form onSubmit={handleSubmit}>

                <header class="flex items-center  justify-start leading-tight mt-4">
                  <h1 class="text-lg">
                    <p class="no-underline text-lg text-cyan-900">Start Time</p>
                  </h1>
                </header>

                <select
                  id="countries"  
                  class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   bg-white dark:text-black border-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e)=>setStartingTime(e.target.value)}>
                  <option selected hidden>{scheduleTime?.startingTime}</option>
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

                  <option selected hidden>{scheduleTime?.endingTime}</option>

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
                  defaultValue={scheduleTime?.slot}
                  onChange={(e)=>setSlot(e.target.value)}
                  class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   bg-white dark:text-black border-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

              
              <div className="flex items-baseline justify-center mb-10">
                <button type="submit" className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                  Edit Scheduled Time
                </button>
              </div>
                </form>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditScheduledTimeForm;
