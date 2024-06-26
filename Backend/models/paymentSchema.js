import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema({
    razorpay_payment_Id:{
        type:String,
        required:true
    },
    razorpay_subscription_Id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Payment = mongoose.model("Payment",paymentSchema);