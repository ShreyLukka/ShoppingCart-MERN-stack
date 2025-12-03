import express from "express";
import {getAllProducts ,getCategory} from "./product-controller.js"

const route = express.Router();

route.get("/", getAllProducts);
route.get("/category" , getCategory);

export default route;