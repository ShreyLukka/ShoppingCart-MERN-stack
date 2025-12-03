import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        min:2
    },
    email:{
        type : String,
        required: true,
        match : [ /^[A-Za-z]{2,}@[A-Za-z]{3,}\.[A-Za-z]{2,}$/, "Invalid email format" ]
    },
    password: {
        type:String,
        required:true,
        
    }
})

export const UserModel = mongoose.model("User", userSchema);
