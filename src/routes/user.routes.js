import { Router } from "express";
import {  createUser, deleteUser, getAllUser, getAllUserAndDelete, getUserById, softDeleteUser, updateUser } from "../controllers/user.controller.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const userRoutes = Router();

userRoutes.get("/users", authMiddleware,adminMiddleware,getAllUser)
userRoutes.get("/users/delete", authMiddleware,adminMiddleware,getAllUserAndDelete);
userRoutes.get("/users/:id", authMiddleware,adminMiddleware,getUserById);
userRoutes.put("/users/:id", authMiddleware,adminMiddleware,updateUser);
userRoutes.delete("/users/delete/:id", softDeleteUser)
userRoutes.delete("/users/:id", authMiddleware,adminMiddleware,deleteUser);