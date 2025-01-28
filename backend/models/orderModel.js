import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        image: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deliveryTime: {
        type: String,
        default: "Within 30 minutes to 1 hour"
    },
    payment: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String
    },
    razorpay_order_id: {
        type: String
    },
    orderStatus: {
        type: String,
        default: "Processing"
    },
    cancelReason: {
        type: String,
        default: "Not cancelled"
    },
    cancelledBy: {
        type: String,
    }
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
