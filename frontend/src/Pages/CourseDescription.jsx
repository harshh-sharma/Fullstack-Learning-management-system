import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import {useLocation,useNavigate} from "react-router-dom";

const CourseDescription = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {thumbnail,description,title,startingDate,createdBy} = state;
  return (
    <HomeLayouts>
        <div className='flex justify-center items-center bg-[#001F3F] min-h-screen w-full px-[10px]'>
            <div className='bg-[#FFD700] flex justify-center items-center flex-col  h-auto px-2 py-2 rounded-md shadow-xl md:w-[330px]'>
                <div className='w-full rounded-lg'>
                    <img src={thumbnail?.secure_url} alt="" className='rounded-md'/>
                </div>
                <div className='text-[#001F3F] w-full'>
                    <h1 className='font-bold text-lg mt-2 mb-1'>{title}</h1>
                    <div className='h-[75px] overflow-hidden flex flex-wrap w-full'>
                    <p className=' tracking-wide text-md'>{description}</p>
                    </div>
                    <p className='font-semibold text-md my-1'>Instructor : <span className='text-red-600 font-semibold'>{createdBy}</span></p>
                    <p className='font-semibold text-md my-1'>Starting Date : <span className='text-red-600 font-semibold'>{startingDate}</span></p>
                    <button className='bg-[#001F3F] text-center text-[#] text-lg rounded-md w-full mt-2 py-1 text-[#F5F5DC]' onClick={() => navigate(-1)}>Back to courses</button>
                </div>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default CourseDescription