import React, { useEffect, useState } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLectureByCourseId, getLectureByCourseID } from '../../redux/Slices/lectureSlice'

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("s",state);
  const lectureData = useSelector(store => store?.lecture?.lectures);
  const role = useSelector(store => store?.auth?.data?.role);
  const [currentVideo, setCurrentVedio] = useState(lectureData[0]?.lecture?.
    secure_url
  );
  const [currentTitle, setCurrentTitle] = useState(lectureData[0]?.title);
  const [currentPara, setCurrentPara] = useState(lectureData[0]?.description);
  console.log(currentTitle);

  const loadData = async () => {
    const res = await dispatch(getLectureByCourseID(state.state._id));
    setCurrentVedio(res?.payload?.data?.lectures[0].lecture?.secure_url)
    setCurrentTitle(res?.payload?.data?.lectures[0]?.title);
    setCurrentPara(res?.payload?.data?.lectures[0]?.description);
  }

  if (lectureData === null) return <h1>No lectures to view</h1>

  useEffect(() => {
    if (!state) navigate("/courses");
    loadData();
  }, []);

  const deleteLecture = async (data, index) => {
    const response = await dispatch(deleteLectureByCourseId({ courseId: state?.state?._id, lectureId: data }));
    if(response?.payload?.success){
      const courseId = state?.state?._id;
      await dispatch(getLectureByCourseID(courseId))
    }

    if (index !== 0) {
      setCurrentVedio(res?.payload?.data?.lectures[index-1].lecture?.secure_url)
      setCurrentTitle(res?.payload?.data?.lectures[index-1]?.title);
      setCurrentPara(res?.payload?.data?.lectures[index-1]?.description);
    } else {
      setCurrentVedio("")
      setCurrentTitle("");
      setCurrentPara("");
    }

  }

  return (
    <HomeLayouts>
      <div className='w-full h-auto flex justify-center items-center bg-[#2a0845]'>
        <div className='flex justify-center items-center flex-col h-auto shadow-md rounded-lg p-4 shadow-[#FFD700]'>
          <div className='mt-[5em] md:mt-[0em]'>
            <h2 className='text-white font-semibold text-xl pb-[2em] md:pb-[0em]  md:text-2xl'>Course Name : <span className='text-[#FFD700]'>{state.state?.title}</span></h2>
          </div>
          {lectureData.length > 0 ? (<div className='flex justify-center items-center  gap-2 md:gap-3 flex-col md:flex-row '>
            <div className='w-[20em] md:w-[25em] gap-1'>
              <video src={currentVideo && currentVideo}
                controls
                muted
                disablePictureInPicture
                controlsList='nodownload'
                className='w-full h-full'
              ></video>
              <h1 className='text-[#FFD700] text-xl font-semibold mt-2 mb-1'>{currentTitle}</h1>
              <p className='text-[#FFf] text-lg'>{currentPara}</p>
            </div>
            <div className=' my-7 w-auto'>
              {role === "ADMIN" && <button onClick={() => navigate("/course/addlecture", { state: {state}})} className='bg-[#fff] text-[#2a0845] px-2 y-2 text-lg font-semibold rounded-md shadow-md relative ml-[10em] hover:bg-[#ffd700] transition-all duration-300 ease-in-out hover:text-white'>Add Lecture</button>}
              <div className='flex flex-col px-2 items-center overflow-y-auto overflow-hidden h-[400px] mt-4 py-2'>
                <li>
                  {lectureData && lectureData.map((lecture, index) => <div onClick={() => {
                    setCurrentVedio(lectureData[index]?.lecture?.
                      secure_url);
                    setCurrentTitle(lectureData[index]?.title);
                    setCurrentPara(lectureData[index]?.description);
                  }} key={lecture?.lecture?.public_id} className='flex flex-col  gap-0 rounded-md shadow-lg bg-white text-[#2a0845] my-2 px-2 font-serif cursor-pointer'>
                    <h2 className='text-lg font-semibold'>{lecture?.title}</h2>
                    <p className=''><span>{`Leture: ${""}${index + 1} ${"  "}`}</span>{lecture?.description}</p>
                    {role === "ADMIN" && <button className='bg-[#2a0845] text-white px-2 y-2 w-fit text-md rounded-md shadow-md my-1 transition-all ease-in-out duration-300 hover:bg-[#ffd700] hover:to-white ' onClick={() => deleteLecture(lecture?._id, index)}>Delete Lecture</button>}
                  </div>)}
                </li>
              </div>
            </div>
          </div>) : (<div className='flex justify-center items-center flex-col'>
            <h1 className='text-white font-semibold font-serif'>There is no lectures to view</h1>
            {role == "ADMIN" && (<button onClick={() => navigate("/course/addlecture",{state:{state}})} className='bg-[#fff] text-[#2a0845] px-2 y-2 text-lg font-semibold rounded-md shadow-md transition-all ease-in-out duration-300 hover:bg-[#ffd700] hover:to-white'>Add Lecture</button>)}
          </div>)}
        </div>
      </div>
    </HomeLayouts>
  )
}

export default DisplayLectures