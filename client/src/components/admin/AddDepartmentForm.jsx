import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { DepartmentValidation } from "../../helpers/validate";
import instance from "../../instance/instance";
import axios from "axios";

const AddDepartmentForm = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImage = (event) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const inputImage = event.target.files[0];
    if (inputImage && validImageTypes.includes(inputImage.type)) {
       setImage(inputImage);
    } else {
      toast.error('Please select a valid image file (JPEG, PNG, GIF)');
    }
  };

  const data = new FormData();

  const Formik = useFormik({
    initialValues: {
      departmentName: "",
      departmentDiscription: "",
    },
    validate: DepartmentValidation,
    validateOnBlur: false,
    validateOnChange: false,

    // Submit
    onSubmit: async (value) => {
      if (!image) {
        toast.error("Please Add an Image");
      } else {
        toast.loading("Processing...");
        // Upload Image to cloudinary
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "drcareStorage");  
        try {
          await axios.post("https://api.cloudinary.com/v1_1/dg047twga/image/upload",formData).then((response)=>{
          toast.dismiss();
          const departmentImage = response.data.url
          // Submitting data to Backend
          instance.post("/admin/addDepartment", { value, departmentImage }).then((response) => {
              toast.dismiss();
              toast.success(response.data.message);
              navigate("/admin/departmentManagement");
            }).catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
          })
        } catch (err) {
          toast.dismiss()
          toast.error("Unable to upload the Image");
        }
      }
    },
  });

  return (
    <div class="p-4 sm:ml-64">
      <div className="rounded-2xl mt-10  h-[950px] overflow-y-scroll scrollbar-hide bg-blue-100 ">
        <div className="rounded-full h-1 w-full">
          <p className="text-3xl text-center pt-4">Add Department</p>
        </div>

        <div class="flex justify-center w-full mt-24 ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/411/889/original/syringe-illustration-object-medical-tools-flat-cartoon-style-suitable-for-icon-web-landing-page-banner-flyer-sticker-card-background-t-shirt-clip-art-free-vector.jpg"
            alt=""
            className="rounded-full h-96"
          />
        </div>

        <div class="flex justify-center w-full mt-24 ">
          <input
            class="px-3 py-3 placeholder-slate-500 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-3/4"
            id="file_input"
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        <form onSubmit={Formik.handleSubmit}>
          <div class="mt-10  pt-0 flex text-center items-center justify-center">
            <input
              type="text"
              placeholder="Department Name"
              class="px-3 py-3 placeholder-slate-500 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-3/4"
              {...Formik.getFieldProps("departmentName")}
            />
          </div>

          <div class="mt-10  pt-0 flex text-center items-center justify-center">
            <input
              type="text"
              placeholder="Discription"
              class="px-3 py-3 placeholder-slate-500 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-3/4"
              {...Formik.getFieldProps("departmentDiscription")}
            />
          </div>

          <div class="mt-10  pt-0 flex text-center items-center justify-center">
            <button
              type="submit"
              className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentForm;
