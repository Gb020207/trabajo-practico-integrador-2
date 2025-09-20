import { Router } from "express";
import { createArticle } from "../controllers/article.controllers.js";

export const articleRoutes = Router();

articleRoutes.post("/article", createArticle);