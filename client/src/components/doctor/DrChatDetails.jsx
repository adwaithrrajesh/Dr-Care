import React from 'react';
import { Link } from 'react-router-dom';


const DrChatDetails = () => {
    return (
        <div>
            <div>
        <div>
       <div class="overscroll-none">
      <div
        class="fixed w-full bg-cyan-800 h-16 pt-2 text-white flex justify-between shadow-md  overscroll-none"
      >
        {/* <!-- back button --> */}
        <Link to="/doctor/chatList">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-12 h-12 my-1 text-green-100 ml-2"
          >
            <path
              class="text-green-100 fill-current"
              d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
            />
          </svg>
        </Link>
        <div class=" text-green-100 font-bold text-lg tracking-wide inline-flex  mt-1">
        <img src='https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg' class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
        <p className="mt-2 ml-2">demo</p>
        </div>
        {/* <!-- 3 dots --> */}
        <div class="icon-dots-vertical w-8 h-8 mt-2 mr-2">
        </div>
      </div>
      </div>
      </div>
            <div class="flex flex-col items-center justify-items-stretch w-full h-screen bg-gray-100 text-gray-800 ">
{/* <!-- Component Start --> */}
<div class="flex flex-col flex-grow w-full  bg-white shadow-xl rounded-lg overflow-hidden mt-11">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <img src='https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg' class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
            <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm md:text-lg lg:text-xl">This is a responsive paragraph.</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div class="bg-cyan-800 text-white p-3 w-full rounded-l-lg rounded-br-lg">
                <p class="text-sm md:text-lg lg:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <img src='https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg' class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />

        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">Lorem ipsum dolor sit.</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
    </div>
    
    <div class="p-4 flex">
    <div class="mt-4 w-full flex items-center">
        <input type="text" placeholder="Type your message here" class="rounded-l-lg border border-gray-300 py-2 px-4 block w-full leading-5 focus:outline-none focus:border-blue-400 focus:ring-blue-400" />
        <button type="button" class="bg-cyan-800 rounded-r-lg px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <svg class="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
    </div>
</div>
{/* <!-- Component End  --> */}
</div>
        </div>
        </div>
    );
}

export default DrChatDetails;
