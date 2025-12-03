import express from "express";
import {registerUser,loginUser,logoutUser,changePassword} from "./user-controller.js"
import {authToken } from "../middleware/auth.js"

const router = express.Router();

router.post("/register" , registerUser)
router.post("/login",loginUser)
router.get("/verify", authToken, (req, res) => {
  res.json({ loggedIn: true });
});
router.get("/logout",logoutUser)
router.put("/changepassword",authToken,changePassword)

export default router;
