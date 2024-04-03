import { User } from "../models/userModel.js"
import cloudinary from "cloudinary";
const cookieOption = {
    maxAge : 7*24*60*60*1000,
    httpOnly:true,
    secure:true
}

const register = async (req,res) => {
    try {
        const { name,email,password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const isUserExistOrNot = await User.findOne({email});
        if(isUserExistOrNot){
            return res.status(400).json({
                success:false,
                message:"User already registered !!"
            })
        }

        const user = await User.create({name,email,password});

        if(!user){
            return res.status(500).json({
                success:false,
                message:"server error while registering"
            })
        }

        if(req.file){
            console.log("req",req.file);
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    width:"250",
                    height:"250",
                    crop:"fill",
                    gravity:"faces"
                })
                console.log("res",result);
                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;
                }

                await user.save();
                user.password = undefined;
        }

        const token = await user.generateJWT();
        res.cookie("token",token,cookieOption); 
        if(user){
            res.status(200).json({
                success:true,
                message:"User is registered successfully",
                data:user,
                token
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
}

const login = async (req,res) => {
try {
        const { email,password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fileds are required"
            })
        }
    
        const user = await User.findOne({email}).select("+password");
    
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User are not registered"
            })
        }
    
        const isCorrectPassword = await user.correctPassword(password);
        if(!isCorrectPassword){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        const token = await user.generateJWT();
        res.cookie("token",token,cookieOption);
        res.status(200).json({
            success:true,
            message:"user successfully loggedIn",
            data:user,
        })
} catch (error) {
    res.status(400).json({
        success:false,
        message:error.message
    })
}
}

const logout = (req,res) => {
    res.status(200).cookie("token",null,{
        maxAge:0,
        secure:true,
        httpOnly:true
    }).json({
        success:true,
        message:"user successfully logout"
    })
}

const update = () => {

}

const getUserProfile = () => {

}

export {
    register,
    login,
    logout,
    update,
    getUserProfile
}