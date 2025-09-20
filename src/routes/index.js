import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { articleRoutes } from "./article.routes.js";

export const routes = Router();

routes.use("/", userRoutes)
routes.use("/", articleRoutes)