import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { articleRoutes } from "./article.routes.js";
import { Tagrouter } from "./tag.route.js";
import { commentRoutes } from "./comment.routes.js";
import { authroute } from "./auth.routes.js";

export const routes = Router();

routes.use("/", userRoutes)
routes.use("/", articleRoutes)
routes.use("/", Tagrouter)
routes.use("/", commentRoutes);
routes.use("/", authroute);