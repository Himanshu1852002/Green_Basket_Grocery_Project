import userModel from '../models/userModel.js';


// add to cart function

const addToCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


// remove items from userCart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId]) {
            if (cartData[req.body.itemId] > 1) {
                cartData[req.body.itemId] -= 1;
            } else {
                delete cartData[req.body.itemId];
            }
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData },
            { new: true }
        );

        if (updatedUser) {
            res.json({ success: true, message: "Removed from cart", cartdata: updatedUser.cartData });
        } else {
            throw new Error("Failed to update user cart");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// fetch user cart data

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartdata = await userData.cartData || {};
        res.json({ success: true, cartdata })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addToCart, removeFromCart, getCart }
