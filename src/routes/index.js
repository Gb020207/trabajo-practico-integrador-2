import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { articleRoutes } from "./article.routes.js";
import { Tagrouter } from "./tag.route.js";

export const routes = Router();

routes.use("/", userRoutes)
routes.use("/", articleRoutes)
routes.use("/", Tagrouter)