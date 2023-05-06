import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { getDepartmentForHomeScreen } from "../../../API/user";


const Departments = () => {


  const [departments,setDepartments] = useState([])

  const LeftSlide = () => {
    var slider = document.getElementById("slider-department");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const RightSlide = () => {
    var slider = document.getElementById("slider-department");
    slider.scrollLeft = slider.scrollLeft + 500;
  };



  useEffect(() => {
    getDepartments()
  }, []);

  const getDepartments = async() =>{
    const response = await getDepartmentForHomeScreen()
    setDepartments(response.data.departmentData)
  }

  return (
    <div>
      <div>
        <div>
          <div className="bg-white max-w-[2000px] h-[550px] px-10 text-center rounded-3xl justify-center mt-2">
            <div className="flex flex-col justify-center items-center">
              <h1 class="mb-12 mt-10 text-3xl font-bold leading-none tracking-tight text-gray-900  dark:text-cyan-900">
                Departments
              </h1>
            </div>
            <div className="bg-blue-100 max-w-[2000px] h-[400px] px-10 text-center rounded-3xl justify-center ">
              <div className="flex flex-col justify-center items-end">
              <Link className="mt-4 text-cyan-700" to={"/departments"}>View all</Link>
              </div>
              <div className="relative flex items-center">
                <MdChevronLeft
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  onClick={LeftSlide}
                  size={30}
                />
                <div
                  id="slider-department"
                  className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                  {departments.map((department) => (
                    <div class="h-19 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-cyan-100 w-[220px] inline-block p-2 ml-5 cursor-pointer hover:scale-105 ease-in-out duration-200 ">
                      <div className="relative flex items-center justify-center ">
                        <a href="#">
                          <img
                            class="rounded-full h-40 w-40 object-cover"
                            src={department.URL}
                            alt="doctor image"
                          />
                        </a>
                      </div>
                      <div class="p-5">
                        <a href="#">
                          <h5 class="sm md:text-lg lg:text-xl">
                            {department.Name}
                          </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {department.Department}
                        </p>
                        <a
                          href="#"
                          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                          View Doctors
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
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <MdChevronRight
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  size={30}
                  onClick={RightSlide}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
