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

const appStore = configureStore({
   reducer: {
    auth:authSliceReducer
   },
   devTools:true
})

export default appStore;