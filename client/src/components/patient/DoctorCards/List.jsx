import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import instance from "../../../instance/instance";
import { toast } from "react-hot-toast";
import { getDoctors } from "../../../API/user";
const List = (props) => {
  const navigate = useNavigate();

  // ----------------------------------------------------------------STATES-------------------------------------------------------------------//

  const [doctor, setDoctor] = useState([]);
  const [fetchedDoctors, setFetchedDoctors] = useState([]);

  // ----------------------------------------------------------------FETCHED DOCTORS------------------------------------------------------------//
  useEffect(() => {
    setFetchedDoctors(props.data);
  }, [props,fetchedDoctors]);

  // ----------------------------------------------------------------FINDING DOCTORS-------------------------------------------------------------------//

  useEffect(() => {
    callGetDoctors()
  }, []);

  const callGetDoctors = async() =>{
    const response = await getDoctors()
    setDoctor(response.data.doctors)
  }

  // ---------------------------------------------------------------- CODE-------------------------------------------------------------------//

  return (
    <div>
      <div>
        <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            {fetchedDoctors !== undefined && fetchedDoctors.length !== 0 ? (
              <>
                {fetchedDoctors.map((doctor) => (
                  <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
                    <article
                      class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]"
                      onClick={() => {
                        navigate("/doctorProfile",{state:doctor});
                      }}>
                      <button class="h-8 px-4 mt-3 text-cyan-800 transition-colors duration-150 bg-blue-100 rounded-lg focus:shadow-outline ">
                        Experience: {doctor.experience} Year
                      </button>

                      <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                        <img
                          alt="Placeholder"
                          class="block h-48 w-48 rounded-full object-cover"
                          src={doctor.profilePhoto}
                        />
                      </div>

                      <header class="flex items-center justify-center leading-tight">
                        <h1 class="text-lg">
                          <p class="no-underline text-black">
                            {doctor.firstName} {doctor.lastName}
                          </p>
                        </h1>
                      </header>

                      <header class="flex items-center justify-center leading-tight mt-2">
                        <div className="text-gray-500">
                          {doctor.departmentName}{" "}
                        </div>
                      </header>

                      <div class="flex items-center justify-center leading-tight mt-2">
                        <p class=" text-gray-500 text-center ">
                          Fee : ₹{doctor.fee}
                        </p>
                      </div>

                      <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                        <p class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                          View profile
                          <svg
                            aria-hidden="true"
                            class="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </>
            ) : (
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
                        Doctor Not Found
                      </p>
                    </h1>
                  </header>

                  <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p>Unable to find a doctor for you</p>
                  </div>
                </article>
              </div>
            )}

            {fetchedDoctors == undefined && (
              <>
                {doctor.map((doctor) => (
                  <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
                    <article
                      class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]"
                      onClick={() => {
                        navigate("/doctorProfile",{state:doctor});
                      }}>
                      <button class="h-8 px-4 mt-3 text-cyan-800 transition-colors duration-150 bg-blue-100 rounded-lg focus:shadow-outline ">
                        Experience: {doctor.experience} Year
                      </button>

                      <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                        <img
                          alt="Placeholder"
                          class="block h-48 w-48 rounded-full object-cover"
                          src={doctor.profilePhoto}
                        />
                      </div>

                      <header class="flex items-center justify-center leading-tight">
                        <h1 class="text-lg">
                          <p class="no-underline text-black">
                            {doctor.firstName}
                            {doctor.lastName}
                          </p>
                        </h1>
                      </header>

                      <header class="flex items-center justify-center leading-tight mt-2">
                        <div className="text-gray-500">
                          {doctor.departmentName}{" "}
                        </div>
                      </header>

                      <div class="flex items-center justify-center leading-tight mt-2">
                        <p class=" text-gray-500 text-center ">
                          Fee : ₹{doctor.fee}
                        </p>
                      </div>

                      <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                        <p class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                          View profile
                          <svg
                            aria-hidden="true"
                            class="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
