import mongoose from 'mongoose';

const tradeHistorySchema = new mongoose.Schema(
  {
    masterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    action: { type: String, enum: ['buy', 'sell'], required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    timestamp: { type: String, required: true },
    status: {
      type: String,
      enum: ['completed', 'pending', 'cancelled'],
      default: 'completed',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tradeHistorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const TradeHistory =
  mongoose.models.TradeHistory ?? mongoose.model('TradeHistory', tradeHistorySchema);
