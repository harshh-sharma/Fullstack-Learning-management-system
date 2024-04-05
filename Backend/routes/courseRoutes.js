import {Router} from "express";
import { createCourse, deleteCourse, getAllCourses, updateCourse } from "../controller/courseController.js";
import isAuthenticated from "../middleware/authMiddleware.js"

const courseRouter = Router();

courseRouter.route("/").get(getAllCourses)
                  .post(createCourse);

courseRouter.route("/:id").get(isAuthenticated,getAllCourses)
                           .put(updateCourse)
                           .delete(deleteCourse);

export default courseRouter;