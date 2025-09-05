import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        currentcity:null,
        currentstate:null,
        currentaddress:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setcurrentCity:(state,action)=>{
            state.currentcity=action.payload
        },
        setCurrentState:(state,action)=>{
            state.currentstate=action.payload
        },
        setCurrentAddress:(state,action)=>{
            state.currentaddress=action.payload
        }
    }
    
})
export const {setUserData,setcurrentCity,setCurrentState,setCurrentAddress} = userSlice.actions
export default userSlice.reducer