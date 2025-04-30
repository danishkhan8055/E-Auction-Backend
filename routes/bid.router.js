import express from 'express';
const router = express.Router();

import * as bidController from '../controller/bid.controller.js';

router.post("/save",bidController.save);

router.get("/fetch",bidController.fetch);

router.delete("/delete",bidController.deleteBid);

router.patch("/update",bidController.updateBid);

export default router;



