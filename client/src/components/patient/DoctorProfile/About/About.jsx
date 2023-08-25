import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { reportDoctor } from "../../../../API/user";

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState("");
  const [loading,setLoading] = useState(false)
  const [reportModal,setReportModal] = useState(false)
  const [report,setReport] = useState('')


  useEffect(() => {
    setLoading(true)
    setDoctor(location.state);
    setLoading(false)
  }, []);

  const sendReportToAdmin = async(report) =>{
    try {      
      toast.loading('reporting...')
      const response = await reportDoctor(report,doctor._id)
      toast.dismiss()
      toast.success(response.data.message)
      setReportModal(false)
    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
          {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}


    {/* Report Modal */}


{reportModal &&  
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
   
    <div class="fixed inset-0 flex items-center justify-center">
  <div class="bg-white rounded-lg shadow-lg p-6 w-[700px]">
    <h2 class="text-xl font-bold mb-4 text-red-500">Report</h2> 
    <p class="mb-4">Reason for your Report :</p>
    <textarea class="w-full rounded-lg bg-slate-200 focus:outline-none" onChange={(e)=>setReport(e.target.value)} placeholder="Discription" rows="4"></textarea>
    <div class="mt-4 flex justify-end">
      {
        report ?
      <button type="submit" class="bg-red-800 hover:bg-red-700 text-white rounded-lg px-4 py-2" onClick={()=>sendReportToAdmin(report)}>Report</button>
      :
      <button class="bg-red-300 text-white rounded-lg px-4 py-2" >Report</button>
      }
      <button class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg px-4 py-2"onClick={()=>setReportModal(false)}>Cancel</button>
    </div>
  </div>
</div>
    </div>
}

    {/* ------------- */}
      <div class=" flex flex-col justify-center items-center">
        <h6 class="text-gray-700 text-lg mt-16">
          {doctor.firstName} {doctor.lastName}
        </h6>

        <p class="text-gray-400 mt-2 text-sm">{doctor.departmentName}</p>
      </div>

      <div class=" flex justify-center items-center mt-2 space-x-2">
        <button
          class="bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/book", { state: doctor._id })}>
          Book Now
        </button>

        <button
          class="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>setReportModal(true)} >
            Report
        </button>
      </div>

      

      <div className="rounded-t-3xl h-[550px] mt-36 w-full bg-blue-100">
        <div className="rounded-full h-1 w-full">
          <p className="text-3xl text-center pt-4">About</p>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-1/2 m">
              Name
            </p>
            <p className="flex text-end  items-center justify-end w-1/2 ">
              {doctor?.firstName} {doctor.lastName}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Department
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.departmentName}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Experience
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.experience}years
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Email
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.email}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Fee
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.fee}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Phone Number
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              +91 {doctor.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
