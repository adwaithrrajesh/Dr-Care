import React from "react";
import DoctorHeader from "../../components/doctor/DoctorHeader";
import "../../styles/UploadDetails.css";
import Form from "../../components/doctor/UploadDetailsForm";


const UploadDetails = () => {
  return (

      <div className="uploadDetails">
        <DoctorHeader />
        <Form />
      </div>
      
  );
};

export default UploadDetails;
