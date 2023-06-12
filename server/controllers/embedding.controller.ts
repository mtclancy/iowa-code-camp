import { Service } from "typedi";
import { OpenAIModels } from "../constants/openai-models.enum";
import { ChatCompletionRequestMessage, CreateEmbeddingRequest } from "openai";
import openaiClient from "../openai.client";
import * as express from "express"
import { syllabusPrompts } from "../data/us-history";
import { iowaData } from "../data/iowa-history";
const cosineSimilarity = require('compute-cosine-similarity');

@Service()
export class EmbeddingController {
    constructor() {}

    async createSimpleEmbedding(userInput: string | string[], res: express.Response) {
        const embeddingResponse = await this.getEmbedding(userInput);

        res.status(200).json(embeddingResponse)
    }

    async embeddingComparison(wordToCompare: string, wordOptions: string[], res: express.Response) {

        const wordToCompareEmbedding: number[][] = await this.getEmbedding(wordToCompare);
        const optionsEmbeddings: number[][] = await this.getEmbedding(wordOptions);

        let comparisons = optionsEmbeddings.map((embedding: number[], index: number) => {
            return {
                option: wordOptions[index],
                similarity: cosineSimilarity(embedding, wordToCompareEmbedding[0])
            }
        })

        comparisons = comparisons.sort((a, b) => {
            return a.similarity > b.similarity ? -1 : 1;
        })

        res.status(200).json(comparisons);
    }

    async promptCompletionComparison(prompt: string, res: express.Response) {
        const promptEmbedding = await this.getEmbedding(prompt);
        const promptCompletionEmbeddingArray = await this.getEmbedding(syllabusPrompts.map(pc => pc.prompt));

        let comparisons = promptCompletionEmbeddingArray.map((embedding: number[], index: number) => {
            return {
                response: syllabusPrompts[index].response,
                similarity: cosineSimilarity(embedding, promptEmbedding[0])
            }
        });

        comparisons = comparisons.sort((a, b) => {
            return a.similarity > b.similarity ? -1 : 1;
        })

        res.status(200).json(comparisons[0]);
    }

    async queryRelevantText(prompt: string, res: express.Response) {
        const comparisons = await this.getRankedRelevantText(prompt);

        const query: ChatCompletionRequestMessage = {
            role: "user",
            content: `Answer the following question using only the provided text.  Question: ${prompt}, Text: ${comparisons[0].response}`
        }
        const completion = await openaiClient.createChatCompletion({
            model: OpenAIModels.GPT_3_5_TURBO,
            messages: [query],
            temperature: 0.7,
            max_tokens: 2000
          });
        
        res.status(200).json(completion.data.choices[0])
    }

    async searchForRelevantText(prompt: string, res: express.Response) {
        const comparisons = await this.getRankedRelevantText(prompt);

        res.status(200).json(comparisons[0]);
    }

    private async getRankedRelevantText(prompt: string) {
        const promptEmbedding = await this.getEmbedding(prompt);

        let comparisons = iowaData.map((data: { text: string; embedding: number[]; }, index: number) => {
            return {
                response: iowaData[index].text,
                similarity: cosineSimilarity(data.embedding, promptEmbedding[0])
            };
        });

        comparisons = comparisons.sort((a, b) => {
            return a.similarity > b.similarity ? -1 : 1;
        });
        return comparisons;
    }

    private async getEmbedding(userInput: string | string[]) {
        const embeddingRequest: CreateEmbeddingRequest = {
            model: OpenAIModels.ADA_SIMILARITY,
            input: userInput
        };

        const embeddingResponse = await openaiClient.createEmbedding(embeddingRequest);

        return embeddingResponse.data.data.map(entry => entry.embedding);
    }



}