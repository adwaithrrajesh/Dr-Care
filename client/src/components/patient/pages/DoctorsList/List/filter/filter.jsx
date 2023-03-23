import React from "react";
import { useState } from "react";

const Filter = () => {
    
    const[isOpen,setIsOpen] = useState(false)

  return (
    <div className="flex flex-col justify-center items-end mt-14 mr-10">
      <div className="inline-flex bg-white border rounded-md">
        <p
        onClick={()=> setIsOpen ((prev)=>!prev)}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md">
          Filter
        </p>

        <div className="relative">
          <button
          onClick={()=> setIsOpen ((prev)=>!prev)}
            type="button"
            className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {

            isOpen &&  <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                ReactJS Dropdown 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                ReactJS Dropdown 2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                ReactJS Dropdown 3
              </a>
            </div>
          </div>

          }
        </div>
      </div>
    </div>
  );
};

export default Filter;
