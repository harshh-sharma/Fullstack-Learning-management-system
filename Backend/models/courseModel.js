import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "course title is required"],
        minLength: [8, "course title contains atleast 8 character"],
        maxLength: [60, "course title should be contain less then 60 character"]
    },
    description: {
        type: String,
        required: [true, "course description is required"],
        minLength: [8, "course description contains atleast 8 character"],
        maxLength: [200, "course description should be contain less then 60 character"]
    },
    category: {
        type: String,
        required: [true, "course category is required"],
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    lectures: [
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                    required:true
                },
                secure_url:{
                    type:String,
                    required:true
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:[true,"created by name is required"]
    }
},{
    timestamps:true
});

export const Course = mongoose.model("Course",courseSchema);