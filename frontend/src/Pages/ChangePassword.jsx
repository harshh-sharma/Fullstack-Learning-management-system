import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../redux/Slices/authSlice'

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userNewPassword,setUserNewPassword] = useState({
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })

  const handleUserInput = (e) => {
    e.preventDefault();
    const {name,value} = e.target;
    setUserNewPassword({
      ...userNewPassword,
      [name]:value
    })
  }

  const userValidation = (oldPassword,newPassword,confirmPassword) => {
    console.log(oldPassword,newPassword,confirmPassword);
      if(!oldPassword ||  !newPassword || !confirmPassword){
        toast.error("Please,fill all the details")
        return false;
      }
      if(newPassword.length < 8 || newPassword > 16){
        toast.error("Password contains atleast 8 or less then 16");
        return false;
      }
      if(newPassword == oldPassword){
        toast.error("new password is not same with old password");
        return false;
      }
      if(newPassword !== confirmPassword){
        toast.error("newPassword and confirmPassword is not same");
        return false;
      }
      return true;
  }

  const updatePassword = async(e) => {
      e.preventDefault();
      console.log(userNewPassword);
      const {oldPassword,newPassword,confirmPassword} = userNewPassword;
      console.log(oldPassword,newPassword,confirmPassword);
      if(userValidation(oldPassword,newPassword,confirmPassword)){
          const response = await dispatch(changePassword(userNewPassword));
          console.log(response);
          if(response?.payload?.success){
            navigate("/profile")
          }
      }
      
  }
  return (
    <HomeLayouts>
        <div className='flex justify-center items-center bg-[#2a0845] w-full'>
            <div className='flex w-[300px] shadow-lg shadow-[#ffd700] h-auto flex-col gap-2 bg-[#fff] p-4'>
              <label htmlFor="oldPassword" className='flex flex-start font-bold text-[#2a0845] md:text-lg'>Old Password</label>
                <input type="text" placeholder='Enter old password' name='oldPassword' className='w-full px-10 py-1 placeholder:text-[#2a0845] border-2 border-[#2a0845] font-bold rounded-md' onChange={handleUserInput} value={userNewPassword.oldPassword} />

                <label htmlFor="newPassword" className='flex flex-start font-bold text-[#2a0845] md:text-lg'>New Password</label>
                <input type="text" placeholder='Enter new password' name='newPassword' className='w-full px-10 py-1 placeholder:text-[#2a0845] border-2 border-[#2a0845] font-bold rounded-md'  onChange={handleUserInput} value={userNewPassword.newPassword} />

                <label htmlFor="oldPassword" className='flex flex-start font-bold text-[#2a0845] md:text-lg'>Confirm Password</label>
                <input type="text" placeholder='Re-enter new password  ' name='confirmPassword' className='w-full px-10 py-1 placeholder:text-[#2a0845] border-2 border-[#2a0845] font-bold rounded-md' onChange={handleUserInput} value={userNewPassword.confirmPassword}   />
                
                <button className='bg-[#2a0845] font-semibold text-lg py-1 text-[#FFD700]  border-2 border-[#2a0845] w-full rounded-md shadow-lg shadow-gray-400 hover:bg-transparent hover:text-[#2a0845] hover:border-2 hover:border-[#2a0845] transition-all duration-500 ease-in' onClick={updatePassword}>Update Password</button>
            </div>
        </div>
    </HomeLayouts>
  )
}

export default ChangePassword