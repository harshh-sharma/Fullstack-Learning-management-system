import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import {useSelector,useDispatch} from "react-redux";

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store?.auth?.data);
    console.log(user);
    const {name,email,avatar,role} = user;
  return (
    <HomeLayouts>
        <div className='bg-[#001F3F] flex justify-center items-center text-white w-full'>
            <div className='bg-[#001F3F] shadow-md shadow-[#FFD700] w-auto h-[300px] flex justify-center items-center flex-col rounded-md p-4'>
                <div className='rounded-full bg-[#FFD700] p-1'>
                    <img src={avatar?.secure_url} alt="" className=' rounded-full w-[150px] h-[150px]'/>
                </div>
                <div className='mt-2'>
                    <h1 className='text-xl font-semibold font-sans text-[#F5F5DC]'>Name : <span className='text-[#FFD700]'>{name}</span></h1>
                    <p className='text-xl font-semibold font-sans text-[#F5F5DC]'>Email : <span className='text-[#FFD700]'>{email}</span></p>
                    <p className='text-xl font-semibold font-sans text-[#F5F5DC]'>Role : <span className='text-[#FFD700]'>{role}</span></p>
                </div>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default UserProfile