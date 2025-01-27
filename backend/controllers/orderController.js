/* eslint-disable no-undef */
import Razorpay from 'razorpay';
import crypto from 'crypto';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js'

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body;
    try {
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const options = {
            amount: Number(amount) * 100,
            currency: 'INR',
            receipt: `receipt#${Math.floor(Math.random() * 1000)}`
        };

        razorpayInstance.orders.create(options, async (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: "Something went wrong" });
            }

            // Save order to database
            const newOrder = new orderModel({
                userId,
                items,
                amount,
                address,
                razorpay_order_id: order.id,
            });

            await newOrder.save();


            return res.status(200).json({ success: true, data: order });
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

const verifyOrder = async (req, res) => {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const body = order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac("sha256", RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            const updatedOrder = await orderModel.findOneAndUpdate(
                { razorpay_order_id: order_id },
                { payment: true },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }
            const user = await userModel.findOneAndUpdate(
                { _id: updatedOrder.userId },
                { cartData: {} }, // Assuming cart is an array in user model
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({ success: true, message: "Payment verified successfully", data: updatedOrder });
        } else {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
    }
};

const userOrders = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const orders = await orderModel.find({ userId });
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        console.log("Orders retrieved:", orders);
        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error retrieving orders", error: error.message });
    }
};

const fetchAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        })
    }
}

const updateStatus = async (req, res) => {
    const { orderId, orderStatus } = req.body;

    try {
        await orderModel.findByIdAndUpdate(orderId, { orderStatus: orderStatus });
        res.status(200).json({
            success: true,
            message: "Status update succeefully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const orderCount = async (req, res) => {
    try {
        const totalOrders = await orderModel.countDocuments();

        return res.status(200).json({
            success: true,
            totalOrders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error,
        });
    }
};

const orderCancel = async (req, res) => {
    const { orderId } = req.params;
    const { cancelReason, cancelledBy } = req.body;

    try {

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }

        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: 'Order is already cancelled'
            });
        }

        order.orderStatus = "Cancelled";
        order.cancelReason = cancelReason;
        order.cancelledBy = cancelledBy;
        await order.save();

        return res.status(200).json({
            message: 'Order cancelled successfully',
            updatedOrder: order
        });

    } catch (error) {
        console.error('Error cancelling order:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export { createOrder, verifyOrder, userOrders, fetchAllOrders, updateStatus, orderCount, orderCancel }