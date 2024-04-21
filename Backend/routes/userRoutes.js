import {Router} from "express";
import { changePassword, forgotPassword, getUserProfile, login, logout, register, resetPassword, updateUser} from "../controller/userController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

userRouter.post("/register",upload.single("avatar"),register);
userRouter.post("/login",login);
userRouter.get("/logout",isAuthenticated,logout);
userRouter.get("/profile",isAuthenticated,getUserProfile);
userRouter.put("/update",isAuthenticated,updateUser);
userRouter.post("/forgot-password",forgotPassword);
userRouter.post("/reset/:resetToken",resetPassword);
userRouter.put("/change-password",isAuthenticated,changePassword);

export default userRouter;