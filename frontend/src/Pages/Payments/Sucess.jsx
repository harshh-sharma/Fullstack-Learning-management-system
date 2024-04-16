import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSubscription, getUserProfile } from '../../redux/Slices/authSlice';

const Success = () => {
    const dispatch = useDispatch();
    const load = async () => {
        const res = await dispatch(getSubscription());
        if(res?.payload?.success){
          console.log("getuserprofile");
          await dispatch(getUserProfile());
        }
      }
    
      useEffect(() => {
        load();
      },[]);
  return (
    <HomeLayouts>
        <div className='flex justify-center items-center bg-[#2a0845] w-full h-screen'>
            <div className='w-[300px] h-[300px] bg-white'>
                <div className='w-full bg-green-500  text-2xl text-center font-semibold py-2 text-white'>Success</div>
                <div className='flex justify-center items-center h-[13.5em] flex-col gap-2'>
                    <AiFillCheckCircle className='text-4xl text-green-500'/>
                    <p>Welcome,to the pro bundle</p>
                    <p>Now ,you can enjoy all courses</p>
                </div>
               <div>
               <Link to="/"><button className='bg-green-500 text-center text-[#] text-lg rounded-md w-full mt-2 py-1 mb-1 text-white font-semibold relative bottom-2' >Go to Dashboard</button></Link>
               </div>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default Success