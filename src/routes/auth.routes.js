import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

export const authroute = Router();

authroute.post("/register", register);
authroute.post("/login", login);