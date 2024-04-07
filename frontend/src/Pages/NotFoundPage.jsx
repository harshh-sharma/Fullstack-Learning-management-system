import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex justify-center items-center bg-[#191970] text-white h-screen'>
        <div className='flex justify-center items-center flex-col'>
            <h1 className='text-2xl fonb'>Page not found 404</h1>
            <Link to={"/"}><button className='bg-white font-bold text-lg mt-3 rounded-md text-[#191970] px-3 py-1 hover:bg-[#FF6F61] transition-all duration-2s'>Back to Home</button></Link>
        </div>
    </div>
  )
}

export default NotFoundPage