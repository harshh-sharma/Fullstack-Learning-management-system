import React, { useEffect } from 'react';
import HomeLayouts from ".././Layouts/HomeLayouts";
import {useDispatch,useSelector} from "react-redux"
import { getAllCourses } from '../redux/Slices/courseSlice';
import Card from './Card';

const CoursePage = () => {
    const courseList = useSelector(store => store.course.courses);
    console.log(courseList);

    const dispatch = useDispatch();

    const loadCourses = async () => {
        await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCourses();
    },[])
    return (
        <HomeLayouts>
            <div className='h-auto w-full flex justify-center items-center flex-wrap bg-[#191970] gap-5 pt-20 pl-[20em]'>
                {courseList && (courseList.map(data => <Card data={data} />))}
            </div>
        </HomeLayouts>
    )
}

export default CoursePage