import express from "express";
import { signup,submitFinancialData } from "../controllers/userController.js";
import {getTransactionData} from "../controllers/transactionController.js";
const router = express.Router();

// Define the signup route
router.post("/signup", signup);
//define user data route
router.post("/data", submitFinancialData);
//endpoint ot get the transaction data
router.get("/transactions", getTransactionData);

export default router;
