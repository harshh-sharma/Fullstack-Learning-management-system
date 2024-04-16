import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

export const getLectureByCourseID = createAsyncThunk("/course/lecture",async(courseId) => {
    try {
        console.log(courseId);
        const response = axiosInstance.post(`/course/${courseId}/1`);
        toast.promise(response,{
            loading:"wait || lectures loaded",
            success:"lectures successfully loaded",
            error:"failed to load lectures"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const deleteLectureByCourseId = createAsyncThunk("/course/lecture/delete",async(data) => {
    try {
        console.log(data.courseId,data.lectureId);
        const response = axiosInstance.delete(`/course/${data.courseId}/${data.lectureId}`);
        toast.promise(response,{
            loading:"wait || lectures deleting",
            success:"lecture successfully deleted",
            error:"failed to delete lecture"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const addLetureByCourseId = createAsyncThunk("/course/addLecture",async(data) => {
    try {
        // console.log(data);
        const formData = new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("lecture",data.lecture);
        console.log(formData);
        const response = axiosInstance.post(`/course/${data?.courseId}`,formData);
        toast.promise(response,{
            loading:"wait !! added lecture in progress",
            success:"lecture successfully data",
            error:"error to failed upload lecture"
        });
        return (await response).data;
    } catch (error) {
        error?.response?.data?.message
    }
})

const lectureSlice = createSlice({
    name:"lecture",
    initialState:{
        lectures:[],
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
                .addCase(getLectureByCourseID.fulfilled,(state,action) => {
                    console.log("reD",action?.payload);
                    state.lectures = [...action?.payload?.data?.lectures];
                })
                .addCase(deleteLectureByCourseId.fulfilled,(state) => {
                    state.lectures = [];
                })
    }
})

// export const {} = lectureSlice.actions;
export default lectureSlice.reducer;