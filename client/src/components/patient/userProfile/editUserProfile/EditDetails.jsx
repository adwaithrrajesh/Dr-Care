import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import instance from '../../../../instance/instance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getProfileDetails } from '../../../../API/user';

const EditDetails = () => {

    const token = JSON.parse(localStorage.getItem("clientToken"));
    const navigate = useNavigate()

// ----------------------------------------------------------------STATES-------------------------------------------------------------------//
    const [user,setUser] = useState()
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const [reload,setReload] = useState(false)
  
    const details = {
      firstName,
      lastName,
      email,
      phoneNumber
    }    



// ----------------------------------------------------------------FETCHING USER DETAILS-------------------------------------------------------------------//

    useEffect(() => {
      getDetails()
    }, [reload])

    const getDetails = async()=>{
      const response = await getProfileDetails()
      setUser(response.data.userDetails)
    }



// ----------------------------------------------------------------UPDATING PROFILE PHOTO-------------------------------------------------------------------//

const profileUpload = async(profile) =>{
  const formData = new FormData();
  formData.append("file", profile);
  formData.append("upload_preset", "drcareStorage");
  await axios.post("https://api.cloudinary.com/v1_1/dg047twga/image/upload",formData).then((response)=>{
      const profile = response.data.url
      instance.patch('/updateProfilePhoto',{profile}).then((response)=>{
          toast.success(response.data.message)
          setReload(!reload)
      }).catch((error)=>{
          toast.error(error.response.data.message)
      })
  })
}

// ----------------------------------------------------------------Update Details-------------------------------------------------------------------//

const handleSubmit = (e) =>{
  e.preventDefault()
  const isEmpty = Object.values(details).every(x => !x);
  if (isEmpty) {
    toast.error('Please update something');
  } else {
    instance.patch('/updateProfileDetails', { details }, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
      toast.success(response.data.message)
      navigate('/profile')
      }).catch(err => {
        toast.error(err.response.data.message)
      });
  }
  
}


// ---------------------------------------------------------------------CODE-------------------------------------------------------------------//

    return (
        <div>
       <div class=" h-48 flex flex-col justify-center items-center mt-24">
        <img
          src={user?.profilePhoto}
          class="block h-48 w-48  rounded-full object-cover"
          alt=""
        />
      </div>
      
        <div class="flex flex-col justify-center items-center">
          <h6 class="text-gray-700 text-lg mt-8">
            {user?.firstName}
            {user?.lastName}
          </h6>

          
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
          <div className="rounded-t-3xl h-[440px] mt-32 w-full bg-blue-100">
            <div className="rounded-full h-1 w-full">
              <p className="text-2xl text-center text-cyan-900 pt-4">Edit Profile</p>
            </div>

        <form onSubmit={handleSubmit}> 

          <div className="rounded-full h-1 w-full flex justify-end">
              <button
                type="submit"
                class="bg-blue-400 h-10 mr-5  hover:bg-blue-500 mt-6 text-white font-bold py-2 px-4 rounded">
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
                    defaultValue={user?.firstName}
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
                    defaultValue={user?.lastName}
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
                    defaultValue={user?.email}
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
                  <p>Phone Number</p>
                </div>

                <div className="flex text-end  items-center justify-end w-1/2 mb-14">
                  <input
                    type="number"
                    defaultValue={user?.phoneNumber}
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
    );
}

export default EditDetails;
