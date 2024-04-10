import React from 'react';
import {useLocation,useNavigate} from "react-router-dom";

const Card = ({data}) => {
  const navigate = useNavigate();
  return (
    <div className='w-[300px]  h-[300px] bg-[#FFD700] p-2 rounded-md flex justify-center items-center flex-col shadow-xl'>
    <div className=''>
      <img src={data?.thumbnail?.secure_url} alt="" className='w-fit h-full rounded-md' />
    </div>
    <div>
      <h1 className='text-xl font-bold mt-2'>{data?.title}</h1>
      <button className='bg-[#001F3F] text-center font-semibold text-md rounded-lg px-4 py-2 w-full mt-2 text-[#F5F5DC]' onClick={() => navigate("/course/description",{state:{...data}})}>Detailed Description</button>
    </div>
  </div>
  )
}

export default Card