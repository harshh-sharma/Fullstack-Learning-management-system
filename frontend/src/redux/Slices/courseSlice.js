import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

export const getCourses = createAsyncThunk("/courses/",async () => {
  try {
     const response = axiosInstance.get("/courses");
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
});

// export const {} = courseSlice.actions;
export default courseSlice.reducer;