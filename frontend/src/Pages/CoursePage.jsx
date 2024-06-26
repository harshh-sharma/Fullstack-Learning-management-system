import React, { useEffect } from 'react';
import HomeLayouts from ".././Layouts/HomeLayouts";
import { useDispatch, useSelector } from "react-redux"
import { getAllCourses } from '../redux/Slices/courseSlice';
import Card from './Card';
import Shimmer from './Shimmer';

const CoursePage = () => {
    const courseList = useSelector(store => store.course.courses);

    const dispatch = useDispatch();

    const loadCourses = async () => {
        await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCourses();
    }, [])
    return (
        <HomeLayouts>

            <div className='h-auto w-full flex flex-col justify-center items-center  bg-[#2a0845]  flex-wrap'>
                <h1 className='text-[#F5F5DC] text-center mb-5 text-2xl font-semibold font-serif'>Explore the courses made by <span className='text-[#FFD700]'>Industry Experts</span></h1>
                <div className='flex flex-wrap justify-center items-center gap-5'>
                   {courseList && (courseList.map(data => <Card key={data?._id} data={data} />))}
                </div>
            </div>
        </HomeLayouts>
    )
}

export default CoursePage