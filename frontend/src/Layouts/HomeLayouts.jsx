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


    const changeWidth = () => {
        const drawerSide = document.getElementsByClassName("drawer-open");
        const element = document.getElementsByClassName("drawer");
        element[0].style.display = "flex";
    }

    const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer");
        console.log(element[0]);
        element[0].style.display = "none";
    }

    return (
        <div className="min-h-screen flex">
            <div>
                <FiMenu className='bg-transparent absolute left-5 text-white text-3xl m-5 drawer-open flex md:hidden' onClick={changeWidth} />
                <div className={`w-9/12 hidden md:flex md:w-[20%] font-semibold py-20 px-7 text-xl h-[98vh] rounded-r-lg absolute md:my-2 shadow-lg shadow-[#F5FCDC] drawer bg-white`} >

                    <div className=''>
                        <AiFillCloseCircle className='text-4xl w-1/2 text-center flex md:hidden' onClick={hideDrawer} />
                        <ul className='gap-10 text-lg md:text-xl w-1/2 md:w-full pt-[2em] h-full mx-2 ' >
                            <Link to={"/"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] rounded-lg text-center py-2' >Home</li></Link>
                            {isUserLoggedIn && (userRole === '"ADMIN"') && (<li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2'><Link>Admin Dashboard</Link></li>)}
                            <Link to={"/about"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2'>About us</li></Link>
                            <Link><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2'>All courses</li></Link>
                            <Link><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2'>Contact us</li></Link>
                            {isUserLoggedIn && (userRole === '"ADMIN"') && (
                                <Link to={"/course/create"}><li className='mt-2 text-[#FFD700] bg-[#2a0845] px-2 rounded-lg text-center py-2'>Create course</li></Link>
                            )}
                        </ul>
                        {isUserLoggedIn ? (<div className='flex justify-center items-center gap-2'><Link to={"/profile"}><button className='text-[#FFD700] bg-[#2a0845] px-7 rounded-lg text-center py-2'>Profile</button></Link><Link to={"/logout"}><button className='text-[#FFD700] bg-[#2a0845] px-5 rounded-lg text-center py-2' onClick={handleLogout}>Logout</button></Link></div>) : (<div className='flex justify-center items-center gap-2'><Link to={"/login"}><button className='text-[#FFD700] bg-[#2a0845] px-7 rounded-lg text-center py-2'>Login</button></Link><Link to={"/signup"}><button className='text-[#FFD700] bg-[#2a0845] px-5 rounded-lg text-center py-2'>Singnup</button></Link></div>)}
                    </div>
                </div>
            </div>

            {children}
            {/* <Footer/> */}
        </div>
    )
}

export default HomeLayouts