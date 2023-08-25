import {createSlice} from '@reduxjs/toolkit'


 const searchSlice = createSlice({
    name: 'search',
    initialState:{
        searchData:[]
    },
    reducers:{
        setSearchData : (state,action)=>{
            state.searchData = action.payload
        }
    }
})
 
export const {setSearchData} =searchSlice.actions
export default searchSlice.reducer