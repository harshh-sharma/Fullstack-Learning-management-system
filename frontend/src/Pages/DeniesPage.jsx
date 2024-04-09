import React from 'react';
import {useNavigate} from "react-router-dom";

const DeniesPage = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen bg-[#191970] flex justify-center items-center'>
        <div className='relative'>
            <p className='text-[10em] font-semibold text-white'>403</p>
            <p className='absolute top-20 left-20  rotate-12 bg-black text-white'>Request Denied</p>
            <button className='text-white w-full bg-[#FF6F61] rounded-md font-bold py-1' onClick={() => navigate(-1)}>Go back</button>
        </div>
    </div>
  )
}

export default DeniesPage