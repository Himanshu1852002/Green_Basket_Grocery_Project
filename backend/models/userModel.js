import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cartData: {
        type: Object,
        default: {}
    },
    wishlistData: {
        type: Object,
        default: {}
    }
}, { minimize: false });


userSchema.pre("save", function (next) {
    if (this.role === "admin") {
        this.cartData = undefined;
        this.wishlistData = undefined;
    }
    next();
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
