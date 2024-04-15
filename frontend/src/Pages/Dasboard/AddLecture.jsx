import React, { useEffect, useState } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLetureByCourseId } from '../../redux/Slices/lectureSlice'
import toast from 'react-hot-toast'
import { AiFillBackward, AiOutlineArrowLeft } from 'react-icons/ai'

const AddLecture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();
  const courseId = state?.state?.state?._id;
  console.log(state?.state?.state?._id);
  const [videoPreview, setVideoPreview] = useState("");
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    lecture: "",
    vedioSrc: "",
    courseId
  });

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    })

  }

  const handleLectureVedio = (e) => {
    e.preventDefault();
    const vedio = e.target.files[0];
    const source = window.URL.createObjectURL(vedio);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: vedio,
      vedioSrc: source
    })
  }

  console.log(userInput.vedioSrc);

  const fromValidations = (lecture, title, description) => {
    if (!lecture || !title || !description) {
      toast.error("Please,fill all the details")
      return false
    }
    if (title.length < 8) {
      toast.error("Title contains atleast 8 character");
      return false
    }
    return true
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (fromValidations(userInput.lecture, userInput.title, userInput.description)) {
      const response = await dispatch(addLetureByCourseId(userInput));
      console.log(response);
      if (response?.payload?.success) {
        navigate(-1);
        
      }
    }
  }

  useEffect(() => {
    if (!courseId) navigate("/courses");
  }, []);

  return (
    <HomeLayouts>
      <div className='bg-[#2a0845] flex justify-center items-center w-full h-screen'>
        <div className='w-auto h-auto flex flex-col shadow-md shadow-[#ffd700] p-4'>
          <header className='text-[#ffd700] text-2xl font-semibold text-center'>
            <AiOutlineArrowLeft className='relative top-8 ' />
            <h1 className='mb-5'>Upload Lectue</h1>
            <form onSubmit={onFormSubmit} className='flex flex-col gap-1'>
              <div className='w-fit'>
                {/* <label htmlFor="title" className='text-xl text-white font-semibold flex flex-start my-2 px-3'>Title</label> */}
                <input type="text" name="title" id="title" placeholder='Enter lecture title' onChange={handleInput} value={userInput.title} className='pl-2 pr-1 rounded-md bg-white placeholder:text-[#2a0845] placeholder:text-[20px] items-center flex pb-1 text-[#2a0845]' />
              </div>

              <div className='w-fit'>
                {/* <label htmlFor="title" className='text-xl text-white font-semibold flex flex-start my-2 px-3'>Description</label> */}
                <textarea type="text" name="description" id="description" placeholder='Enter lecture description' onChange={handleInput} value={userInput.description} className='pl-2 rounded-md bg-white placeholder:text-[#2a0845] placeholder:text-[20px] overflow-hidden overflow-y-scroll resize-none px-2 pr-12 py-2 h-[5em] mt-1 text-[#2a0845] w-full' />
              </div>

              {userInput.vedioSrc ? (
                <video src={userInput.vedioSrc}
                controls
                muted
                disablePictureInPicture
                controlsList='nodownload'
                className='h-[8em]'
              ></video>) : (<div className='h-[8em] bg-white flex items-center justify-center cursor-pointer'>
                  <label htmlFor="lecture" className='text-[#2a0845] text-xl'>Upload lecture</label>
                  <input type="file" name='lecture' id='lecture' className='hidden' onChange={handleLectureVedio} />
                </div>)}
              <button type='submit' className='text-[#2a0845] bg-[#FFD700] w-full rounded-md py-1'>Submit</button>
            </form>
          </header>
          <div>

          </div>
        </div>
      </div>
    </HomeLayouts>
  )
}

export default AddLecture