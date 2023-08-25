import { configureStore } from "@reduxjs/toolkit";
import  searchSlice from "./Slices/searchSlice";
import doctorCertificateSlice from "./Slices/doctorCertificateSlice";
import doctorProfileDetail from "./Slices/doctorProfileDetail";


export default configureStore({
    reducer:{
        search:searchSlice,
        doctorProof: doctorCertificateSlice,
        doctorProfile : doctorProfileDetail
    }
})


