// import configureStore from "@reduxjs/toolkit";
// import authSliceReducer from "./Slices/authSlice";

// const appStore = configureStore({
//     reducer:{
//         auth:authSliceReducer
//     },
//     devtools:true
// })

// export default appStore;

import { configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice";
import courseSliceReducer from "./Slices/courseSlice";


const appStore = configureStore({
   reducer: {
    auth:authSliceReducer,
    course:courseSliceReducer
   },
   devTools:true
})

export default appStore;