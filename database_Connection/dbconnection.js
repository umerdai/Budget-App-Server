import mongoose from 'mongoose';
import Card from '../model/Cards.js';
import Balance from '../model/Balance.js';
import Transaction from '../model/Transaction.js';
import Users from '../model/Users.js';
import dotenv from 'dotenv';

dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
  }
};

const insertDummyCards = async () => {
//   try {
//     const userId = "66bb2fe25541dd4e1bb85b37";

//     const dummyCards = [
//       { userId, cardIncome: 1000, cardName: 'Card 1' },
//       { userId, cardIncome: 1500, cardName: 'Card 2' },
//       { userId, cardIncome: 2000, cardName: 'Card 3' },
//       { userId, cardIncome: 2500, cardName: 'Card 4' },
//     ];

//     await Card.insertMany(dummyCards);
//     console.log('Dummy cards inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting dummy cards:', error);
//   } finally {
//     try {
//       await mongoose.connection.close();
//     } catch (error) {
//       console.error('Error closing the connection:', error);
//     }
//   }
};

const insertDummyTransactions = async () => {
  try {
    const userId = "66bb2fe25541dd4e1bb85b37";  // Use a valid user ID

    const dummyTransactions = [
      {
        userid: userId,
        card: 'Visa',
        type: 'incoming',
        amount: 300,
        description: 'Grocery Shopping',
      },
      {
        userid: userId,
        card: 'Visa',
        type: 'outgoing',
        amount: 200,
        description: 'Online Purchase',
      },
      {
        userid: userId,
        card: 'Stripe',
        type: 'incoming',
        amount: 550,
        description: 'Subscription Payment',
      },
    ];

    await Transaction.insertMany(dummyTransactions);
    console.log('Dummy transactions inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy transactions:', error);
  } finally {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error closing the connection:', error);
    }
  }
};
const calculateBalance = async (userId) => {
  try {
    console.log('Calculating balance for user:', userId);
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Fetch all cards for the user
    const cards = await Card.find({ userId: userId });
    console.log('Cards from Atlas:', cards);
    if (!cards || cards.length === 0) {
      throw new Error('No cards found for the user');
    }

    // Calculate total income from card incomes
    let totalIncome = 0;
    cards.forEach(card => {
      totalIncome += card.cardIncome;  // Ensure 'cardIncome' is a field in your Card model
    });

    // Find the user by userId
    const user = await Users.findById(userId);
    if (user) {
      // Update the existing user's balance
      user.balance = totalIncome;
      console.log('User balance updated:', user.balance);
      await user.save();
    } else{
      console.log('User not found');
    }
    return { success: true, balance: totalIncome };
  } catch (err) {
    console.error('Error calculating balance:', err);
    return { success: false, error: err.message };
  }
};
// const cardData = new Card({
//   userId: '66bb2fe25541dd4e1bb85b37',  // Replace with a valid User ID from your User collection
//   cardOwner: 'John Doe',
//   cardType: 'Stripe',
//   postalCode: 22345,
//   cardIncome: 1000,
//   cardCVV: 153,
//   address: '123 Main Street, Cityville',
// });

// // Insert the dummy data into the database
// cardData.save()
//   .then(() => {
//     console.log('Dummy card data inserted successfully');
//     mongoose.connection.close(); // Close the connection after inserting the data
//   })
//   .catch((error) => {
//     console.error('Error inserting dummy card data:', error);
//   });


export { connection, insertDummyCards, calculateBalance,insertDummyTransactions };
