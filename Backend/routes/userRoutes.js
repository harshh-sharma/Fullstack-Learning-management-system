import {Router} from "express";
import { changePassword, forgotPassword, getUserProfile, login, logout, register, resetPassword, update } from "../controller/userController.js";
import isAuthenticated from "../middleware/usreMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

userRouter.post("/register",upload.single("avatar"),register);
userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.get("/update",isAuthenticated,update);
userRouter.get("/user",isAuthenticated,getUserProfile);
userRouter.post("/forgot-password",forgotPassword);
userRouter.post("/reset/:resetToken",resetPassword);
userRouter.post("/change-password",changePassword);

export default userRouter;