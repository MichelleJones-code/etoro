import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
    joinDate: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true, default: 'USD' },
    isPremium: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    kycStatus: {
      type: String,
      enum: ['none', 'pending', 'approved', 'rejected'],
      default: 'none',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
