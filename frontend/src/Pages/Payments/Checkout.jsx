import React, { useEffect } from 'react'
import HomeLayouts from "../../Layouts/HomeLayouts";
import { useDispatch,useSelector } from 'react-redux';
import {getRazorpayId, purchaseCourseBundle } from '../../redux/Slices/razorpaySlice';
import { getSubscription } from '../../redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <HomeLayouts>
        <div className="bg-[#2a0845] w-full h-screen flex justify-center items-center">
            <div className='bg-white w-[300px] h-auto p-2'>
                <h1 className='mt-2 font-semibold text-2xl text-[2a0845] text-center mb-1'>Ready to subscribe</h1>
                <p className='text-md text-gray-500 tracking-wide'>We give <span className='text-[#2a0845] font-semibold'>free access</span> to the course to you there are <span className='text-[#2a0845] font-semibold'>terms and conditons</span> before to you subcribe,Please sure you give 100% when while learning beacuse we put our all to make the best free course</p>
                <p className='text-md text-red-600 font-semibold'>If your agree then only you can access our free course</p>
                <button className='bg-[#2a0845] text-center text-[#] text-lg rounded-md w-full mt-2 py-1 text-[#FFD700] font-semibold' onClick={() => navigate("/success")}>Ready to join</button>
                <button className='bg-[#2a0845] text-center text-[#] text-lg rounded-md w-full mt-2 py-1 text-[#FFD700] font-semibold' onClick={() => navigate(-1)}>No,Back</button>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default Checkout;