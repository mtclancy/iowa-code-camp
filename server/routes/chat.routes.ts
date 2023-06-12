import express from "express";
import Container from "typedi";
import { ChatController } from "../controllers/chat.controller";
import { ChatCompletionRequestMessage } from "openai";

const chatController = Container.get(ChatController);

const router = express.Router();

router.post('/conversation', async (req: express.Request<{},{},ChatCompletionRequestMessage[]>, res: any, next: express.NextFunction) => chatController.chatConversation(req.body, res));
router.post('/completion', async (req: express.Request<{},{},{prompt: string}>, res: any, next: express.NextFunction) => chatController.chatCompletion(req.body.prompt, res));


export default router;