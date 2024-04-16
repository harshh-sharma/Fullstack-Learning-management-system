import React from 'react';
import {useLocation,useNavigate} from "react-router-dom";

const Card = ({data}) => {
  const navigate = useNavigate();
  return (
    <div className='w-[300px]  h-[270px] bg-gray-200 px-2 py-1 rounded-md flex justify-center items-center flex-col shadow-xl'>
    <div className=''>
      <img src={data?.thumbnail?.secure_url} alt="" className='w-fit h-full rounded-md' />
    </div>
    <div>
      <h1 className='text-xl font-bold mt-2'>{data?.title}</h1>
      <button className='bg-[#2a0845] text-center font-semibold text-md rounded-lg px-4 py-2 w-full mt-2 text-[#FFD700] hover:bg-[#ffd700] hover:text-[#2a0845] hover:border-2  transition-all ease-in-out duration-300' onClick={() => navigate("/course/description",{state:{...data}})}>Detailed Description</button>
    </div>
  </div>
  )
}

export default Card