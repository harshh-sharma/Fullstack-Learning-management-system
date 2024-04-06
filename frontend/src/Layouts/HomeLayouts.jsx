import React from 'react'
import { Link } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai";
import {FiMenu} from "react-icons/fi"
import Footer from '../components/Footer';

const HomeLayouts = ({children}) => {

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
        <div className='w-[20%] bg-[#ececec] text-[#191970] font-semibold flex py-20 px-7 text-xl h-[96vh] rounded-r-2xl absolute my-5'>
            <div className='w-full'>
                <ul className='gap-10 text-2xl w-full pt-[2em] h-full '>
                    <li className='mt-8'><Link>Home</Link></li>
                    <li className='mt-8'><Link>About us</Link></li>
                    <li className='mt-8'><Link>All courses</Link></li>
                    <li className='mt-8'><Link>Contact us</Link></li>
                </ul>
            </div>
        </div>
        {children}
        {/* <Footer/> */}
     </div>
    )
}

export default HomeLayouts