import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance"



export const getRazorpayId = createAsyncThunk("payment/razorpay",async() => {
    try {
        const response = await axiosInstance.get("/payment//razorpay-key");
        console.log(response);
        return await response?.data
        // return (await response).data;
    } catch (error) {
        toast.error(error?.res?.data);
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchase",async() => {
    try {
        const response = axiosInstance.post("/payment/buySubscription");
        toast.promise(response,{
            loading:"wait !!",
            success:"razorpay id successfuuly get",
            error:"failed to get razorpay id"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.res?.data);
    }
})

export const verifyUserPayment = createAsyncThunk("/payment/verify",async(data) => {
    try {
        const response = await axiosInstance.post("/payment/verify",{
            razorpay_payement_id: data.razorpay_payement_id ,
            razorpay_signature: data.razorpay_signature,
            razorpay_subscription_id: data.razorpay_subscription_id
        });
        return response?.data;
    } catch (error) {
        toast.error(error?.res?.data);
    }
})

export const getPaymentRecords = createAsyncThunk("/payments",async() => {
    try {
        const response =  axiosInstance.get("/payments?count=10");
        toast.promise(response,{
            loading:"wait !! laoding payment records",
            success:"sucessfully loaded all payments",
            error:"failed to get payments records"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.res?.data);
    }
})

export const unsubscribeTheBundle = createAsyncThunk("/unsubscribe",async() => {
    try {
        const response = axiosInstance.post("/payment/unsubscribe");
        toast.promise(response,{
            loading:"wait !!",
            success:"successfully unsubribe the course",
            error:"failed to unsubscirbe"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.res?.data);
    }
})

const razorpaySlice = createSlice({
    name:"razorpay",
    initialState:{
        key:"",
        subscriptionId:"",
        isPaymentVerifiend:false,
        allPayments:{},
        finalMonths:{},
        monthlySalesRecord:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
               .addCase(getRazorpayId.fulfilled,(state,action) => {
                    state.key = action?.payload?.key
               }) 
               .addCase(verifyUserPayment.fulfilled,(state,action) => {
                    toast.success(action?.payload?.message)
                    state.isPaymentVerifiend = action?.payload?.success
               })
               .addCase(verifyUserPayment.rejected,(state,action) => {
                    toast.error(action?.payload?.message)
                    state.isPaymentVerifiend = action?.payload?.success
               })
               .addCase(getPaymentRecords.fulfilled,(state,action) => {
                state.allPayments = action?.payload?.allPayments,
                state.finalMonths = action?.payload?.finalMonths,
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
           })
               
    }
})

// export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;