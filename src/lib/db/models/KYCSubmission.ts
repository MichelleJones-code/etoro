import mongoose from 'mongoose';

const kycSubmissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    documentType: { type: String, enum: ['passport', 'id', 'driving'], required: true },
    docFrontPath: { type: String, required: true },
    docBackPath: { type: String },
    selfiePath: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

kycSubmissionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const KYCSubmission =
  mongoose.models.KYCSubmission ?? mongoose.model('KYCSubmission', kycSubmissionSchema);
