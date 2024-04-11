import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import { useSelector, useDispatch } from "react-redux";
import { BsPersonCircle } from 'react-icons/bs';
import toast from "react-hot-toast";
import { getUserProfile, updateUserProfile } from '../redux/Slices/authSlice';
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userid = useSelector(store => store?.auth?.data?._id);
    console.log(userid);
    const [previewImage, setPreviewImage] = useState("");
    const [editUserData, setEditUserData] = useState({
        avatar: "",
        name: "",
        userId: userid
    });

    const handleUserImage = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        console.log(image);
        setEditUserData({
            ...editUserData,
            avatar: image
        })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        })
    }

    const handleUserData = (e) => {
        const { name, value } = e.target;
        setEditUserData({
            ...editUserData,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await dispatch(updateUserProfile(editUserData.name));
        console.log(response);
        if(response?.payload?.success){
            await dispatch(getUserProfile());
            navigate("/profile");
        }
    }
 
    return (
        <HomeLayouts>
            <div className='flex justify-center items-center w-full bg-[#2a0845]'>
                <div>
                    <form className='flex justify-center items-center flex-col shadow-lg bg-white border-white py-5 px-5 rounded-md w-[400px]'>

                        <label htmlFor="image_uploads">
                            {previewImage ? (<img src={previewImage} className='rounded-full w-32 h-32' />) : <BsPersonCircle className='text-[5em] text-[#2a0845]' />}
                        </label>
                        <input type="file" id="image_uploads" name="image_uploads" accept='.jpg,.jpeg,.png,.svg' className='hidden' onChange={handleUserImage} />

                        <div className='flex flex-col gap-2'>

                            <label htmlFor="name" className='text-[#2a0845] text-lg font-semibold font-serif'>Name</label>
                            <input type="text" name='name' id='name' required placeholder='Enter your name...' className="pr-[9em] pl-2 py-2 rounded-md placeholder:text-[#FFD700] text-[#2a0845] placeholder:font-semibold font-semibold bg-[#2a0845]" onChange={handleUserData} value={editUserData.name} />

                        </div>
                        <button className='w-full px-2 py-1 text-[#2a0845] text-center bg-[#FFD700] text-lg rounded-md mt-4  mx-20 transition-all ease-in-out duration-300 font-bold' onClick={handleSubmit}>Update Profile</button>
                    </form>
                </div>
            </div>
        </HomeLayouts>
    )
}

export default EditProfile;