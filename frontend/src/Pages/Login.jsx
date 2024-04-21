import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/Slices/authSlice';
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    });

    const handleUserData = (e) => {
        const {name,value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }

    const formValidation = (email,password) => {
        if(!email || !password ){
            toast.error("Please,fill all the details");
            return false;
        }

        if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        toast.error("Invalid email");
        return false;
    }
    if(password.length < 8){
        toast.error("Password must be contain 8 character");
        return false;
    }
    return true;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {email,password} = loginData;
        if(formValidation(email,password)){
            const response = await dispatch(login(loginData));
            if(response?.payload?.success){
                navigate("/");
                setLoginData({
                    email:"",
                    password:""
                })
            }
        }
    }

  return (
    <HomeLayouts>
        <div className='flex justify-center items-center h-screen w-full bg-[#2a0845]'>
                <div className='flex items-center justify-center w-full'>
                    <form className='flex justify-center items-center flex-col py-5 px-5 rounded-md w-[400px] h-[350px] shadow-lg shadow-[#FFD700]' noValidate>
                        <div className='flex flex-col gap-2'>

                            <label htmlFor="email" className='text-white text-lg font-semibold font-serif'>Email</label>
                            <input type="email" id='email' name='email' required placeholder='Enter your email...' className="pr-[9em] pl-2 py-2 rounded-md placeholder:text-[#2a0845] text-[#2a0845] placeholder:font-semibold font-semibold" value={loginData.email} onChange={handleUserData} />

                            <label htmlFor="password"  className='text-white text-lg font-semibold font-serif'>Password</label>
                            <input type="password" id='password' name='password' required placeholder='Enter your password...' className="pr-[9em] pl-2  py-2 rounded-md placeholder:text-[#2a0845] text-[#2a0845] placeholder:font-semibold font-semibold" value={loginData.password} onChange={handleUserData} />
                        </div>
                        <button className='w-full px-2 py-1 text-[#2a0845] text-center bg-[#FFd700]  text-lg font-bold rounded-md mt-4 hover:bg-[#2a0845] hover:text-[#ffd700] hover:border-2 hover:border-[#ffd700] mx-20 transition-all ease-in duration-500' onClick={handleSubmit}>Login</button>
                        <p className='text-lg text-white mt-2'>Already have an account ? <Link to={"/signup"} ><span className='text-[#FFd700] link cursor-pointer font-semibold transition-all ease-in duration-500 hover:text-white'>Signup</span></Link></p>
                    </form>
                </div>
            </div>
    </HomeLayouts>
  )
}

export default Login