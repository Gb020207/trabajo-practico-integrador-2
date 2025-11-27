import { Router } from "express";
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ownerOrAdminMiddleware } from "../middleware/ownerOrAdminMiddleware.js";

export const commentRoutes = Router();

commentRoutes.post("/comment", authMiddleware,createComment);
commentRoutes.get("/comment/my" , authMiddleware,getAllComments);
commentRoutes.get("/comment/:id", authMiddleware,getCommentById);
commentRoutes.put("/comment/:id", authMiddleware,ownerOrAdminMiddleware,updateComment);
commentRoutes.delete("/comment/:id", authMiddleware,ownerOrAdminMiddleware,deleteComment);
