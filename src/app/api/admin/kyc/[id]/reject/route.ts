import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth/guards';
import { connectDB, KYCSubmission, User } from '@/lib/db';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await connectDB();
  const sub = await KYCSubmission.findById(id);
  if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (sub.status !== 'pending') {
    return NextResponse.json({ error: 'Submission already reviewed' }, { status: 400 });
  }

  sub.status = 'rejected';
  sub.reviewedAt = new Date();
  sub.reviewedBy = new mongoose.Types.ObjectId(result.user.id);
  await sub.save();

  await User.findByIdAndUpdate(sub.userId, { kycStatus: 'rejected' });

  return NextResponse.json({ ok: true, status: 'rejected' });
}
