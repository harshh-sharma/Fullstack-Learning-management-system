import {Router} from "express";
import { isAuthorized, createCourse, deleteCourse, getAllCourses, updateCourse, addLecturesByCourseId ,deleteLectureByCourseId} from "../controller/courseController.js";
import isAuthenticated from "../middleware/authMiddleware.js"
import upload from "../middleware/multerMiddleware.js"

const courseRouter = Router();

courseRouter.route("/").get(getAllCourses)
                  .post(isAuthenticated,isAuthorized("ADMIN"),upload.single("thumbnail"),createCourse);

courseRouter.route("/:id").get(isAuthenticated,getAllCourses)
                           .put(isAuthenticated,isAuthorized("ADMIN"),updateCourse)
                           .delete(isAuthenticated,isAuthorized("ADMIN"),deleteCourse)
                           .post(isAuthenticated,isAuthorized("ADMIN"),upload.single("lecture"),addLecturesByCourseId);

courseRouter.route("/:courseId/:lectureId").delete(isAuthenticated,isAuthorized("ADMIN"),deleteLectureByCourseId);

export default courseRouter;