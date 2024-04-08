import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

export const getAllCourses = createAsyncThunk("/courses/",async () => {
  try {
    console.log("yes");
     const response = axiosInstance.get("/course");
     toast.promise(response,{
      loading:"loading courses",
      success:"courses loaded successfully",
      error:"failed to get the courses"
     })
     return (await response).data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const courseSlice = createSlice({
    name:"course",
    initialState:{
        courses:[]
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled ,(state,action) => {
                if(action.payload){
                    state.courses = [...action.payload];
                }
            })
    }
});

// export const {} = courseSlice.actions;
export default courseSlice.reducer;