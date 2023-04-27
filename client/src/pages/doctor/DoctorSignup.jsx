import React from "react";
import "../../styles/DoctorSignup.css";
import {toast} from 'react-hot-toast'
import {useFormik} from 'formik'
import {signupValidation} from '../../helpers/validate'
import { Link, useNavigate } from "react-router-dom";
import { otpSend } from "../../API/doctor";



const DoctorSignup = () => {

  const navigate = useNavigate()
  const Formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      phoneNumber:'',
      email:'',
      password:'',
      confirmPassword:''
    },
    validate: signupValidation,
    validateOnBlur: false,
    validateOnChange:false,

    onSubmit: async(value) =>{
      toast.loading('Processing')
      const response =  await otpSend(value)
          toast.dismiss()
          toast.success(response.data.message);
          navigate('/doctor/otp');
    }
  })

  return (
    <div className="doctorSignup">
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="px-16 py-20 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
            <p className="text-2xl text-center">Create your account</p>
            
            <form onSubmit={Formik.handleSubmit}>
               <div className="mt-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="firstName"
                    {...Formik.getFieldProps("firstName")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="lastName"
                    {...Formik.getFieldProps("lastName")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="phoneNumber"
                    {...Formik.getFieldProps("phoneNumber")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="email"
                    {...Formik.getFieldProps("email")}
                  />
                </div>

              <div className="mt-4">
                <div>
                  <input
                    type="password"
                    placeholder="Create Password"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="password"
                    {...Formik.getFieldProps("password")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="confirmPassword"
                    {...Formik.getFieldProps("confirmPassword")}
                  />
                </div>

                <div className="flex items-baseline justify-center">
                  <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800" type="submit" >
                    Register
                  </button>
                </div>
              </div>
            </form>

            <div className="flex items-baseline  mt-6 justify-center">
              <Link to={"/doctor/login"} className="text-sm text-gray-600">
                already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
