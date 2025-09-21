import { Router } from "express";
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", getAllUser);
userRoutes.get("/users/:id", getUserById);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);