import {config } from "dotenv";
import app from "./app.js";
import connectToDb from "./config/db.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
config();
connectToDb();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// export const razorpay = new Razorpay({
//     // key_id:process.env.RAZORPAY_KEY_ID,
//     // key_secret:process.env.RAZORPAY_SECRET
// });

const PORT = process.env.PORT || 3500;

app.listen(PORT,() => {
    console.log(`Server successfully running on http://localhost:${PORT}`);
})