import React, { useEffect, useState } from 'react';
import { getDashboardDetailsForAdmin } from '../../API/admin';
import Chart from "react-apexcharts";
import { getAppointmentGraphForAdmin } from '../../API/admin';


const AdminDashboardDetails = () => {

  const [dashboardCount,setDashboardCount] = useState({})
  const [appointmentGraph,setAppointmentGraph] = useState()

  useEffect(() => {
    dashboardDetails()
    dashBoardAppointmentGraphDetails()
  }, []);

  const dashboardDetails = async () =>{
    const response = await getDashboardDetailsForAdmin()
    setDashboardCount(response.data)
  }

  const dashBoardAppointmentGraphDetails = async ()=>{
    const response = await getAppointmentGraphForAdmin()
    setAppointmentGraph(response.data.appointmentGraph)
  }

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ['January', 'February', "April", "May", "June", "July", "August", "September","October","Novemeber","December"],
      },
    },
    series: [
      {
        name: "series-1",
        data: appointmentGraph,
      },
    ],
  };


    return (
        <div class="p-4 sm:ml-64">
     <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48 object-cover"
                    src="https://t4.ftcdn.net/jpg/03/30/33/29/360_F_330332917_MO0x1tcYedbGxUM4wgATwyOkU7xY5wEI.jpg"
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Active Doctors</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                  {dashboardCount.activeDoctors}
                  </p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer  ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48  object-cover rounded-full"
                    src="https://thumbs.dreamstime.com/b/doctor-icon-not-allowed-sign-doctor-icon-block-forbidden-prohibit-symbol-doctor-icon-not-allowed-sign-doctor-icon-116307469.jpg"
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Blocked Doctors</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-red-600 font-bold text-xl">
                    {dashboardCount.blockedDoctors}
                  </p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <div>
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src="https://cdn-icons-png.flaticon.com/512/4228/4228704.png"
                    />
                  </div>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">
                      Active Users
                    </p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                   {dashboardCount.activeUsers}
                  </p>
                </div>
              </article>
            </div>

            <div
              class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 object-cover"
                      src="https://cdn-icons-png.flaticon.com/512/4712/4712929.png"
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Blocked Users</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-red-600 font-bold text-xl">
                    {dashboardCount.blockedUsers}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48 object-cover"
                    src="https://media.istockphoto.com/id/1281045848/vector/doctor-appointment-confirmation-flat-illustration.jpg?s=1024x1024&w=is&k=20&c=dHcShuvdLPmMwlGDDCkZrfVqpcTkQaqN_916tYyUlho="
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Successful Appointments</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                  {dashboardCount.successfulAppointments}
                  </p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer  ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48  object-cover rounded-full"
                    src="https://cdn1.iconfinder.com/data/icons/calendar-20/200/calendar_21-512.png"
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Cancelled Appointments</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-red-600 font-bold text-xl">
                    {dashboardCount.cancelledAppointments}
                  </p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <div>
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src="https://img.freepik.com/premium-vector/cartoon-mascot-verified-sign-doctor-character-design_309278-5690.jpg?w=2000"
                    />
                  </div>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">
                      Verified Doctors
                    </p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                   {dashboardCount.verifiedDoctors}
                  </p>
                </div>
              </article>
            </div>

            <div
              class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 object-cover"
                      src="https://openclipart.org/download/216860/no-doctors.svg"
                    />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Unverified Doctors</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-red-600 font-bold text-xl">
                    {dashboardCount.unVerifiedDoctors}
                  </p>
                </div>
              </article>
            </div>

{/* -----------------------------------------------------------REACT CHART--------------------------------------------------------------------------- */}
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer hover:scale-105 ease-in-out duration-200">
              <div className='justify-center flex'>
              <h1 className='text-lg text-cyan-800'>Appointments</h1>
              </div>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                     <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  width="800"
                />
                </div>
              </article>
            </div>
{/* -------------------------------------------------------------------------------------------------------------------------------------- */}

          </div>
        </div>

{/* -----------------------------------------------------------DASHBOARD REVENUE--------------------------------------------------------------------------- */}

        <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer hover:scale-105 ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src='https://png.pngtree.com/png-vector/20191018/ourlarge/pngtree-stack-of-money-icon-cartoon-style-png-image_1818237.jpg'
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">Total Revenue</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                <p className="text-green-600 font-bold text-xl">
                ₹{dashboardCount.totalRevenue}
                  </p>
                </div>
              </article>
            </div>

{/* -------------------------------------------------------------------------------------------------------------------------------------- */}


        </div>
    );
}

export default AdminDashboardDetails;
