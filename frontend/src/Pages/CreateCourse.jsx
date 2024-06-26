import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createCourse } from '../redux/Slices/courseSlice';
import {useNavigate,Navigate} from "react-router-dom";

const CreateCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [prevImage, setPrevImage] = useState("");
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        startingDate: "",
        thumbnail: ""
    })

    const handleCourseData = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        })
    }

    const handleThumbnail = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        // console.log(image);
        if (image) {
            setCourseData({
                ...courseData,
                thumbnail: image
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.addEventListener("load", function () {
                setPrevImage(this.result)
                console.log(prevImage);
            })
        }

    }

    const courseDataValidation = (title, description, category, thumbnail, createdBy, startingDate) => {
        if (!title || !description || !category || !thumbnail || !createdBy || !startingDate) {
            toast.error("Please,fill all the details");
            return false;
        }
        if (title.length < 8 && title >= 60) {
            toast.error("Title must be 8 character and less then 60 character");
            return false;
        }
        return true
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { title, description, category, thumbnail, createdBy, startingDate } = courseData;
        // console.log(courseData);
        if (courseDataValidation(title,description,category,thumbnail,createdBy,startingDate)) {
            const response = await dispatch(createCourse(courseData));
            console.log("res",response.payload);
            if(response?.payload?.success){
                setCourseData({
                    title:"",
                    description:"",
                    startingDate:"",
                    thumbnail:"",
                    createdBy:"",
                    category:""
                });
                navigate("/courses");
            }
        }

    }

    return (
        <HomeLayouts>
            <div className='flex justify-center items-center bg-[#2a0845] w-full text-white flex-col'>
            <h1 className='text-2xl font-serif font-semibold mb-2 text-[#FFD700]'>Create Course</h1>
                <div className='w-fit py-2 px-2 shadow-lg shadow-[#ffd700]'>
                <div className=' text-white bg-transparent  shadow-xl h-auto w-auto grid grid-cols-2 justify-center px-2 py-2 rounded-md gap-5'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1 mt-2'>
                            <span  className='text-xl font-semibold text-[#FFD700]  font-sans mb-1'>Thumbnail</span>
                            <label htmlFor="image-upload">
                                {prevImage ? (<img src={prevImage} />) : (
                                    <div className='w-[350px] h-[200px] flex justify-center items-center text-[#2a0845] text-lg font-semibold bg-gray-200 cursor-pointer rounded-md'>
                                        <h1>upload course thumbnail</h1>
                                    </div>
                                )}
                            </label>
                            <input type="file"
                                id='image-upload'
                                accept='.jpeg , .png , .jpg , .svg'
                                className='hidden' onChange={handleThumbnail} />
                        </div>
                        <div>

                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="title" className='text-xl font-semibold text-[#FFD700] font-sans mb-1'>Title</label>
                            <input type="text"
                                name='title'
                                id='title'
                                onChange={handleCourseData}
                                value={courseData.title}
                                placeholder='Enter course title...'
                                className='w-full bg-gray-200 placeholder:text-[#2a0845] text-[#2a0845]  px-10 py-1 text-lg font-serif rounded-md'
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="category" className='text-xl font-semibold text-[#FFD700] font-sans mb-1'>Category</label>
                            <input type="text"
                                name='category'
                                id='category'
                                onChange={handleCourseData}
                                value={courseData.category}
                                placeholder='Enter course category...'
                                className='w-full bg-gray-200 placeholder:text-[#2a0845] px-5 py-1  text-lg font-serif rounded-md text-[#2a0845]'
                            />
                        </div>
                    </div>
                    <div className='gap-2 flex flex-col'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="created-by" className='text-xl font-semibold text-[#FFD700] font-sans mt-2 mb-2'>Created by</label>
                            <input type="text"
                                name='createdBy'
                                id='created-by'
                                onChange={handleCourseData}
                                value={courseData.createdBy}
                                placeholder='Enter course category...'
                                className='w-full bg-gray-200 placeholder:text-[#2a0845] px-5 py-1  text-lg font-serif rounded-md text-[#2a0845]'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="starting-date" className='text-xl font-semibold text-[#FFD700] font-sans mt-2 mb-2'>Starting date</label>
                            <input type="text"
                                name='startingDate'
                                id='startin-date'
                                onChange={handleCourseData}
                                value={courseData.startingDate}
                                placeholder='Enter course category...'
                                className='w-full bg-gray-200 placeholder:text-[#2a0845] px-5 py-1 text-lg font-serif rounded-md text-[#2a0845]'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                        <label htmlFor="description" className='text-xl font-semibold text-[#FFD700] font-sans mb-1'>Description</label>
                        <input type="text"
                            name="description"
                            id="description"
                            onChange={handleCourseData}
                            value={courseData.description}
                            placeholder='Enter course description...'
                            className='h-[200px] p-2 w-full bg-gray-200 placeholder:text-[#2a0845]  font-semibold text-lg rounded-md text-[#2a0845]'
                        />
                        </div>
                        
                    </div>
                </div>
                <button className='w-full bg-[#FFD700] text-[#2a0845] font-semibold text-xl border-2 border-[#2a0845] hover:bg-transparent hover:border-2 hover:border-[#ffd700] hover:text-[#ffd700] rounded-lg  transition-all ease-in-out duration-500' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </HomeLayouts>
    )
}

export default CreateCourse