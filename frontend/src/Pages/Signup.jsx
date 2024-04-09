import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { BsPersonCircle } from 'react-icons/bs';
import { Link,useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { createAccount } from '../redux/Slices/authSlice';
import {useDispatch} from "react-redux";

const Signup = () => {
    const [previewImage,setPreviewImage] = useState("");
    const [signupData,setSignupData] = useState({
        name:"",
        email:"",
        password:"",
        avatar:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formValidation = (name,email,password,avatar) => {
        if(!name || !email || !password || !avatar){
            toast.error("Please,fill all the details");
            return false;
        }
        if(name.length < 5){
            toast.error("Name contains atleast 5 letter");
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
        const {name,email,password,avatar} = signupData;
        if(formValidation(name,email,password,avatar)){
            const formData = new FormData();
            formData.append("name",name);
            formData.append("email",email);
            formData.append("password",password);
            formData.append("avatar",avatar);
            const response = await dispatch(createAccount(formData));
            console.log("res",response);
            if(response?.payload?.success){
                navigate("/");
            }
        }
    }


    const handleUserData = (e) => {
        const {name,value} = e.target;
        // console.log(name,value);
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    const getUserImage = function(e){
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if(uploadImage){
            setSignupData({
                ...signupData,
                avatar:uploadImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            console.log(fileReader);
            fileReader.addEventListener("load",function(){
                // console.log(this.result);
                setPreviewImage(this.result)
            })
        }
    }

    return (
        <HomeLayouts>
            <div className='flex justify-center items-center h-screen w-full bg-[#191970]'>
                <div className='flex items-center justify-center w-full'>
                    <form className='flex justify-center items-center flex-col shadow-lg shadow-[#FF6F61] border-white py-5 px-5 rounded-md w-[400px]'>

                        <label htmlFor="image_uploads">
                            {previewImage ? (<img src={previewImage} className='rounded-full w-32 h-32'/>):<BsPersonCircle className='text-[5em] text-white'/>}
                        </label>
                        <input type="file" id="image_uploads" name="image_uploads" accept='.jpg,.jpeg,.png,.svg' className='hidden' onChange={getUserImage} />

                        <div className='flex flex-col gap-2'>

                            <label htmlFor="name" className='text-white text-lg font-semibold font-serif'>Name</label>
                            <input type="text" name='name' id='name' required placeholder='Enter your name...' className="pr-[9em] pl-2 py-2 rounded-md placeholder:text-[#FF6F61] text-[#FF6F61] placeholder:font-semibold font-semibold"  onChange={handleUserData} value={signupData.name} />

                            <label htmlFor="email" className='text-white text-lg font-semibold font-serif'>Email</label>
                            <input type="email" id='email' name='email' required placeholder='Enter your email...' className="pr-[9em] pl-2 py-2 rounded-md placeholder:text-[#FF6F61] text-[#FF6F61] placeholder:font-semibold font-semibold" value={signupData.email} onChange={handleUserData} />

                            <label htmlFor="password"  className='text-white text-lg font-semibold font-serif'>Password</label>
                            <input type="password" id='password' name='password' required placeholder='Enter your password...' className="pr-[9em] pl-2  py-2 rounded-md placeholder:text-[#FF6F61] text-[#FF6F61] placeholder:font-semibold font-semibold" value={signupData.password} onChange={handleUserData} />
                        </div>
                        <button className='w-full px-2 py-1 text-white text-center bg-[#FF6F61] text-lg font-semibold rounded-md mt-4 hover:bg-[#ca4236] mx-20 transition-all ease-in-out duration-300' onClick={handleSubmit}   >Create account</button>
                        <p className='text-lg text-white mt-2 font-serif'>Already have an account ? <Link to={"/login"} ><span className='text-[#FF6F61] link cursor-pointer font-semibold'>Login</span></Link></p>
                    </form>
                </div>
            </div>
        </HomeLayouts>
    )
}

export default Signup