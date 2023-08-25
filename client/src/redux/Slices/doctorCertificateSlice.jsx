import {createSlice} from '@reduxjs/toolkit'


 const drCertificateSlice = createSlice({
    name: 'certificate',
    initialState:{
        doctorCertificateDetails:[]
    },
    reducers:{
        setdoctorCertificateDetails : (state,action)=>{
            state.doctorCertificateDetails = action.payload
        }
    }
})
 
export const {setdoctorCertificateDetails} = drCertificateSlice.actions
export default drCertificateSlice.reducer