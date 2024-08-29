import mongoose from "mongoose";
const BalanceSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    totalbalance: {
        type: Number,
        required: true,
    },
    remaningincome: {
        type: Number,
        
    },


});
export default mongoose.model("Balance", BalanceSchema);
