import React from "react";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";


const DoctorHeader = () => {


  return (
    <div>
      <div>
        <nav class="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
          <div class="container flex flex-wrap items-center justify-between mx-auto">
              <img src={logo} class="h-10 mr-16 sm:h-10" alt="Dr Care logo" />
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-cyan-700 dark:focus:ring-cyan-600"
              aria-controls="navbar-default"
              aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-100 dark:bg-white md:dark:bg-white-900 dark:border-gray-700">
                {/* <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-white bg-cyan-700 rounded md:bg-transparent md:text-cyan-700 md:p-0 dark:text-white"
                  aria-current="page">
                  Home
                </a>
              </li> */}
                <li>
                  <Link to={'/doctor/home'}
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200">
                    Home
                  </Link>
                </li>
                <li>
                <Link to={'/doctor/Appointments'}
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200">
                      Appointments
                  </Link>
                </li>
                <li>
                <Link to={'/doctor/chatList'}
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200">
                      Chat
                  </Link>
                </li>
                <li>
                <Link to={'/doctor/login'}
                    onClick={()=>localStorage.clear()}
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200">
                      Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DoctorHeader;
