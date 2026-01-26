import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['deposit', 'withdraw', 'buy', 'sell', 'dividend', 'fee'],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    symbol: { type: String },
    description: { type: String, required: true },
    timestamp: { type: String, required: true },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed'],
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

transactionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const Transaction =
  mongoose.models.Transaction ?? mongoose.model('Transaction', transactionSchema);
