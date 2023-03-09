import React from "react";
import DoctorHeader from "../Components/Header/DoctorHeader";
import "./UploadDetails.css";
import Form from "./form/Form";


const UploadDetails = () => {
  return (

      <div className="uploadDetails">
        <DoctorHeader />
        <Form />
      </div>
      
  );
};

export default UploadDetails;
