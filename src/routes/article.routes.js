import { Router } from "express";
import { createArticle, deleteArticle, getAllArticle, getArticleById, updateArticle } from "../controllers/article.controller.js";

export const articleRoutes = Router();

articleRoutes.post("/article", createArticle);
articleRoutes.get("/article", getAllArticle);
articleRoutes.get("/article/:id", getArticleById);
articleRoutes.put("/article/:id", updateArticle);
articleRoutes.delete("/article/:id", deleteArticle);