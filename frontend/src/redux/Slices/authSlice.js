import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance"

export const createAccount = createAsyncThunk("/auth/signup",async(data) => {
    try {
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait !! creating your account",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        console.log("resauth",res)
        return (await res).data
    } catch (error) {
        toast.error(error?.res?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    intialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        role: localStorage.getItem("role") || "",
        data: localStorage.getItem("data") || {}
    },
    reducers:{}
})


// export const {} = authSlice.actions;
export default authSlice.reducer;