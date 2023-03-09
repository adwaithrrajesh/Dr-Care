import React from "react";
import './Signup.css'

const Signup = () => {
  return (
    <div className="signup">
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="px-16 py-20 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
            <p className="text-2xl text-center">Create your account</p>
            <form action="">

               <div className="mt-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    required
                  />
                </div>

              <div className="mt-4">
                <div>
                  <input
                    type="password"
                    placeholder="Create Password"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                  />
                </div>
                <div className="flex items-baseline justify-center">
                  <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-baseline  mt-6 justify-center">
              <a href="/login" className="text-sm text-gray-600">
                already have an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
