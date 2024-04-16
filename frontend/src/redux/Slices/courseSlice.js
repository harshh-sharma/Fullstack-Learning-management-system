import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import assert from "assert";

export const getAllCourses = createAsyncThunk("/courses/",async () => {
  try {
    // console.log("yes");
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

export const createCourse = createAsyncThunk("/courses",async(courseData) => {
  try {
    // console.log();
    const formdata = new FormData();
    formdata.append("title",courseData?.title);
    formdata.append("description",courseData?.description);
    formdata.append("category",courseData?.category);
    formdata.append("createdBy",courseData?.createdBy);
    formdata.append("startingDate",courseData?.startingDate);
    formdata.append("thumbnail",courseData?.thumbnail);
    console.log(formdata);
    const response = axiosInstance.post("/course/",formdata);
    toast.promise(response,{
      loading:"wait,course creation started",
      success:"course successfully created",
      error:"failed to create course"
    })
    return (await response).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data);
  }
})

export const deleteCourseById = createAsyncThunk("/course/delete",async(data) => {
  try {
    const response = axiosInstance.delete(`/course/${data}`);
    toast.promise(response,{
      loading:"wait || delete course is progress",
      success:"course deleted successfully",
      error:"error to delete course"
    })
    return (await response).data;
  } catch (error) {
    toast.error(error?.data?.response?.message)
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