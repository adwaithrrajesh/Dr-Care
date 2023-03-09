import React from 'react';

const About = () => {
    return (
        <div className='rounded-t-3xl h-[550px] mt-36 w-full bg-blue-100'>
            <div className='rounded-full h-1 w-full'>
                <p className='text-3xl text-center pt-4'>About</p>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200'>

            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-1/2 m'>
                    Name
                </p>
                <p className='flex text-end  items-center justify-end w-1/2 '>
                    Demo
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Department
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    Counselling
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Experience
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    2 years
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Email
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    Demo@gmail.com
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Age
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    28 yr
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Nationality
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    Indian
                </p>
            </div>
            </div>
        </div>
    );
}

export default About;
