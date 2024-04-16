import React, { useEffect } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import {useLocation,useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { AiOutlineArrowLeft } from 'react-icons/ai';

const CourseDescription = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(store => store?.auth?.data);
    // console.log(rolee);
    console.log(userData?.role=='ADMIN');

    const {state} = useLocation();
    console.log(state);
    const {thumbnail,description,title,startingDate,createdBy} = state;
    const loaded = () => {
        console.log("loaded");
    }
    useEffect(() => {
        loaded();
    },[]);
  return (
    <HomeLayouts>
        <div className='flex justify-center items-center bg-[#2a0845] min-h-screen w-full px-[10px]'>
            <div className='bg-gray-200 flex justify-center items-center flex-col  h-auto px-2 py-2 rounded-md md:w-[330px] shadow-md shadow-[#FFD700]'>
                <div className='w-full rounded-lg'>
                    <img src={thumbnail?.secure_url} alt="" className='rounded-md'/>
                </div>
                <div className='text-[#2a0845] w-full'>
                    <h1 className='font-bold text-lg mt-2 mb-1'>{title}</h1>
                    <div className='h-[75px] overflow-hidden flex flex-wrap w-full'>
                    <p className=' tracking-wide text-md'>{description}</p>
                    </div>
                    <p className='font-semibold text-md my-1'>Instructor : <span className='text-black font-semibold'>{createdBy}</span></p>
                    <p className='font-semibold text-md my-1'>Starting Date : <span className='text-black font-semibold'>{startingDate}</span></p>
                    {userData?.role == "ADMIN" || userData?.subscription?.status === "active"  ? ( <button className='bg-[#2a0845] text-center text-[#] text-lg rounded-md w-full mt-2 py-1 text-[#FFD700] font-semibold hover:bg-[#FFD700] hover:text-[#2a0845] transition-all ease-in duration-500' onClick={() => navigate("/course/lecture",{state:{state}})}>Watch Lectures</button>) : ( <button className='bg-[#2a0845] text-center text-[#] text-lg rounded-md w-full mt-2 py-1 text-[#FFD700] font-semibold' onClick={() => navigate("/checkout")}>Subscribe</button>) }
                    <button className='bg-trasnparent border-2 border-[#2a0845] flex justify-center items-center gap-1 text-[#2a0845] text-lg rounded-md w-full mt-2 py-1 font-semibold text-center transition-all duration-300 ease-in hover:bg-[#ffd700]' onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default CourseDescription