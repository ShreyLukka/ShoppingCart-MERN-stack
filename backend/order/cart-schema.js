import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items:[{
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    quantity: {
        type: Number,
        required: true
    }
    }]

}, { timestamps: true })

export const cartModel = mongoose.model("Cart", cartSchema);