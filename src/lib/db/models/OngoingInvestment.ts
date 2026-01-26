import mongoose from 'mongoose';

const ongoingInvestmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvestmentPlan', required: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    accruedProfit: { type: Number, default: 0 },
    nextPayoutDate: { type: String },
    nextPayoutAmount: { type: Number },
    roiPercent: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ongoingInvestmentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const OngoingInvestment =
  mongoose.models.OngoingInvestment ??
  mongoose.model('OngoingInvestment', ongoingInvestmentSchema);
