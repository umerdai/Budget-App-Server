import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    card:{
        type: String,
        enum: ['Mastercard', 'Stripe', 'Visa'],
        required: true,
    },
    type: {
        type: String,
        enum: ['incoming', 'outgoing'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },


});
export default mongoose.model("Transaction", TransactionSchema);