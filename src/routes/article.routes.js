import { Router } from "express";
import { createArticle, deleteArticle, getAllArticle, getArticleById, updateArticle } from "../controllers/article.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

export const articleRoutes = Router();

articleRoutes.post("/article", authMiddleware,createArticle);
articleRoutes.get("/article", authMiddleware,getAllArticle);
articleRoutes.get("/article/:id", authMiddleware,getArticleById);
articleRoutes.put("/article/:id", authMiddleware,updateArticle);
articleRoutes.delete("/article/:id", authMiddleware,deleteArticle);