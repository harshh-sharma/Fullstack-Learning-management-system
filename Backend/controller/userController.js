import { User } from "../models/userModel.js"
import crypto from "crypto";
import cloudinary from "cloudinary";
import sendMail from "../utils/sendMail.js";

const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isUserExistOrNot = await User.findOne({ email });
        if (isUserExistOrNot) {
            return res.status(400).json({
                success: false,
                message: "User already registered !!"
            })
        }

        const user = await User.create({ name, email, password });

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "server error while registering"
            })
        }

        if (req.file) {
            console.log("req", req.file);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                width: "250",
                height: "250",
                crop: "fill",
                gravity: "faces"
            })
            console.log("res", result);
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }

            await user.save();
            user.password = undefined;
        }

        const token = await user.generateJWT();
        res.cookie("token", token, cookieOption);
        if (user) {
            res.status(200).json({
                success: true,
                message: "User is registered successfully",
                data: user,
                token
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User are not registered"
            })
        }

        const isCorrectPassword = await user.correctPassword(password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })
        }
        const token = await user.generateJWT();
        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            message: "user successfully loggedIn",
            data: user,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly:true
    }).json({
        success: true,
        message: "user successfully logout"
    })
}

const update = () => {

}

const getUserProfile = () => {

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User are not registered"
        })
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log(resetPasswordUrl);

    try {
        console.log("yes");
        console.log(await sendMail(email, "subject", "message"));
        console.log("no");
        res.status(200).json({
            success: true
        })
    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save();

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;
    try {
        if (!password || !resetToken) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            })
        }

        const forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Token is expire,Please try again"
            })
        }

        user.password = password;
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        user.save();

        res.status(200).json({
            success: true,
            message: "Password successfully reset"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const changePassword = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;
    try {
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            })
        }
        const user = await User.findById(id).select("+password");
        const isCorrectPassword = await user.correctPassword(oldPassword);
        if (!isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "password changed successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { name } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user doesn't exists"
        })
    }

    if(name){
        user.name = name;
    }

    try {
        if (req.file) {
            // console.log("req", req.file);
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                width: "250",
                height: "250",
                crop: "fill",
                gravity: "faces"
            })
            console.log("res", result);
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }
        }
        await user.save();
        res.status(200).json({
            success:true,
            message:"Profile updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

export {
    register,
    login,
    logout,
    update,
    getUserProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}