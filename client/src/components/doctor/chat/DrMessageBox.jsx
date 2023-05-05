import React from 'react';
import { useState } from 'react';

const DrMessageBox = ({onMessage}) => {

  const [message,setMessage] = useState()


  const handleSubmit = async(e) =>{
    e.preventDefault()
    onMessage(message.trim())
    setMessage('');
  }

    return (
      <div>
      <form onSubmit={handleSubmit}>
        <div class="p-4 flex">
<div class="mt-4 w-full flex items-center">
  
    <input  value={message} type="text" onChange={(e)=>setMessage(e.target.value)} placeholder="Type your message here" class="rounded-l-lg border border-gray-300 py-2 px-4 block w-full leading-5 focus:outline-none focus:border-blue-400 focus:ring-blue-400" />
    <button type="submit" class="bg-cyan-800 rounded-r-lg px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      <svg class="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
    </button>
  </div>
</div>
      </form>

    </div>
    );
}

export default DrMessageBox;
