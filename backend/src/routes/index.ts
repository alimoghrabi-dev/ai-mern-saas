import { Router } from "express";
import userRoutes from "./user.route.js";
import chatRoutes from "./chats.route.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/chat", chatRoutes);

export default appRouter;
