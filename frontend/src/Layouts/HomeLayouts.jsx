import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi"
import Footer from '../components/Footer';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/Slices/authSlice';
import { useNavigate } from "react-router-dom";

const HomeLayouts = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking user is logged in or not
    const isUserLoggedIn = useSelector(store => store?.auth?.isLoggedIn);
    // console.log(isUserLoggedIn);

    // for checking the role of the user
    const userRole = useSelector(store => store?.auth?.role);

    const handleLogout = (e) => {
        e.preventDefault();
        const res = dispatch(logout());
        if (res?.payload?.success) {
            navigate("/");
        }
    }

    const openMenu = (e) => {
        e.preventDefault();
        const element = document.getElementsByClassName('open');
        element.style.display = "flex";
    }

    return (
        <div className="min-h-screen flex w-full">
            <div className='w-2/12'>
                
                <div className='h-[90vh] w-full px-5 bg-white transition-all duration-300'>
                    <AiFillCloseCircle className='text-[#2a0845] md:hidden' />
                    <h1 className='font-bold text-2xl mt-[2em] text-center shadow-lg shadow-gray-400 py-1 bg-[#ffe23c] text-[#2a0845]'>LSM System</h1>
                    <ul className='w-full mt-[8em] mb-[9em]' >
                        <Link to={"/"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845] font-semibold' >Home</li></Link>
                        {isUserLoggedIn && (userRole === "ADMIN") && (<Link to={"/admin/dashboard"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845] font-semibold'>Admin Dashboard</li></Link>)}
                        <Link to={"/about"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845] font-semibold'>About us</li></Link>
                        <Link to={"/courses"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845] font-semibold'>All courses</li></Link>
                        <Link><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845] font-semibold'>Contact us</li></Link>
                        {isUserLoggedIn && (userRole === "ADMIN") && (
                            <Link to={"/course/create"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] font-semibold hover:text-[#2a0845]'>Create course</li></Link>
                        )}
                    </ul>
                    {isUserLoggedIn ? (<div className='flex justify-center items-center gap-2'><Link to={"/profile"}><button className='text-[#FFD700] bg-[#2a0845] px-7 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845] font-semibold'>Profile</button></Link><Link to={"/logout"}><button className='text-[#FFD700] bg-[#2a0845] px-5 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 font-semibold hover:border-[#ffd700] hover:text-[#2a0845]' onClick={handleLogout}>Logout</button></Link></div>) : (<div className='flex justify-center items-center gap-2'><Link to={"/login"}><button className='text-[#FFD700] bg-[#2a0845] px-7 rounded-lg text-center font-semibold py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Login</button></Link><Link to={"/signup"}><button className='text-[#FFD700] bg-[#2a0845] px-5 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] font-semibold hover:text-[#2a0845]'>Singnup</button></Link></div>)}
                </div>
            </div>
            {children}
            {/* <Footer/> */}
        </div>
    )
}

export default HomeLayouts


{/* <ul className='gap-10 text-lg md:text-xl w-1/2 md:w-full pt-[2em] h-full mx-2 ' >
                            <Link to={"/"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]' >Home</li></Link>
                            {isUserLoggedIn && (userRole === "ADMIN") && (<Link to={"/admin/dashboard"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Admin Dashboard</li></Link>)}
                            <Link to={"/about"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>About us</li></Link>
                            <Link to={"/courses"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>All courses</li></Link>
                            <Link><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Contact us</li></Link>
                            {isUserLoggedIn && (userRole === "ADMIN") && (
                                <Link to={"/course/create"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Create course</li></Link>
                            )}
                        </ul> */}

                        // {isUserLoggedIn ? (<div className='flex justify-center items-center gap-2'><Link to={"/profile"}><button className='text-[#FFD700] bg-[#2a0845] px-7 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Profile</button></Link><Link to={"/logout"}><button className='text-[#FFD700] bg-[#2a0845] px-5 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]' onClick={handleLogout}>Logout</button></Link></div>) : (<div className='flex justify-center items-center gap-2'><Link to={"/login"}><button className='text-[#FFD700] bg-[#2a0845] px-7 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Login</button></Link><Link to={"/signup"}><button className='text-[#FFD700] bg-[#2a0845] px-5 rounded-lg text-center py-2 transition-all duration-300 ease-in hover:bg-[#ffd700] hover:border-2 hover:border-[#ffd700] hover:text-[#2a0845]'>Singnup</button></Link></div>)}