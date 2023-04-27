import React from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { passwordValidation } from "../../helpers/validate";
import { DoctorResetPasswordAPI } from "../../API/doctor";

const DoctorResetPassword = () => {
  const navigate = useNavigate();

  const Formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: passwordValidation,
    validateOnBlur: false,
    validateOnChange: false,

    // Submit
    onSubmit: async (value) => {
      const response = await DoctorResetPasswordAPI(value);
      toast.success(response.data.message);
      navigate("/doctor/login");
    },
  });

  return (
    <div className="doctorLogin">
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-12 py-20 mt-7 text-left bg-blue-100 shadow-lg rounded-lg">
          <p className="text-2xl text-center">Change Your Password</p>

          <form onSubmit={Formik.handleSubmit}>
            <div className="mt-4">
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="password"
                  {...Formik.getFieldProps("password")}
                />
              </div>
              <div className="mt-4">
                <label className="block">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="confirmPassword"
                  {...Formik.getFieldProps("confirmPassword")}
                />
              </div>
              <div className="flex items-baseline justify-center">
                <button className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorResetPassword;
