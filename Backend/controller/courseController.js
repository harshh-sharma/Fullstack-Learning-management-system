import { Course } from "../models/courseModel.js"

const getAllCourses = async (req,res) => {
   try {
     const courses = await Course.find({}).select("-lectures");
     res.status(200).json({
         success:true,
         data:courses
     })
   } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
   }
}

const getCourseById = async(req,res) => {
    const {courseId} = req.params;
    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"Course Id is required"
        })
    }
    try {
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(401).json({
                success:false,
                message:"There is no course realted to this Id"
            })
        }
        
        res.status(200).json({
            success:false,
            message:"course sucessfully fetched",
            data:course.lectures
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const createCourse = async (req,res) => {

}

const updateCourse = async (req,res) => {
    
}

const deleteCourse = async (req,res) => {
    
}

export {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}