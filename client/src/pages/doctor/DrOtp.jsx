import React from "react";
import OTPInput from "react-otp-input";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { OtpVerification } from "../../API/doctor";
import { doctorResendOtp } from "../../API/doctor";

const Otp = () => {
  const [otpCode, setCode] = useState("");
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleChange = (otpCode) => setCode(otpCode);
  const navigate = useNavigate();

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      toast.error("Please enter Otp");
    } else {
      const response = await OtpVerification(otpCode)
          toast.success(response.data.message);
          navigate("/doctor/login");
    }
  };

  // Resend Otp

  const otpResend = async() => {
      setCounter(60);
      toast.loading("Resending Otp");
      const response = await doctorResendOtp()
        toast.dismiss()
        toast.success(response.data.message);
  };

  return (
    <div>
      <div class=" bg-[url('https://www.uplead.com/wp-content/uploads/2022/05/How-to-write-an-email-to-ceo.png')] bg-no-repeat bg-cover relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-blue-200 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email</p>
              </div>
            </div>

            <div>
              <div class="flex flex-col space-y-8">
                <form onSubmit={handleSubmit}>
                  <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs mr-24">
                    <div class="w-16 h-16 pr-1">
                      <OTPInput
                        value={otpCode}
                        onChange={handleChange}
                        numInputs={6}
                        separator={<span style={{ width: "100px" }}></span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        className="w-full h-20 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ml-1"
                        focusStyle={{
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-cyan-700 hover:bg-cyan-600 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
                </form>

                <div class="flex flex-col space">
                  {/* <div>
                      <button
                        type="submit"
                        class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-cyan-700 hover:bg-cyan-600 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div> */}
                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 ">
                    {counter ? (
                      <p className="text-base text-lightBlue">
                        Resend Otp : {counter} Sec
                      </p>
                    ) : (
                      <p className="text-sm text-lightBlue">
                        Didn't get OTP?
                        <button
                          onClick={otpResend}
                          className="ml-1  text-cyan-900">
                          Resend
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
