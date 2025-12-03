import { UserModel } from "./user-schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function registerUser(req, res) {

    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.findOne({ email });

        if (user) {
           return res.status(400).json({ success: false, message: "Email Already Registered! Try with different email" });
        }

        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, newUser });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export async function loginUser(req, res) {

    try{
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid crendentials" })
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(401).json({ success: false, message: "Incorrect password! Please try again!" })
    }
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    })

    return res.status(200).json(
        {
            success: true,
            message: "loggedin successfully"
        }
    )}catch(error){
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }

}

export async function changePassword(req,res){
    try{    
        const userId = req.userId;
        const { oldpassword,newpassword,confirmpassword} = req.body;

        if(!oldpassword || !newpassword || !confirmpassword){
            return res.status(400).json({success:false, message:"All fields are required"})
        }

        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({success:false, message:"User not found"})
        }

        const matchPassword = await bcrypt.compare(oldpassword,user.password);

        if(!matchPassword){
            return res.status(400).json({success:false, message:"Old password is incorrect "});
        }

        if(newpassword !== confirmpassword){
            return res.status(400).json({success:false, message:"New password and Confirm Password are not same"})
        }

        const newHasedPassword = await bcrypt.hash(newpassword,12);

        user.password = newHasedPassword;
        await user.save();
        return res.status(200).json({success:true, message:"Password changed successfully"});
        

    }catch(error){
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export function logoutUser(req, res) {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
}
