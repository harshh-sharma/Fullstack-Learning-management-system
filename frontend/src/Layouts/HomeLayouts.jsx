import React from 'react'
import { Link } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai";
import {FiMenu} from "react-icons/fi"
import Footer from '../components/Footer';
import {useDispatch,useSelector} from "react-redux";

const HomeLayouts = ({children}) => {
    const dispatch = useDispatch();

    // for checking user is logged in or not
    const isUserLoggedIn = useSelector(store => store?.auth?.isLoggedIn);
    console.log(isUserLoggedIn);

    // for checking the role of the user
    const userRole = useSelector(store => store?.auth?.role);
    console.log(userRole);

    const changeWidth = () => {
        const drawerSide = document.getElementsByClassName("drawer-side");
        console.log(drawerSide[0]);
        drawerSide[0].style.width = "auto"; 
    }

    const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "0" ;
    }

    return (
     <div className="h-[100vh] flex">
        <div className='w-[20%] bg-[#ececec] text-[#191970] font-semibold flex py-20 px-7 text-xl h-[96vh] rounded-r-2xl absolute my-5 shadow-lg shadow-white'>
            <div className='w-full'>
                <ul className='gap-10 text-2xl w-full pt-[2em] h-full '>
                    <li className='mt-2 bg-[#191970] text-white px-2 rounded-full text-center py-2'><Link to={"/"}>Home</Link></li>
                    {isUserLoggedIn && userRole == "ADMIN" && (<li className='mt-2 bg-[#191970] text-white px-2 rounded-full text-center py-2'><Link>Admin Dashboard</Link></li>)}
                    <li className='mt-2 bg-[#191970] text-white px-2 rounded-full text-center py-2'><Link to={"/about"}>About us</Link></li>
                    <li className='mt-2 bg-[#191970] text-white px-2 rounded-full text-center py-2'><Link>All courses</Link></li>
                    <li className='mt-2 bg-[#191970] text-white px-2 rounded-full text-center py-2'><Link>Contact us</Link></li>
                </ul>
                {isUserLoggedIn ?  (<div className='flex justify-center items-center gap-2'><Link to={"/logout"}><button className='bg-[#191970] text-white px-7 rounded-md text-center py-2'>Profile</button></Link><Link to={"/signup"}><button className='bg-[#191970] text-white px-5 rounded-md text-center py-2'>Logout</button></Link></div>) : (<div className='flex justify-center items-center gap-2'><Link to={"/login"}><button className='bg-[#191970] text-white px-7 rounded-md text-center py-2'>Login</button></Link><Link to={"/signup"}><button className='bg-[#191970] text-white px-5 rounded-md text-center py-2'>Singnup</button></Link></div>)}
            </div>
        </div>
        {children}
        {/* <Footer/> */}
     </div>
    )
}

export default HomeLayouts