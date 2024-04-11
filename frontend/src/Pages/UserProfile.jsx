import React, { useEffect } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import {useSelector,useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { getUserProfile } from '../redux/Slices/authSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store?.auth?.data);
    const {name,email,avatar,role} = user;
    
  return (
    <HomeLayouts>
        <div className='bg-[#2a0845] flex justify-center items-center text-white w-full'>
            <div className='bg-white shadow-md shadow-[#FFD700] w-auto h-auto flex justify-center items-center flex-col rounded-md p-4'>
                <div className='rounded-full bg-[#2a0845] p-1'>
                    <img src={avatar?.secure_url} alt="" className=' rounded-full w-[150px] h-[150px]'/>
                </div>
                <div className='mt-2'>
                    <h1 className='text-xl font-semibold font-sans text-[#2a0845]'>Name : <span className='text-[#2a0845]'>{name}</span></h1>
                    <p className='text-xl font-semibold font-sans text-[#2a0845]'>Email : <span className='text-[#2a0845]'>{email}</span></p>
                    <p className='text-xl font-semibold font-sans text-[#2a0845]'>Role : <span className='text-[#2a0845]'>{role}</span></p>
                </div>
                <div className='mt-2 w-full'>
                    <Link to={"/profile/edit"}><button className='bg-[#2a0845] font-semibold text-lg py-1 text-[#FFD700]  border-2 border-[#2a0845] w-full rounded-md'>Edit Profile</button></Link>
                </div>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default UserProfile