import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    images:[{
        type:String,
        required:true
    }]
}
    
);

export const productModel = mongoose.model("Products" , productSchema);