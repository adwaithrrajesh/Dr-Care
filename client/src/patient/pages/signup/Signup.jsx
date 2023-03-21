import React from "react";
import './Signup.css'
import {toast,Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {signupValidation} from '../../../helper/validate'
import { Link } from "react-router-dom";


const Signup = () => {


  const Formik = useFormik({
    initialValues:{
      FirstName:'',
      LastName:'',
      PhoneNumber:'',
      Email:'',
      Password:'',
      ConfirmPassword:''
    },
    validate: signupValidation,
    validateOnBlur: false,
    validateOnChange:false,

    onSubmit: async(value) =>{
      // Loading
      toast.loading('Processing')
      setTimeout(() => {
        toast.dismiss()
      }, 3000);
      

    }
  })

  
  return (
    <div className="signup">
      <Toaster position="top-center"></Toaster>
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
                    name="FirstName"
                    {...Formik.getFieldProps("FirstName")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="LastName"
                    {...Formik.getFieldProps("LastName")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="PhoneNumber"
                    {...Formik.getFieldProps("PhoneNumber")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="Email"
                    {...Formik.getFieldProps("Email")}
                  />
                </div>

              <div className="mt-4">
                <div>
                  <input
                    type="password"
                    placeholder="Create Password"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="Password"
                    {...Formik.getFieldProps("Password")}
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    name="ConfirmPassword"
                    {...Formik.getFieldProps("ConfirmPassword")}
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
