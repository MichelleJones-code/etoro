import mongoose from 'mongoose';

const investmentPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    roiPercent: { type: Number, required: true },
    durationMonths: { type: Number, required: true },
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'] },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

investmentPlanSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const InvestmentPlan =
  mongoose.models.InvestmentPlan ?? mongoose.model('InvestmentPlan', investmentPlanSchema);
