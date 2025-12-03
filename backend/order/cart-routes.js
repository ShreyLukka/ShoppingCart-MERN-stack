import express from "express";
import {addToCart,getCartItems,increaseQty,decreaseQty,removeItemFromCart} from "./cart-controller.js"
import {authToken} from "../middleware/auth.js"

const route = express.Router();

route.post("/addtocart", authToken,addToCart);
route.get("/",authToken,getCartItems)
route.put("/increaseqty", authToken, increaseQty);
route.put("/decreaseqty",authToken,decreaseQty);
route.delete("/removeitem",authToken,removeItemFromCart)

export default route;