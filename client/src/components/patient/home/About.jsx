import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="bg-blue-50 max-w-[2000px] h-[420px] px-10 text-center rounded-3xl justify-center mt-2">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} className="h-10 mt-8" alt="logo" />
        </div>
          <h1 class="mb-12 mt-10 text-3xl font-bold leading-none tracking-tight text-gray-900  dark:text-cyan-900">
            About
          </h1>
          <p class="lg:mb-6 mb-1 sm:mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-600">
            This is one of the best online treatment center ever. You can find best doctors and you can chat with them.
            You can even video call with them and tell about your problems.     
          </p>
          <Link
          to={'/about'}
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-cyan-900">
            Learn more
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </Link>
      </div>
    </div>
  );
};

export default About;
