import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {toast,Toaster} from 'react-hot-toast'
import {Formik, useFormik} from 'formik'
import { loginValidation } from '../../../../helper/validate'
import instance from "../../instance/instance";
import { useDispatch, useSelector } from "react-redux";
import { setuserData } from "../../../../redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Components/header/Header";


const Login = () => {

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  console.log(user)
  const navigate = useNavigate()

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
      try {
        await instance.post('/login',{value}).then((response)=>{
          localStorage.setItem = response.data
          dispatch(setuserData(response.data.userData))
          navigate('/')
        })
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

  })


  return (
    <div className="login">
      <Toaster position="top-center"></Toaster>
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
                  <a href="#" className="text-sm text-gray-600 hover:text-cyan-800">
                   forgot password?
                  </a>
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
