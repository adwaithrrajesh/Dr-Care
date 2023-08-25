import React, { useEffect, useState } from "react";
import { getDashboardDetails } from "../../API/doctor";
import Chart from "react-apexcharts";
import { getAppointmentGraph } from "../../API/doctor";

const DoctorDashboardDetails = () => {
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [graph,setGraph] = useState()
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    dashboardDetails();
    dashboardGraphDetails()
  }, []);

  const dashboardDetails = async () => {
    setLoading(true)
    const response = await getDashboardDetails();
    setLoading(false)
    setDashboardCounts(response.data);
  };

  const dashboardGraphDetails = async ()=>{
    setLoading(true)
    const response = await getAppointmentGraph()
    setLoading(false)
    setGraph(response?.data.graphDetails)
  }

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["December",'January', 'February', "April", "May", "June", "July", "August", "September","October","Novemeber",]
      },
    },
    series: [
      {
        name: "series-1",
        data: graph,
      },
    ],
  };

  return (
    <div>
         {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
      <div>
        <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48 object-cover"
                    src="https://cdn-icons-png.flaticon.com/512/2621/2621786.png"
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">VISITED PATIENTS</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                    {dashboardCounts.visitedPatients}
                  </p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer  ease-in-out duration-200">
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <img
                    alt="Placeholder"
                    class="block h-48 w-48  object-cover"
                    src="https://img.freepik.com/premium-vector/growth-arrow-icon-comic-style-revenue-cartoon-vector-illustration-white-isolated-background_157943-6936.jpg?w=2000"
                  />
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">TOTAL REVENUE</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                  ₹{dashboardCounts.totalRevenue}
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
                      src="https://www.woculus.com/wp-content/uploads/2021/06/4029031-600x600.jpg"
                    />
                  </div>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">
                      CANCELLED APPOINTMENTS
                    </p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-red-600 font-bold text-xl">
                    {dashboardCounts.cancelledAppointments}
                  </p>
                </div>
              </article>
            </div>

            <div
              class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer ease-in-out duration-200"
              onClick={() => navigate("/doctor/profile")}>
              <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-48 w-48 rounded-full object-cover"
                      src="https://media.istockphoto.com/id/1286487110/vector/appointment-booking-calendar-vector-illustration.jpg?s=612x612&w=0&k=20&c=K26phQ_nb0tu7Ezx9Fvf_43_5J-bOkufOUf_HfqNlXA="
                    />
                  </a>
                </div>

                <header class="flex items-center justify-center leading-tight">
                  <h1 class="text-lg">
                    <p class="no-underline text-black">UPCOMING APPOINTMENTS</p>
                  </h1>
                </header>

                <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                  <p className="text-cyan-600 font-bold text-xl">
                    {dashboardCounts.bookedAppointments}
                  </p>
                </div>
              </article>
            </div>

            <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer ease-in-out duration-200">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardDetails;
