import mongoose from "mongoose";
const CardsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cardOwner:{
        type: String,
        required: true,
    },
    cardType:{
        type: String,
        enum : ['Mastercard', 'Stripe', 'Visa'],
        required: true,
    },
    postalCode:{
        type: Number,
        required: true,
    },
    cardIncome:{
        type: Number,
        required: true,
    },
    cardCVV:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
});
export default mongoose.model("Cards", CardsSchema);
