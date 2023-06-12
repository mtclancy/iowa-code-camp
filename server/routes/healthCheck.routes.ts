import express from "express";

const router = express.Router();

router.get('/', function(req: any, res: any, next) {
    res.send("healthy!");
});

export default router;