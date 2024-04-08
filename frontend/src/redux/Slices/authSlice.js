import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance"

export const createAccount = createAsyncThunk("/auth/signup",async(data) => {
    try {
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait !! creating your account",
            success:(data) => {
                console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        console.log("resauth",res)
        console.log(await res);
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error?.res?.message);
    }
})

export const login = createAsyncThunk("/auth/login",async(data) => {
    try {
        const res = axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading:"wait for loggedIn",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to login account"
        })
        console.log("resauth",res)
        return (await res).data
    } catch (error) {
        toast.error(error?.res?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        role: localStorage.getItem("role") || "",
        data: localStorage.getItem("data") || {}
    },
    reducers:{
        setPageName: (state, newName) => {
            state.pageName = newName
        }
    },
    extraReducers:(builder) => {
        builder.addCase(login.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",JSON.stringify(action?.payload?.user?.role));
            state.isLoggedIn = true,
            state.data = JSON.stringify(action?.payload?.user);
            state.isLoggedIn = true,
            state.role = JSON.stringify(action?.payload?.user?.role);
        })
    }
})


// export const {} = authSlice.actions;
console.log(authSlice.reducer);
export default authSlice.reducer;