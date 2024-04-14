import { Course } from "../models/courseModel.js";
import cloudinary from "cloudinary";
import { log } from "console";
import fs from "fs"

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
    try {
        const {title,description,category,createdBy,startingDate} = req.body;
        // console.log(req.body);
        if(!title || !description ||!category || !createdBy || !startingDate){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const course = await Course.create({title,description,category,startingDate,createdBy,thumbnail:{
            public_id:"dummy",
            secure_url:"dummy"
        }});
        if(!course){
            return res.status(500).json({
                success:false,
                message:"something went wrong,Please try again"
            })
        }

        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
               
            })
            console.log(result);
            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
            fs.unlinkSync(`uploads/${req.file.filename}`);
        }
        await course.save();

        res.status(200).json({
            success:true,
            message:"course created successfully",
            data:course
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const updateCourse = async (req,res) => {
    try {
       const {id} = req.params;
       console.log(id);

       if(!id){
        return res.status(400).json({
            success:false,
            message:"Id is required to update the course"
        })
       } 

       const course = await Course.findByIdAndUpdate(
        id,
        {
            $set:req.body
        },
        {
            runValidators:true
        }
       );
       if(!course){
        return res.status(400).json({
            success:false,
            message:"there is no course related to this id"
        })
       }

       return res.status(200).json({
        success:true,
        message:"course updated successfully",
        data:course
       })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })   
    }
}

const deleteCourse = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id is required to delete course"
            })
        }

        const course = await Course.findByIdAndDelete(id);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Id is required to delete course"
            })
        }

        res.status(200).json({
            success:true,
            message:"course successfully deleted",
        })
    } catch (error) {
        
    }
}

const isAuthorized = (...roles) => async (req,res,next) => {
    try {
        const {role} = req.user;
        if(!roles.includes(role)){
            return res.status(400).json({
                success:false,
                message:"You are not authorized to access this route"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const addLecturesByCourseId = async (req,res) => {
    try {
        const {title,description} = req.body;
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id is required to add lectures"
            })
        }
        if(!title || !description){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const course = await Course.findById(id);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"There is no course related to this Id"
            })
        }

        const lectureData = {
            title,
            description,
            lecture:{}
        }

        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        if (req.file) {
            console.log("yess");
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
               
            })
            console.log(result);
            if (result) {
                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;
            }
            fs.unlinkSync(`uploads/${req.file.filename}`);
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;
        await course.save();

        res.status(200).json({
            success:true,
            message:"Course lectures add successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteLectureByCourseId = async (req,res) => {
    try {
        console.log(req.params);
        const {courseId,lectureId} = req.params;
        if(!courseId ||!lectureId){
            return res.status(400).json({
                success:false,
                message:"course Id and lecture id is required"
            })
        }

        const course = await Course.findById(courseId);
        // console.log("old",course.lectures);
        const lectures = course.lectures.filter(lecture => !(lecture.id == lectureId));
        // console.log("new",lectures);
        // console.log(course.lectures);
        course.lectures.length = 0 ;
        course.lectures = lectures;
        course.numberOfLectures = course.lectures.length;
        await course.save();
        console.log(course);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"There is no course exists related to this Id"
            })
        }

        // const lecture = await course.lectures.findById(lectureId);
        // if(!lecture){
        //     return res.status(400).json({
        //         success:false,
        //         message:"There is no lecture related to this Id"
        //     })
        // }

        // const deletedLecture = await course.lecture.findByIdAndDelete(lectureId);
      
        res.status(200).json({
            success:true,
            message:"Lecture successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getLectureByCourseId = async(req,res) => {
    const {courseId} = req.params;
    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"courseId is required"
        });
    }
    
    const course = await Course.findById(courseId);
    console.log(course);
    res.status(200).json({
        success:true,
        course
    })
}

export {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    isAuthorized,
    addLecturesByCourseId,
    deleteLectureByCourseId,
    getLectureByCourseId
}