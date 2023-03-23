import React from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import {toast,Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import drinstance from "../../instance/drInstance";



const DrOtp = () => {
  const [otpCode, setCode] = useState("");
  const handleChange = (otpCode) => setCode(otpCode);
  const navigate = useNavigate()
  // Handle Submit
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(otpCode.length < 6){
      toast.error('Please enter Otp')
    }else{  
      try {
       await drinstance.post('/otpVerify',{otpCode}).then((response)=>{
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/doctor/login')
        }, 1500);
      }) 
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }

  return (

    <div>
      <Toaster position="top-center"></Toaster>
      <div class=" bg-[url('https://www.uplead.com/wp-content/uploads/2022/05/How-to-write-an-email-to-ceo.png')] bg-no-repeat bg-cover relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-blue-200 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email</p>
              </div>
            </div>

          <form onSubmit={handleSubmit}>
            <div>
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs mr-24">
                  <div class="w-16 h-16 pr-1">
                    <OtpInput
                      value={otpCode}
                      onChange={handleChange}
                      numInputs={6}
                      separator={<span style={{ width: "100px" }}></span>}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      className="w-full h-20 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ml-1"
                      focusStyle={{
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div class="flex flex-col space-y-5">
                  <div>
                    <button type="submit" class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-cyan-700 hover:bg-cyan-600 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
                  

                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      class="flex flex-row items-center text-cyan-500"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer">
                      Resend
                    </a>
                  </div>
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

export default DrOtp;
