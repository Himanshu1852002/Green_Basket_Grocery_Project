import userModel from '../models/userModel.js';


const addToWishlist = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        const wishlistData = await userData.wishlistData || {};

        if (!wishlistData[req.body.itemId]) {
            wishlistData[req.body.itemId] = 1;
        }
        else {
            wishlistData[req.body.itemId] += 1;
        } await userModel.findByIdAndUpdate(req.body.userId, { wishlistData });
        res.json({ success: true, message: "Added To Wishlist" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let wishlistData = userData.wishlistData || {};

        if (wishlistData[req.body.itemId]) {
            if (wishlistData[req.body.itemId] > 1) {
                wishlistData[req.body.itemId] -= 1;
            } else {
                delete wishlistData[req.body.itemId];
            }
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.body.userId,
            { wishlistData },
            { new: true }
        );

        if (updatedUser) {
            res.json({ success: true, message: "Removed from cart", wishlistData: updatedUser.wishlistData });
        } else {
            throw new Error("Failed to update user cart");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getWishlist = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let wishlistData = await userData.wishlistData || {};
        res.json({ success: true, wishlistData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addToWishlist, removeFromWishlist, getWishlist }