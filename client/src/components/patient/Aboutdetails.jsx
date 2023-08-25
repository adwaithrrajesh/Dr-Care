import React from 'react';
import { useNavigate } from 'react-router-dom';

const Details = () => {

    const About  = [
        { 
            Name:'Chat',
            Description:'You can chat with doctor',
            Img:'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-512.png'
        },
        {
            Name:'Video Call',
            Description:'You can video call with Doctor',
            Img:'https://www.pngplay.com/wp-content/uploads/5/Video-Chat-Camera-Blue-Icon-PNG.png'
        },
        {
            Name:'Booking',
            Description:'You can Book Appointments',
            Img:'https://cdn-icons-png.flaticon.com/512/5328/5328095.png'
        },
        {
            Name:'Search',
            Description:'You can find and filter good Doctors with experience',
            Img:'https://static.vecteezy.com/system/resources/previews/014/441/074/original/search-icon-design-in-blue-circle-png.png'
        }
    ]

    return (
        <div className='mt-20'>
           
           <div className='text-center hover:scale-105 ease-in-out duration-200 text-blue-500 mb-10'>
            <p className='text-4xl'>Main Features</p>
           </div>
                {
                About.map((about)=>(
              <div class="inline-block my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">

                    <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                  <a href="#">
                    <img
                      alt="Placeholder"
                      class="block h-60 w-60 object-cover"
                      src={about.Img}
                    />
                  </a>
                  </div>

                  <header class="flex items-center justify-center leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                      <p class="no-underline text-black">{about.Name}</p>
                    </h1>
                  </header>

                  <div class="flex items-center justify-center text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p>
                        {about.Description}
                    </p>
                  </div>
                </article>
              </div>

                ))
            } 
        </div>
    );
}

export default Details;
