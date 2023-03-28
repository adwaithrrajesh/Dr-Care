import {createSlice} from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState:{
        userData:{}
    },
    reducers:{
        setuserData : (state,action)=>{
            state.userData = action.payload
        }
    }
})
 
export const {setuserData} = userSlice.actions
export default userSlice.reducer