import { Router } from "express";
import { login, logout, register, updateProfile, Userprofile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

export const authroute = Router();

authroute.post("/register", register);
authroute.post("/login", login);
authroute.get("/profile", authMiddleware,Userprofile);
authroute.put("/profile", authMiddleware, adminMiddleware,updateProfile)
authroute.post("/logout", authMiddleware,logout);