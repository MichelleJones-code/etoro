import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    availableBalance: { type: Number, required: true, default: 0 },
    currency: { type: String, default: 'USD' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

walletSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const Wallet = mongoose.models.Wallet ?? mongoose.model('Wallet', walletSchema);
