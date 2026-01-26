import mongoose from 'mongoose';

const copyRelationshipSchema = new mongoose.Schema(
  {
    copierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    masterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    allocationPercent: { type: Number, required: true },
    autoCopy: { type: Boolean, default: true },
    copyOpenPositions: { type: Boolean, default: false },
    startDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'stopped'], default: 'active' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

copyRelationshipSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const CopyRelationship =
  mongoose.models.CopyRelationship ?? mongoose.model('CopyRelationship', copyRelationshipSchema);
