import Users from "../model/Users.js";
import Cards from "../model/Cards.js";
import mongoose from "mongoose";

export const getTotalBalance = async (req, res) => {
    try {
        // Extract userId from the request body
        const { userid } = req.body;  // This extracts userid from req.body
        console.log("userid ye haI BHAI", userid);

        if (!userid) {
            return res.status(400).send("User ID is required");
        }

        // Convert userid string to a mongoose ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userid);

        // Find the user by userObjectId
        const user = await Users.findById(userObjectId);
        console.log("User ye haI ", user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        

        // Respond with user's balance
        return res.status(200).json({ balance: user.balance });
    } catch (err) {
        console.error("Error during calculate balance:", err);
        return res.status(500).send("Internal server error");
    }
};

export const getCardBalance = async (req, res) => {
    try{
        const{userid}=req.body;
        console.log("userid ye haI BHAI", userid);
        if (!userid) {
            return res.status(400).send("User ID is required");
        }
        const userObjectId = new mongoose.Types.ObjectId(userid);
        const cards = await Cards.find({ userId: userObjectId });
        if (!cards || cards.length === 0) {
            return res.status(404).send("No cards found for the user");
        }
        let cardBalances = [];
        cards.forEach(card=>{
            cardBalances.push(card.cardIncome);

        });
        console.log("Card balances:", cardBalances);
        res.status(200).json({balance:cardBalances});
    }
    
    catch(err){
        console.error("Error during calculate balance:", err);
        return res.status(500).send("Internal server error");
    }
};
export const getCardDetails = async (req, res) => {
    try{
        const {userid}=req.query;
        console.log("userid ye haI BHAI", userid);
        if (!userid) {
            return res.status(400).send("User ID is required");
        }else{
            const cards= await Cards.find({userId:userid});
            if(!cards){
                return res.status(404).send("No cards found for the user");}
                else{
                    console.log("Cards found for the user", cards);
                    return res.status(200).json(cards);
                }
        }
    }
    catch(err){
        console.error("Error during calculate balance:", err);
        return res.status(500).send("Internal server error");
    }
};
