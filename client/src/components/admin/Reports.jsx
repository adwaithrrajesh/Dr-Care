import React from "react";
import { useEffect } from "react";
import { getReportedDoctorsForAdmin } from "../../API/admin";
import { useState } from "react";
import { Link } from "react-router-dom";

const Reports = () => {

  useEffect(() => {
    getReportedDoctors()
  }, [])

  const [report,setReport] = useState()
  
  const getReportedDoctors = async()=>{
    const response = await getReportedDoctorsForAdmin()
    setReport(response.data.reports)
  }

  return (
    <div class="p-4 sm:ml-64">


{ report?.map((data)=>(
    <div>
        <div className="flex items-center bg-gray-100 hover:bg-white p-4 mt-5 ">
          <div className="mr-4">
            <img className="w-16 h-16 rounded-full" src={data.userProfilePhoto} alt="Profile" />
          </div>
          <div className="flex-grow">
            <p className="text-center text-gray-700 font-bold">
              Doctor {data.doctorName} was reported By {data.userName}
            </p>
              <br />
            <p className="text-center text-gray-700 ">
              Reason : {data.reportDiscription}
              <br />
            </p>
          </div>
          {/* <div>
            <a className="text-blue-500 hover:text-blue-700">View Details</a>
          </div> */}
        </div>  
    </div>
  ))
}

    </div>
  );
};

export default Reports;
