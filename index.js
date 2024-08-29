import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactions.js";
import { connection, insertDummyCards,calculateBalance,insertDummyTransactions } from "./database_Connection/dbconnection.js";
import { getTotalBalance,getCardBalance,getCardDetails } from "./controllers/balanceController.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

connection().then(() => {
  // insertDummyCards(); // Insert dummy data after the database connection is successful
 // insertDummyTransactions() 
  calculateBalance("66bb2fe25541dd4e1bb85b37");

});

// Register routes
app.use("/user/balance", getTotalBalance);
app.use("/user/cardbalance", getCardBalance);
app.use("/user/carddetails", getCardDetails);
app.use("/transactions", transactionRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
