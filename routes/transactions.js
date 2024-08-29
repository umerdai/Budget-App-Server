import express from 'express';
import {AddTransactions} from "../controllers/transactionController.js";

const router = express.Router();
router.post("/add", AddTransactions);
export default router;