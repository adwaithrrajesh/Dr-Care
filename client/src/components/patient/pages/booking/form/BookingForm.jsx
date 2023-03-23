import React from 'react';

const BookingForm = () => {
    return (
        <div>
            <div className="bg-[url('https://t3.ftcdn.net/jpg/03/67/62/24/360_F_367622414_caYXN5n4chd9XjDbMAFi5BnaHgRTsRzK.jpg')] ">
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="px-16 py-20 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
            <p className="text-2xl text-center">Book Appointment</p>
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
                  <input
                    type="time"
                    placeholder="Age"
                    className="w-1/2 px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    required
                  />

                      <input
                    type="date"
                    className="w-1/2 px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                    required
                  />
                </div>

              <div className="mt-4">
                <div className="flex items-baseline justify-center">
                  <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                    Book now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
}

export default BookingForm;
