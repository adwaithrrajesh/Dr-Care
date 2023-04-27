import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../instance/instance";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setdoctorCertificateDetails } from '../../redux/Slices/doctorCertificateSlice'


const VerificationList = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    instance.get("/admin/verificationRequests").then((response) => {
      setDoctor(response.data.doctorData);
    });
  }, [reload]);

  const verifyDoctor = (doctorId) => {
    Swal.fire({
      title: 'Verify Doctor',
      text: "Are you sure want to Verify the doctor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Verify'
    }).then((result) => {
      if (result.isConfirmed) {
      instance.post("/admin/verifyDoctor", { doctorId })
      .then((response) => {
        setReload(!reload, "!");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
      }
    })
   
  };

  const unVerifyDoctor = (doctorId) => {
    Swal.fire({
      title: 'Unverify doctor',
      text: "Are you sure want to unverify the doctor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Unverify'
    }).then((result) => {
      if (result.isConfirmed) {
      instance.post("/admin/unVerifyDoctor", { doctorId })
      .then((response) => {
        setReload(!reload, "!");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
      }
    })
  
  };

  return (
    <div class="p-4 sm:ml-64">
      <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
        <img
          src="https://static.vecteezy.com/system/resources/previews/015/412/022/original/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
          className="h-24 rounded-full"
          alt=""
        />
      </div>
      <p className="text-3xl text-center pt-4">Doctor Management</p>

      <div class="container">
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead class="text-white">

            {doctor.map((doctor) => (
              <tr class="bg-blue-300 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th class="p-3 text-left">Id Num</th>
                <th class="p-3 text-left">Full Name</th>
                <th class="p-3 text-left">Experience</th>
                <th class="p-3 text-left">Fee</th>
                <th class="p-3 text-left">Qualification</th>
                <th class="p-3 text-left">Status</th>
                <th class="p-3 text-left">Details</th>
                <th class="p-3 text-left" width="110px">
                  Action
                </th>
              </tr>
            ))}
          </thead>
          <tbody class="flex-1 sm:flex-none">
            {doctor.map((doctor) => (
              <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                <td class="border-grey-light border hover:bg-gray-100 p-3">
                  {doctor.idNumber}
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {doctor.firstName} {doctor.lastName}
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {doctor.experience} years
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  ₹{doctor.fee}
                </td>
                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {doctor.qualification}
                </td>

                {doctor.verificationStatus ? (
                  <td class="border-grey-light border hover:bg-gray-100 p-3 text-green-400  hover:font-medium cursor-pointer">
                    Approved
                  </td>
                ) : (
                  <td class="border-grey-light border hover:bg-gray-100 p-3 text-yellow-400  hover:font-medium cursor-pointer">
                    Pending
                  </td>
                )}

                <td
                  class="border-grey-light border hover:bg-gray-100 p-3 truncate text-blue-500"
                  onClick={() => {dispatch(setdoctorCertificateDetails([doctor.certificateImage,doctor.idCardImage])); navigate('/admin/viewVerificationImage') }}>
                  view certificate and Id image
                </td>

                {doctor.verificationStatus ? (
                  <td
                    class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                    onClick={() => {
                      unVerifyDoctor(doctor._id);
                    }}>
                    Unverify
                  </td>
                ) : (
                  <td
                    class="border-grey-light border hover:bg-gray-100 p-3 text-green-400 hover:text-green-600 hover:font-medium cursor-pointer"
                    onClick={() => verifyDoctor(doctor._id)}>
                    Verify
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationList;
