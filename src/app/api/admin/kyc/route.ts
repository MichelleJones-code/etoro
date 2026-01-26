import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth/guards';
import { connectDB, KYCSubmission } from '@/lib/db';

export async function GET(request: Request) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'pending';

  await connectDB();
  const list = await KYCSubmission.find({ status })
    .populate('userId', 'email username firstName lastName')
    .sort({ submittedAt: -1 })
    .lean();

  const items = list.map((s) => {
    const doc = s as unknown as { _id: mongoose.Types.ObjectId; userId?: unknown; status: string; documentType: string; submittedAt?: Date };
    const u = doc.userId as { _id: mongoose.Types.ObjectId; email?: string; username?: string; firstName?: string; lastName?: string } | null;
    return {
      id: (doc._id as mongoose.Types.ObjectId).toHexString(),
      status: doc.status,
      documentType: doc.documentType,
      submittedAt: doc.submittedAt,
      user: u
        ? {
            id: (u._id as mongoose.Types.ObjectId).toHexString(),
            email: u.email,
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            fullName: [u.firstName, u.lastName].filter(Boolean).join(' '),
          }
        : null,
    };
  });

  return NextResponse.json({ items });
}
