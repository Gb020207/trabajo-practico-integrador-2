import { Router } from "express";
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../controllers/comment.controller.js";

export const commentRoutes = Router();

commentRoutes.post("/comment", createComment);
commentRoutes.get("/comment" , getAllComments);
commentRoutes.get("/comment/:id", getCommentById);
commentRoutes.put("/comment/:id", updateComment);
commentRoutes.delete("/comment/:id", deleteComment);
