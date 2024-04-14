

import { configureStore} from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import courseReducer from "./Slices/courseSlice";
import razorpayReducer from "./Slices/razorpaySlice.js";
import lectureReducer from "./Slices/lectureSlice.js";


const appStore = configureStore({
   reducer: {
    auth:authReducer,
    course:courseReducer,
    razorpay:razorpayReducer,
    lecture:lectureReducer
   },
   devTools:true
})

export default appStore;