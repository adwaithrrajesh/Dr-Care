import React from "react";
import { toast} from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../../helpers/validate";
import { forgotPasswordOtpSend } from "../../API/doctor";

const DoctorForgotPassword = () => {
  const navigate = useNavigate();

  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: emailValidation,
    validateOnBlur: false,
    validateOnChange: false,

    // Submit
    onSubmit: async (value) => {
      const response = await forgotPasswordOtpSend(value);
      toast.success(response.data.message);
      navigate("/doctor/forgot-password-otp");
    },
  });

  return (
    <div>
      <div className="doctorLogin">
        <div className="flex items-center justify-center min-h-screen">
          <div className="px-28 py-12 mt-7 text-left bg-blue-300 shadow-lg rounded-lg">
            <p className="text-2xl text-center">Enter Your Email</p>
            <form onSubmit={Formik.handleSubmit}>
              <div className="mt-4">
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-16 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="email"
                    {...Formik.getFieldProps("email")}
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-center">
                <button
                  type="submit"
                  className="px-14 py-2 mt-6 text-white bg-cyan-700 rounded-lg hover:bg-cyan-800">
                  Send Otp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorForgotPassword;
