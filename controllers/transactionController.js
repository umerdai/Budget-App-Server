import Cards from "../model/Cards.js";
import Balance from "../model/Balance.js";
import Transaction from "../model/Transaction.js";
import Users from "../model/Users.js";
import { mongoose } from "mongoose";

// Function to calculate balance
async function calculateBalance(userid) {
  try {
    // Validate userId
    const userObjectId =new mongoose.Types.ObjectId(userid);
    // Find cards for the given userId
    const cards = await Cards.find({ userId: userid }).exec();
    if (!cards || cards.length === 0) {
      throw new Error("No cards found for the user");
    }
    else{
      console.log("Cards found for the user", cards);
    }
    // Calculate total income from all cards
    let totalIncome = 0;
    cards.forEach((card) => {
      if (card.cardIncome) {
        totalIncome += card.cardIncome;
      }
    });

    // Find balance for the given userId
    const user= await Users.findById(userid);
    if (!user) {
      throw new Error("User not found");
    }
    else{
      user.balance = totalIncome;
      await user.save();
      
    }
  } catch (err) {
    console.error("Error during calculate balance:", err);
    throw new Error("Internal server error");
  }
}

export const getTransactionData = async (req, res) => {
  try {
    console.log("Control is in the getTransactionData");
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send("User ID is required");
    }
    
    const transactions = await Transaction.find({ userid: userId });
    if (transactions.length === 0) {
      return res.status(404).send("No transactions found for the user");
    } else {
      return res.status(200).json(transactions);
    }
  } catch (err) {
    console.error("Error getting transaction data:", err);
    return res.status(500).send("Internal server error");
  }
};

export const AddTransactions = async (req, res) => {
  try {
    console.log("Control is in the AddTransactions");
    const transaction = req.body;
    console.log("User ID:", transaction.userid);
    if (!transaction.userid || !transaction.card || !transaction.type || !transaction.amount || !transaction.description) {
      return res.status(400).send("All fields are required");
    }
    const newTransaction = new Transaction(transaction);
    await newTransaction.save();
    
    // Recalculate balance after adding a new transaction
    console.log(transaction.userid,transaction.amount,transaction.type);
    await editBalance(transaction.userid, transaction.amount, transaction.type,transaction.card);
    await calculateBalance(transaction.userid);

    return res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Error adding transaction data:", err);
    return res.status(500).send("Internal server error");
  }
};
const editBalance = async (userid, amount, type, card) => {
  try {
    let cards = await Cards.find({ userId: userid });
    if (!cards || cards.length === 0) {
      throw new Error("No cards found for the user");
    }

    let cardFound = false;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].cardType === card) {
        cardFound = true;
        if (type === "incoming") {
          cards[i].cardIncome += amount;
        } else if (type === "outgoing") {
          cards[i].cardIncome -= amount;
        }
        await cards[i].save(); // Save only the modified card
        break; // Stop looping once the card is found and updated
      }
    }

    if (!cardFound) {
      throw new Error("Card not found");
    }

  } catch (err) {
    console.error("Error during calculate balance:", err);
    throw new Error("Internal server error");
  }
};