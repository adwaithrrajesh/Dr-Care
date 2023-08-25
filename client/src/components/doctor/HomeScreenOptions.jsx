import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVerificationStatus } from "../../API/doctor";

const Options = () => {

  const navigate = useNavigate()
  const [submit,setSubmit] = useState(false)
  const [loading,setLoading] = useState(false)

useEffect(() => {
  verificationStatus()
  }, []);

  const verificationStatus = async () =>{
    setLoading(true)
    const response = await getVerificationStatus()
    setLoading(false)
    setSubmit(response.data)
  }
  

  return (
    <div>
         {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
      <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">

        <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200" onClick={()=>navigate('/doctor/dashboard')}>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://st2.depositphotos.com/4352269/9400/v/600/depositphotos_94009984-stock-illustration-business-man-walking-standing-confident.jpg' />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Dashboard</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>Click here to view Dashboard</p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200"
            onClick={()=>navigate('/doctor/scheduleTime')}>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://static.vecteezy.com/system/resources/previews/005/972/642/original/medical-appointment-time-icon-on-white-vector.jpg' />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Schedule Time</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>Schedule your Available Time</p>
                </div>
              </article>
            </div>
          
          
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4" onClick={()=>navigate('/doctor/Appointments')}>
                  <div>
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://cdn-icons-png.flaticon.com/512/3301/3301556.png' />
                  </div>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Appointments</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>You can view your Appointments</p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200" onClick={()=>navigate('/doctor/profile')}>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://cdn-icons-png.flaticon.com/512/3774/3774299.png' />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Profile</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>You can Setup Profile</p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer hover:scale-105 ease-in-out duration-200" onClick={()=>navigate('/doctor/chatList')}>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48  object-cover"
                      src='https://cdn-icons-png.flaticon.com/512/2665/2665038.png'
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Chat</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>Chat with patients</p>
                </div>
              </article>
            </div>

            {
              submit ?
              <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer hover:scale-105 ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eo_circle_light-blue_checkmark.svg/1200px-Eo_circle_light-blue_checkmark.svg.png'
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Details Uploaded</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>You successfully uploaded the details</p>
                </div>
              </article>
            </div>
            :

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer hover:scale-105 ease-in-out duration-200" onClick={()=>navigate('/doctor/uploadDetails')}>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://cdn-icons-png.flaticon.com/512/270/270006.png'
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Upload Details</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p>You must want To upload your certificate  and other details otherwise the patients can't see your profile, Remember Certificates must be valid!</p>
                </div>
              </article>
            </div>
            }
        
           

        </div>
      </div>
    </div>
  );
};

export default Options;