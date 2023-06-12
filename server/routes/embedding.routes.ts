import Container from "typedi";
import { EmbeddingController } from "../controllers/embedding.controller";
import * as express from "express";

const embeddingController = Container.get(EmbeddingController);

const router = express.Router();

router.post('/simple', async (req: express.Request<{},{},{prompt: string | string[]}>, res: any, next: express.NextFunction) => embeddingController.createSimpleEmbedding(req.body.prompt, res));

router.post('/comparison',
    async (req: express.Request<{},{},{wordToCompare: string, wordOptions: string[]}>, res: any, next: express.NextFunction) => 
        embeddingController.embeddingComparison(req.body.wordToCompare, req.body.wordOptions, res));

router.post('/prompt-completion', async (req: express.Request<{},{},{prompt: string }>, res: any, next: express.NextFunction) => embeddingController.promptCompletionComparison(req.body.prompt, res));
router.post('/find-relevant-text', async (req: express.Request<{},{},{prompt: string }>, res: any, next: express.NextFunction) => embeddingController.searchForRelevantText(req.body.prompt, res));
router.post('/query-relevant-text', async (req: express.Request<{},{},{prompt: string }>, res: any, next: express.NextFunction) => embeddingController.queryRelevantText(req.body.prompt, res));


export default router;