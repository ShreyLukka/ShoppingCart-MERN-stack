import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import connectToDb from "./configs/db.js";
import userRoute from "./user/user-routes.js";
import productRoute from "./product/product.routes.js";
import cartRoute from "./order/cart-routes.js"

dotenv.config();  

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

app.use("/api" , userRoute)
app.use("/products" , productRoute)
app.use("/cart", cartRoute)


app.listen(5000,()=>{
    connectToDb();
    console.log("server running on port 5000 and connected to mongoDb database");
    
})