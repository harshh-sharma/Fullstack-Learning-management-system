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
    } catch (error) {
        toast.error(error?.response?.data?.message)
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