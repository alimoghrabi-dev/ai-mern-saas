import { Router } from "express";
import { verifyToken } from "../utils/token.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteUserChat,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat.controllers.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

chatRoutes.delete("/delete", verifyToken, deleteUserChat);

export default chatRoutes;
