import { Service } from "typedi";
import openaiClient from "../openai.client";
import { OpenAIModels } from "../constants/openai-models.enum";
import { ChatCompletionRequestMessage } from "openai";
import * as express from "express";

@Service()
export class ChatController {
    constructor() {}

    async chatConversation(messages: ChatCompletionRequestMessage[], res: express.Response) {
      const completion = await openaiClient.createChatCompletion({
        model: OpenAIModels.GPT_3_5_TURBO,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      });

      res.status(200).json(completion.data)
    }

    async chatCompletion(message: string, res: express.Response) {
      const completion = await openaiClient.createCompletion({
        model: OpenAIModels.DAVINCI_TEXT,
        prompt: message,
        temperature: 0.7,
        max_tokens: 2000
      });

      res.status(200).json(completion.data)
    }
}