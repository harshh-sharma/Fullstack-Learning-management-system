import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { AiFillDelete } from 'react-icons/ai'
import { deleteCourseById, getAllCourses } from '../../redux/Slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BsCollectionPlay, BsCollectionPlayFill, BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteCourse = async (courseId) => {
        const response = await dispatch(deleteCourseById(courseId));
        if (response?.payload?.success) {
            console.log("yess");
            await dispatch(getAllCourses());
        }
    }

    const coursesData = useSelector(store => store?.course?.courses);
    console.log(coursesData);

    useEffect(() => {
        dispatch(getAllCourses());
    }, []);

    return (
        <HomeLayouts>
            <div className='min-h-screen bg-[#2a0845] w-full'>
                <h1 className='text-[#FFD700] text-center font-semibold mt-20 mb-10 text-4xl '>Admin Dashboard</h1>
                <div className='flex justify-center items-center'>
                    <div className='w-9/12'>
                        <div className='mt-2'>
                           <table className='table overflow-x-scroll gap-10'>
                                <thead className='text-[#FFD700] text-xl'>
                                    <th>S.no</th>
                                    <th>Course title</th>
                                    <th>Course category</th>
                                    <th>Instructor</th>
                                    <th>Total lectures</th>
                                    <th>Action</th>
                                </thead>
                                <tbody className=''>
                                    {coursesData && coursesData.map((course,index) => (
                                        <tr key={course?._id} className='text-white text-lg mt-5'>
                                            <td>{index+1}.</td>
                                            <td>{course?.title}</td>
                                            <td>{course?.createdBy}</td>
                                            <td>{course?.category}</td>
                                            <td>{course?.numberOfLectures}</td>
                                            <td>
                                                <div className='flex gap-2 items-center justify-center'>
                                                    <button className='cursor-pointer hover:text-[#ffd700]' onClick={() => navigate("/course/lecture", {state:{state:course}}) }><BsCollectionPlayFill/></button>
                                                    <button className='cursor-pointer hover:text-[#ffd700]' onClick={() => deleteCourse(course?._id)}><AiFillDelete/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                           </table>
                        </div>
                    </div>
                </div>
            </div>

        </HomeLayouts>
    )
}

export default AdminDashboard


// {coursesData && coursesData.map((course,index) => (
//     <div className='flex text-white text-2xl px-5 py-2 shadow-md shadow-[#FFD700] w-full justify-between my-5'>
//         <div className='flex gap-5 font-semibold'>
//             <span>{index+1}. </span>
//             <h2>{course.title}</h2>
//         </div>
//         <AiFillDelete className='text-[#FFf] cursor-pointer' onClick={() => deleteCourse(course?._id)} />
//     </div>