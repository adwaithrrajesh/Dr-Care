import React from 'react';


const AdminLogin = () => {
    return (
        <div>
            <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/008/883/653/non_2x/administrator-concept-banner-flat-style-vector.jpg')]">
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
