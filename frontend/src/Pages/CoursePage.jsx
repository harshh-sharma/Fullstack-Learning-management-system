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

            <div className='h-auto w-full flex flex-col justify-center items-center flex-wrap bg-[#191961] md:pl-[20em] pt-[5em]'>
                <h1 className='text-white text-center mb-5 text-2xl font-semibold font-serif'>Explore the courses made by <span className='text-[#FF6F61]'>Industry Experts</span></h1>
                <div className='flex flex-wrap justify-center items-center gap-5'>
                   {courseList && (courseList.map(data => <Card data={data} />))}
                </div>
            </div>
        </HomeLayouts>
    )
}

export default CoursePage