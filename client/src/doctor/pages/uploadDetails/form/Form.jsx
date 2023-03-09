import React from "react";

const Form = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-24 py-36 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
          <p className="text-2xl text-center">Upload Details</p>

          <form action="">
            <div className="mt-4">
              <input
                type="number"
                placeholder="Id Number"
                className=" w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                required
              />
            </div>

            <div className="mt-4">
              <input
                type="number"
                placeholder="Age"
                className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                required
              />
            </div>

            <div className="mt-4">
              <input
                type="number"
                placeholder="Years of Experience"
                className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                required
              />
            </div>

            <div class="flex items-center justify-center w-full mt-10">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 dark:border-cyan-100 dark:hover:border-gray-500 dark:hover:bg-blue-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload your certificate</span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Please upload the Image of your MBBS certificate
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>

            <div class="flex items-center justify-center w-full mt-10">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 dark:border-cyan-100 dark:hover:border-gray-500 dark:hover:bg-blue-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload your Id card</span> </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Please upload the Image of your Id card
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
            
            <div className="mt-4">
              <div className="flex items-baseline justify-center">
                <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
