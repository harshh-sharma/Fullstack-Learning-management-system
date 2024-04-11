import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className=' text-[#f5f5f5] w-full min-h-screen'>
            <HomeLayouts>
                <div className='pt-10 text-black flex justify-center items-center gap-10 min-h-screen bg-[#2a0845] w-full'>
                    <div className='w-full px-10 md:px-0 md:w-1/2 space-y-6 text-xl md:text-2xl'>
                        <h1 className='text-white font-semibold text-3xl text-start md:text-start md:text-4xl'>Find out best <span className='text-[#FFD700] rounded-lg  px-2'>Online courses</span></h1>
                        <p className='text-white text-start md:text-start'>We have a large library of courses taught by very highly skilled and qualified faculties at very affordable price</p>
                        <div className='flex gap-3 space-x-2'>
                            <Link to={"/courses"}>
                                <button className='hover:text-white transition-all ease-in-out duration-300 bg-[#FFD700] text-[#2a0845] font-semibold rounded-md px-2 md:px-2 py-1'>Explore Courses</button>
                            </Link>

                            <Link>
                                <button className='hover:text-white transition-all ease-in-out duration-300 border-[#FFD700] border-2 text-[#FFD700] font-semibold rounded-md px-2 md:px-3 py-1'>Contact us</button>
                            </Link>

                        </div>
                    </div>
                </div>
            </HomeLayouts>
        </div>
    )
}

export default HomePage