import {createSlice} from '@reduxjs/toolkit'


 const doctorProfileDetailSlice = createSlice({
    name: 'doctorProfileDetails',
    initialState:{
        doctorProfileDetails:[]
    },
    reducers:{
        setDoctorProfileDetails : (state,action)=>{
            state.doctorDetails = action.payload
        }
    }
})
 
export const {setDoctorProfileDetails} = doctorProfileDetailSlice.actions
export default doctorProfileDetailSlice.reducer