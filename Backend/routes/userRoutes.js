import {Router} from "express";
import { getUserProfile, login, logout, register, update } from "../controller/userController.js";
import isAuthenticated from "../middleware/usreMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

userRouter.post("/register",upload.single("avatar"),register);
userRouter.post("/login",login);
userRouter.get("/logout",isAuthenticated,logout);
userRouter.get("/update",isAuthenticated,update);
userRouter.get("/user",isAuthenticated,getUserProfile);

export default userRouter;