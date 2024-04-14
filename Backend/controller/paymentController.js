// import { razorpay } from "..";
import { User } from "../models/userModel.js";
import { razorpay } from "../index.js";
import { Payment } from "../models/paymentSchema.js";

const getRazorPayApiKey = async (req,res) => {
    try {
        res.status(200).json({
            success:true,
            message:"RazorPayApiKey",
            key:process.env.RAZORPAY_KEY_ID
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const buySubscription = async (req,res) => {
        try {
            const {id} = req.user;
            const user = await User.findById(id);
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"unauthorized user"
                })
            }

            // if(user.role == "ADMIN"){
            //     return res.status(401).json({
            //         success:false,
            //         message:"admin cannot purchase coures"
            //     })
            // }
            console.log(razorpay);
            const subscription = await razorpay.subscriptions.create({
                // plan_id: process.env.RAZORPAY_PLAN_ID,
                customer_notify:1
            })

            user.subscription.id = subscription.id;
            user.subscription.status = subscription.status
            await user.save();

            res.status(201).json({
                success:true,
                message:"subcription succesfully",
                subscription_id:subscription.id
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
}

const verifySubscription = async (req,res) => {
    try {
        const {id} = req.user;
        const {razorpay_payement_id,razorpay_signature,razorpay_subscription_id} = req.body;

        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"unauthorized user"
            })
        }

        const subscriptionId = user.subscription.id;

        const generateSignature = crypto
                                        .createHmac("sha256",process.env.RAZORPAY_SECRET)
                                        .update(`${razorpay_payement_id}|${subscriptionId}`)
                                        .digest("hex");

        if(generateSignature !== razorpay_signature){
            return res.status(500).json({
                success:false,
                message:"Payment not verified ,Please try again"
            })
        }

        await Payment.create({
            razorpay_payement_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        user.subscription.status = "active",
        await user.save();

        res.status(201).json({
            success:true,
            message:"Payment verified successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const cancelSubscription = async (req,res) => {
    const {id} = req.user;

    const user = await User.findById(id);
    if(!user){
        return res.status(400).json({
            success:false,
            message:"unauthorized user"
        })
    }

    if(user.role == "ADMIN"){
        return res.status(401).json({
            success:false,
            message:"admin cannot purchase coures"
        })
    }

    const subcriptionId = user.subscription.id;
    const subscription = await razorpay.subscription.cancel(
        subcriptionId
    )

    user.subscription.status = subscription.status;
}

const allPayments = (req,res) => {
    const {count} = req.params;
    try {
        const subscription = razorpay.subscription.all({
            count : count || 10
        })
        res.status(200).json({
            success:true,
            message:"All payments",
            subscription
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const subscribe = async(req,res) => {
    try {
        const {id} = req.user;
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"unauthorized user"
            })
        }

        user.subscription.status = "active";
        user.save();

        res.status(201).json({
            success:true,
            message:"user is subscribed",
            data:user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
            
        })
    }
}

export {
    getRazorPayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
    subscribe
}