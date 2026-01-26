import mongoose from 'mongoose';

const recentActivitySchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    action: { type: String, enum: ['buy', 'sell'], required: true },
    timestamp: { type: String, required: true },
  },
  { _id: false }
);

const copyTraderProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String, required: true },
    minCopyAmount: { type: Number, required: true },
    riskScore: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    weeklyGain: { type: Number, default: 0 },
    yearlyGain: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    copiers: { type: Number, default: 0 },
    copiedPortfolios: { type: Number, default: 0 },
    stats: {
      winRate: { type: Number, default: 0 },
      avgProfit: { type: Number, default: 0 },
      profitFactor: { type: Number, default: 0 },
      maxDrawdown: { type: Number, default: 0 },
      trades: { type: Number, default: 0 },
      daysActive: { type: Number, default: 0 },
    },
    recentActivity: [recentActivitySchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

copyTraderProfileSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const CopyTraderProfile =
  mongoose.models.CopyTraderProfile ?? mongoose.model('CopyTraderProfile', copyTraderProfileSchema);
