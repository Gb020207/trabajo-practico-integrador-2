import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tag.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

export const Tagrouter = Router();

Tagrouter.post("/tag", authMiddleware,createTag)
Tagrouter.get("/tag",authMiddleware, getAllTags);
Tagrouter.get("/tag/:id", authMiddleware,getTagById);
Tagrouter.put("/tag/:id", authMiddleware,adminMiddleware,updateTag);
Tagrouter.delete("/tag/:id",authMiddleware,adminMiddleware,deleteTag);