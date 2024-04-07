import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';

const AboutPage = () => {
    return (
        <HomeLayouts>
            <div className='flex pl-[25%] items-center justify-between bg-[#191970] w-full h-auto'>
                <div className='w-[40%] text-white'>
                    <h1 className='text-3xl font-semibold'>Affordable and quality <span className='text-[#FF6F61] shadow-lg shadow-[#FF6F61] px-1'>Education</span></h1>
                    <p className='mt-5 text-md tracking-wider font-serif text-lg'>Our goal is to provide the affordable and quality  education to the world.We Providing the platform for the aspiring teachers and students to share their skills, crativity and knowledge to each other to empower and contribute in the growth and wellness of mankind</p>
                </div>
                <div className=''>
                    <img src="https://images.pexels.com/photos/3285203/pexels-photo-3285203.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='rounded-md w-2/3 shadow-lg shadow-[#FF6F61]' />
                </div>
            </div>
        </HomeLayouts>
    )
}

export default AboutPage;