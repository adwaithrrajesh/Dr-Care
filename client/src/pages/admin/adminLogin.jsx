import React from 'react';
import {toast} from 'react-hot-toast'
import {Formik, useFormik} from 'formik'
import { loginValidation } from '../../helpers/validate'
import {adminInstance} from '../../instance/adminInstance'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const AdminLogin = () => {

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
      try {
        setLoading(true)
        await adminInstance.post('/admin/login',{value}).then((response)=>{
          localStorage.setItem('adminToken', JSON.stringify(response.data.token));
          toast.success(response.data.message)
          navigate('/admin')
        setLoading(false)
        })
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })

    return (
        <div>
             {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
            <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/008/883/653/non_2x/administrator-concept-banner-flat-style-vector.jpg')]">
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
                    name='email'
                    className="w-full px-5 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...Formik.getFieldProps("email")}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name='password'
                    {...Formik.getFieldProps("password")}
                  />
                </div>
                <div className="flex items-baseline justify-center">
                  <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}


export default AdminLogin;
