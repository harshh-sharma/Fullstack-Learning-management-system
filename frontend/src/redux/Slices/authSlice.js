import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    intialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        role: localStorage.getItem("role") || "",
        data: localStorage.getItem("data") || {}
    },
    reducers:{}
})

export const {} = authSlice.actions;
// export default authSlice.reducer;