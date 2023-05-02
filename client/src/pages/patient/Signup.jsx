import React, { useState } from "react";
import '../../styles/Signup.css'
import {toast} from 'react-hot-toast'
import {useFormik} from 'formik'
import {signupValidation} from '../../helpers/validate'
import { Link, useNavigate } from "react-router-dom";
import { userRegisterOtp } from "../../API/user";



const Signup = () => {

  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

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
      setLoading(true)
       const response = await userRegisterOtp(value)
       setLoading(false)
       toast.success(response.data.message)
       navigate('/otp')
    }
  })

  
  return (
    <div className="signup">
       {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
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
                    type="number"
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
              <Link to={'/login'} className="text-sm text-gray-600">
                already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
