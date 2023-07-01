import React from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";
import {toast} from 'react-hot-toast'
import {useFormik} from 'formik'
import { loginValidation } from '../../helpers/validate'
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../API/user";
import { useState } from "react";


const Login = () => {


  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const Formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validate: loginValidation,
    validateOnBlur : false,
    validateOnChange: false,

    // Submit
    onSubmit: async(value) =>{
         setLoading(true)
         const response = await doLogin(value)
         localStorage.setItem('clientToken', JSON.stringify(response.data.token))
         setLoading(false)
          toast.success(response.data.message)
          navigate('/')
    }
  })


  return (
    <div className="login">
           {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-12 py-20 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
          <p className="text-2xl text-center">Login to your account</p>
          <form onSubmit={Formik.handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" for="email">
                  Email 
                </label>
              
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-5 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="email"
                  {...Formik.getFieldProps("email")}
                />  
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="password"
                  {...Formik.getFieldProps("password")}
                />

                <div className="flex items-baseline justify-end mt-2">
                  <Link to='/forgotPassword' className="text-sm text-gray-600 hover:text-cyan-800">
                   forgot password?
                  </Link>
                </div>
              </div>
              <div className="flex items-baseline justify-center">
                <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-baseline  mt-6 justify-center">
            <Link to={'/signup'} className="text-sm text-gray-600">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
