import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DoctorChatListDetails = () => {
    const navigate = useNavigate()
    return (
        <div>
             <div>
  <div class="flex justify-center w-full mt-1">
          <img
            src="https://img.freepik.com/premium-vector/blue-chat-speech-bubble-icon-3d-cartoon-minimal-style-vector-illustration_275806-1726.jpg"
            alt=""
            className="h-80"
          />
        </div>

      <ul role="list" class="divide-y divide-gray-100">
  <Link onClick={navigate('/doctor/chat')} class="flex justify-between gap-x-6 py-5 mt-1 bg-gray-100 shadow-sm hover:bg-blue-100 rounded-xl" >
    <div class="flex gap-x-10">
      <img class="h-12 w-12 flex-none ml-4 rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      <div class="min-w-0 flex-auto">
        <p class="text-sm md:text-lg lg:text-xl font-semibold leading-6 text-gray-900">Michael Foster</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">michael.foster@example.com</p>
      </div>
    </div>
    <div class="mr-10 hidden sm:flex sm:flex-col sm:items-end">
      <p class="text-sm leading-6 md:text-lg lg:text-xl text-gray-900">Dermetologist</p>
      <p class="mt-1 text-xs leading-5 text-gray-500">Experience : 2 years</p>
    </div>
  </Link>
</ul>
   </div>
        </div>
    );
}

export default DoctorChatListDetails;
