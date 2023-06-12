'use strict';
import 'reflect-metadata';
import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import healthCheck from './routes/healthCheck.routes';
import chatRoutes from './routes/chat.routes';
import embeddingRoutes from './routes/embedding.routes';

dotenv.config();

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors());
app.use(express.json());

app.use('/health-check', healthCheck);
app.use('/chat', chatRoutes);
app.use('/embedding', embeddingRoutes);

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT} this is your node server`);