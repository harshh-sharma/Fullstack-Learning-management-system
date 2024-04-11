import { Router } from "express";
import { allPayments, buySubscription, cancelSubscription, getRazorPayApiKey, verifySubscription } from "../controller/paymentController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import { isAuthorized } from "../controller/courseController.js";

const paymentRouter = Router();

paymentRouter.route("/razorpay-key").get(
    isAuthenticated,
    getRazorPayApiKey
);
paymentRouter.route("/buySubscription").post(
    isAuthenticated,
    buySubscription
);
paymentRouter.route("/verify").post(
    isAuthenticated,
    verifySubscription
);
paymentRouter.route("/unsubscribe").post(
    isAuthenticated,
    cancelSubscription
);
paymentRouter.route("/").get(
    isAuthenticated,
    isAuthorized("ADMIN"),
    allPayments
);

export default paymentRouter;


