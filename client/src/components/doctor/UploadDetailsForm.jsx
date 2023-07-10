import React from "react";
import doctorInstance from "../../instance/doctorInstance";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useState,useEffect } from "react";
import { DoctorUploadValidation } from "../../helpers/validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getDepartments } from "../../API/user";


const Form = () => {

  const navigate = useNavigate()  

  const [department,setDepartment] = useState([])
  const [idCard,setIdCard] = useState('')
  const [certificate,setCertificate] = useState('')
  const doctorToken = JSON.parse(localStorage.getItem("doctorToken"));
  


  // Fetching Departments
  useEffect(() => {
    viewDepartments()
  }, []);

  const viewDepartments = async()=>{
    const response = await getDepartments()
    setDepartment(response.data.departments)
  }

  const handleIdCard = (event) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const idImage = event.target.files[0];
    if (idImage && validImageTypes.includes(idImage.type)) {
      setIdCard(idImage);
   } else {
     toast.error('Please select a valid image file');
   }
  };
  const handleCertificate = (event) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const certificate = event.target.files[0];
    if (certificate && validImageTypes.includes(certificate.type)) {
      setCertificate(certificate)
   } else {
     toast.error('Please select a valid image file');
   }
  };
  // Formik
  const Formik = useFormik({
    initialValues: {
      fee:"",
      idNumber : "",
      qualification: "",
      departmentName: "",
      experience:""
    },
    validate: DoctorUploadValidation,
    validateOnBlur: false,
    validateOnChange: false,

    // Submit
    onSubmit: async (value) => {
      const idImage = idCard;
      const certificationImage = certificate; 

      if (!idImage) {
        toast.error("Please add your Id Image");
      } else if (!certificationImage) {
        toast.error("Please add your certificate");
      } else {
        toast.loading("Processing...");
       
        const uploadImage = async (image, name) => {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "drcareStorage");
          const response = await axios.post("https://api.cloudinary.com/v1_1/dg047twga/image/upload",data);
          return response.data.url;
        };
      
        Promise.all([uploadImage(idImage, "IdcardImage"),uploadImage(certificationImage, "certificateImage")
            ]).then(([IdcardImage, certificateImage]) => {
              console.log(value)
            return doctorInstance.patch("/doctor/addDoctorDetails",{value,IdcardImage,certificateImage},{headers: { Authorization: `Bearer ${doctorToken}` }})
          }).then((response) => {
            toast.dismiss();
            toast.success(response.data.message);
            navigate("/doctor/home");
          }).catch((error) => {
            toast.dismiss();
            toast.error(error.response?.data?.message || "An unknown error occurred. Please try again later.");
          });
      }
      
    }
  });




  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-24 py-14 mt-4 text-left bg-blue-100 shadow-lg rounded-lg">
          <p className="text-2xl text-center">Upload Details</p>

          <div class="flex items-center justify-center w-full mt-10">
            <img
              src="https://www.kindpng.com/picc/m/160-1608792_circle-document-icon-png-transparent-png.png"
              className="rounded-full h-52"
              alt="upload image"
            />
          </div>

          <form onSubmit={Formik.handleSubmit}>

            <div className="mt-4">
            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Id Number</label>
            </div>
              <input
                type="number"
                placeholder="Id Number"
                className=" w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                name="idNumber"
              {...Formik.getFieldProps("idNumber")}
              />
            </div>

            <div className="mt-4">
            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Qualification</label>
            </div>
              <input
                type="text"
                placeholder="Qualification"
                className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                name="qualification"
              {...Formik.getFieldProps("qualification")}
              />
            </div>

            <div className="mt-4">
            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Department</label>
            </div>
            <select
              class="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-1 focus:ring-cyan-600" name="departmentName" 
              {...Formik.getFieldProps("departmentName")}>
                  <option selected hidden className="text-gray-500">Choose Department</option>
                {
                  department.map((department)=>
                    <option>{department.departmentName}</option>
                  )
                }
             
            </select>
            </div>

            <div className="mt-4">
            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Fee</label>
            </div>
              <input
                type="number"
                placeholder="Fee"
                className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                name="fee"
                {...Formik.getFieldProps("fee")}
              />
            </div>


            <div className="mt-4">
            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Year of Experience</label>
            </div>
              <input
                type="number"
                placeholder="Years of Experience"
                className="w-full px-9 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
                name="experience"
                {...Formik.getFieldProps("experience")}
              />
            </div>

            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Upload Your Id Card</label>
            </div>
            <div class="flex items-center justify-center w-full">
              <input
              accept="image/*"
                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-white bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-cyan-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-cyan-600 focus:border-primary focus:text-cyan-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-cyan-600 dark:text-cyan-700 dark:file:bg-cyan-700 dark:file:text-neutral-100"
                type="file"
                onChange={handleIdCard}
              />
            </div>

            <div class="flex items-center justify-start w-full mt-3">
              <label className="text-gray-500">Upload Your Cerification</label>
            </div>
            <div class="flex items-center justify-center w-full">
              <input
              accept="image/*"
                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-white bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-cyan-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-cyan-600 focus:border-primary focus:text-cyan-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-cyan-600 dark:text-cyan-700 dark:file:bg-cyan-700 dark:file:text-neutral-100"
                type="file"
                onChange={handleCertificate}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-center">
                <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800" type="submit">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
