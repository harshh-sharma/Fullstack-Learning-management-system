import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance"


export const createAccount = createAsyncThunk("/auth/signup",async(data) => {
    try {
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait !! creating your account",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
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
            error:res?.data?.message
        })
        // console.log(await res);
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error?.res?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout",async() => {
   try {
     const res = axiosInstance.get("user/logout");
     toast.promise(res,{
         loading:"wait !! logged out",
         success:(data) => {
             return data?.data?.message;
         },
         error:"Failed to logout"
     })
   } catch (error) {
        toast.error(error?.res?.message);
   }
})

export const updateUserProfile = createAsyncThunk("/auth/edit",async(userData) => {
    try {
        console.log(userData);
        // const formData = new FormData();
        // formData.append("avatar",userData);
        const response = axiosInstance.put("/user/update",{userData});
        toast.promise(response,{
            loading:"wait !! updating your profile",
            success:"profile updated successfully",
            error:"failed to update user profile"
        })
        return (await response).data
    } catch (error) {
        toast.error(response?.data?.message)
    }
})

export const getUserProfile = createAsyncThunk("/auth/profile",async() => {
    try {
        const response = axiosInstance.get("/user/profile");
        toast.promise(response,{
            loading:"wait || profile is loaded",
            success:"profile get succesfully",
            error:"failed to get profile"
        })
        return (await response).data;
    } catch (error) {
        toast.error(response?.data?.message)
    }
})

export const getSubscription = createAsyncThunk("payment/subcribe",async() =>{
    try {
        const response = axiosInstance.post("/payment/subscribe");
        toast.promise(response,{
            loading:"wait !! for subscription",
            success:"successfully subscribe the course",
            error:"failed to subscribe"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        role: localStorage.getItem("role") || "",
        data: localStorage.getItem("data") == 'undefined' ? {} : JSON.parse(localStorage.getItem("data")),
        subscriptionStatus:localStorage.getItem("status") ||""
        // !== undefined ? JSON.parse(localStorage.getItem("data")) :
    },
    reducers:{
        // setPageName: (state, newName) => {
        //     state.pageName = newName
        // }
    },
    extraReducers:(builder) => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",JSON.stringify(action?.payload?.user?.role));
            state.isLoggedIn = true,
            state.data = JSON.stringify(action?.payload?.user);
            state.isLoggedIn = true,
            state.role = JSON.stringify(action?.payload?.user?.role);
        })
        .addCase(logout.fulfilled,(state,action) => {
            state.data = {};
            state.isLoggedIn = false,
            state.role = ""
            localStorage.clear();
        })
        .addCase(getUserProfile.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.data));
            state.data = JSON.stringify(action?.payload?.data);
        })
        .addCase(getSubscription.fulfilled,(state,action) => {
            // console.log(state);
            localStorage.setItem("status",JSON.stringify(action?.payload?.data?.subscription?.status));
            state.subscriptionStatus = action?.payload?.data?.subscription?.status
       })
    }
})


// export const {} = authSlice.actions;
export default authSlice.reducer;