import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tag.controller.js";

export const Tagrouter = Router();

Tagrouter.post("/tag", createTag)
Tagrouter.get("/tag", getAllTags);
Tagrouter.get("/tag/:id", getTagById);
Tagrouter.put("/tag/:id", updateTag);
Tagrouter.delete("/tag/:id", deleteTag);