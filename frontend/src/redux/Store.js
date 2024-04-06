import {configurestore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice";

const appStore = configurestore({
    reducer:{
        auth:authSliceReducer
    },
    devtools:true
})

export default appStore;