import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-12 py-20 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
          <p className="text-2xl text-center">Login to your account</p>
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block" for="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-5 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />  
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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
            <a href="/signup" className="text-sm text-gray-600">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
