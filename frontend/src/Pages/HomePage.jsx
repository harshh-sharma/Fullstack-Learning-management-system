import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className=' text-[#f5f5f5] w-full min-h-screen'>
            <HomeLayouts>
                <div className='pt-10 text-black flex justify-center items-center gap-10 min-h-screen bg-[#191970] w-full'>
                    <div className='w-1/2 space-y-6 text-2xl'>
                        <h1 className='text-white font-semibold text-4xl'>Find out best <span className='text-[#FF6F61] shadow-lg shadow-[#FF6F61] rounded-lg  px-2'>Online courses</span></h1>
                        <p className='text-white'>We have a large library of courses taught by very highly skilled and qualified faculties at very affordable price</p>
                        <div className='flex gap-3 space-x-2'>
                            <Link to={"/courses"}>
                                <button className='bg-white text-[#191970] font-semibold rounded-md px-2 py-1'>Explore Courses</button>
                            </Link>

                            <Link>
                                <button className='bg-white text-[#191970] font-semibold rounded-md px-2 py-1'>Contact us</button>
                            </Link>

                        </div>
                    </div>
                </div>
            </HomeLayouts>
        </div>
    )
}

export default HomePage