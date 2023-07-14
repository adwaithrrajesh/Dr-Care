import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, useToaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getDoctorDetails } from "../../../../API/doctor";
import doctorInstance from "../../../../instance/doctorInstance";



const EditDetails = () => {
  const [doctor, setDoctor] = useState([]);
  const [reload,setReload] = useState()

  const navigate = useNavigate()

  // -----------------------------------------------------FORM DATA STORING----------------------------------------------------------------
  const [firstName,setFirstName] = useState()
  const [lastName,setLastName] = useState()
  const [email,setEmail] = useState()
  const [fee,setFee] = useState()
  const [experience,setExperience] = useState()
  const [phoneNumber,setPhoneNumber] = useState()
  const [loading,setLoading] = useState(false)


  const details = {
    firstName,
    lastName,
    email,
    fee,
    experience,
    phoneNumber
  }

  // -----------------------------------------------------GET DOCTOR DETAILS----------------------------------------------------------------

  useEffect(() => {
    getDoctor()
  }, [reload]);

  const getDoctor = async() =>{
    setLoading(true)
    const response = await getDoctorDetails()
    setLoading(false)
    setDoctor(response.data.doctorDetails);
  }

  // -----------------------------------------------------------UPDATE PROFILE PHOTO----------------------------------------------------------------
  const profileUpload = async(profile) =>{
    const formData = new FormData();
    formData.append("file", profile);
    formData.append("upload_preset", "drcareStorage");
    setLoading(true)
    await axios.post("https://api.cloudinary.com/v1_1/dg047twga/image/upload",formData).then((response)=>{
        const profile = response.data.url
        const doctorId = doctor._id
        doctorInstance.patch('/doctor/updateProfile',{profile}).then((response)=>{
            setLoading(false)
            toast.success(response.data.message)
            setReload(!reload,'i')
        }).catch((error)=>{
          setLoading(false)
            toast.error(error.response.data.message)
        })
    })
  }

  // -----------------------------------------------------------UPDATE PROFILE DETAILS-------------------------------------------------

  const handleSubmit = (e) =>{
    e.preventDefault()
    const isEmpty = Object.values(details).every(x => !x);
    if (isEmpty) {
      toast.error('Please update something');
    } else {
      doctorInstance.patch('/doctor/updateProfileDetails', { details }).then(response => {
          navigate('/doctor/profile');
          toast.success(response.data.message);
        }).catch(err => {
          toast.error(err.response.data.message);
        });
    }
    
  }

  


 
  return (
    <div>
         {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
      <div>
      <div class=" h-48 flex flex-col justify-center items-center mt-24">
        <img
          src={doctor.profilePhoto}
          class="block h-48 w-48  rounded-full object-cover"
          alt=""
        />
      </div>
        <div class="flex flex-col justify-center items-center">
          <h6 class="text-gray-700 text-lg mt-8">
            {doctor.firstName} {doctor.lastName}
          </h6>
          <p class="text-gray-400 mt-2 text-sm">{doctor.departmentName}</p>

          
          <div class="flex items-center justify-center mt-4">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-48 h-10 border-2 border-blue-300 rounded-lg cursor-pointer bg-gray-50  dark:bg-blue-500 hover:bg-gray-100 dark:border-blue-300 dark:hover:border-cyan-500 dark:hover:bg-blue-500">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <p class=" text-sm text-white dark:text-white">
                  <span class="font-semibold">Update Profile Photo</span>{" "}
                </p>
              </div>
              <input id="dropzone-file" type="file"  class="hidden" onChange={(e)=>{profileUpload(e.target.files[0]);}} />
            </label>
          </div>

        </div>
        <div>
          <div className="rounded-t-3xl h-[600px] mt-36 w-full bg-blue-100">
            <div className="rounded-full h-1 w-full">
              <p className="text-3xl text-center text-cyan-900 pt-4">Edit Profile</p>
          </div>

        <form onSubmit={handleSubmit}> 

          <div className="rounded-full h-1 w-full flex justify-end">
              <button
                type="submit"
                class="bg-blue-400 h-10 mr-10  hover:bg-blue-500 mt-6 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>
            <div className="rounded-2xl ml-2 h-[67px] w-[99%] bg-blue-50 mt-16 hover:bg-blue-200 ">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <div className="flex text-start text-cyan-800 items-center justify-start w-1/2 mb-16">
                  <p>First Name</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-16">
                  <input
                    type="text"
                    defaultValue={doctor.firstName}
                    className=" h-10 text-center  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="firstName"
                    onChange={e=>setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl ml-2 h-[67px] w-[99%] bg-blue-50 mt-4 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <div className="flex text-start text-cyan-800 items-center justify-start w-1/2 mb-16">
                  <p>Last Name</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-16">
                  <input
                    type="text"
                    defaultValue={doctor.lastName}
                    className=" h-10 text-center  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="lastName"
                    onChange={e=>setLastName(e.target.value)}
                  required
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl ml-2 h-[67px] w-[99%] bg-blue-50 mt-4 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <div className="flex text-start text-cyan-800 items-center justify-start w-1/2 mb-16">
                  <p>Email</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-16">
                  <input
                    type="email"
                    defaultValue={doctor.email}
                    className=" h-10 text-center  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="email"
                  required
                  onChange={e=>setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl ml-2 h-[67px] w-[99%] bg-blue-50 mt-4 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <div className="flex text-start text-cyan-800 items-center justify-start w-1/2 mb-16">
                  <p>Fee</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-16">
                  <input
                    type="text"
                    defaultValue={doctor.fee}
                    className=" h-10 text-center  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="fee"
                    required
                    onChange={e=>setFee(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl ml-2 h-[67px] w-[99%] bg-blue-50 mt-4 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <div className="flex text-start text-cyan-800 items-center justify-start w-1/2 mb-16">
                  <p>Experience</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-16">
                  <input
                    type="text"
                    defaultValue={doctor.experience}
                    className=" h-10 text-center  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="experience"
                    required
                    onChange={e=>setExperience(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl ml-2 h-[67px] w-[99%] bg-blue-50 mt-4 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <div className="flex text-start text-cyan-800 items-center justify-start w-1/2 mb-16">
                  <p>Phone Number</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-14">
                  <input
                    type="number"
                    defaultValue={doctor.phoneNumber}
                    className=" h-10 text-center  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="phoneNumber"
                    required
                    onChange={e=>setPhoneNumber(e.target.value)}
                    
                  />
                </div>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
