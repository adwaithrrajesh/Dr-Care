import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../../../instance/instance';
import { toast } from 'react-hot-toast';

const About = () => {

    const location = useLocation()

    const [doctor,setDoctor] = useState('')

    useEffect(() => {
        console.log(location.state,"hereeeeeeeeee")
        setDoctor(location.state)
    }, []);

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
                    {doctor?.firstName} {doctor.lastName}
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Department
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                   {doctor.departmentName}
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Experience
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                     {doctor.experience}years
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Email
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    {doctor.email}
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Fee
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    {doctor.fee}
                </p>
            </div>
            </div>

            <div className='rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200'>
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className='flex text-start text-cyan-800 items-center justify-start w-10 '>
                    Phone Number
                </p>
                <p className='flex text-end  items-center justify-end w-full '>
                    +91 {doctor.phoneNumber}
                </p>
            </div>
            </div>
        </div>
    );
}

export default About;
