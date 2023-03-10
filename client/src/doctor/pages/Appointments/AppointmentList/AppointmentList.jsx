import React from "react";

const AppointmentList = () => {
  const Appointments = [
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
    {
      Name: "John",
      Date: "10/04/2023",
      Time: "10:00 am",
    },
  ];

  return (
    <div>
      <div className="rounded-t-3xl h-[780px] mt-36 overflow-scroll  bg-blue-100 scroll-smooth scrollbar-hide ">
        <div className="rounded-full h-1 w-full mb-20 ">
          <p className="text-3xl text-center pt-4">Appointment</p>
        </div>  

        {Appointments.map((Patient) => (
          <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-3 hover:bg-blue-200">
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
              <p className="flex text-center text-cyan-800 items-center justify-start w-1/2">
                {Patient.Name} booked an Appointment on {Patient.Date} at{" "}
                {Patient.Time}
              </p>
              <p className="flex text-end  items-center justify-end w-1/2 ">
                View Details
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
