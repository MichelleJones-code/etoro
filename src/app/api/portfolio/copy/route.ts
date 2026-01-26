import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, CopyRelationship } from '@/lib/db';

export async function GET() {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  await connectDB();
  const list = await CopyRelationship.find({
    copierId: new mongoose.Types.ObjectId(result.user.id),
  })
    .populate('masterId', 'username')
    .sort({ startDate: -1 })
    .lean();

  type CRDoc = {
    _id: mongoose.Types.ObjectId;
    masterId: { _id: mongoose.Types.ObjectId; username?: string } | mongoose.Types.ObjectId;
    amount: number;
    allocationPercent: number;
    status: string;
    startDate: Date;
  };
  const items = (list as unknown as CRDoc[]).map((d) => {
    const mid = d.masterId;
    const masterIdStr =
      mid && typeof mid === 'object' && '_id' in mid
        ? (mid as { _id: mongoose.Types.ObjectId })._id.toHexString()
        : (mid as mongoose.Types.ObjectId)?.toHexString?.() ?? '';
    const masterUsername =
      mid && typeof mid === 'object' && 'username' in mid
        ? (mid as { username?: string }).username ?? 'Unknown'
        : 'Unknown';
    return {
      id: d._id.toHexString(),
      masterId: masterIdStr,
      masterUsername,
      amount: d.amount,
      allocationPercent: d.allocationPercent,
      status: d.status,
      startDate: d.startDate instanceof Date ? d.startDate.toISOString() : String(d.startDate),
    };
  });

  return NextResponse.json({ items });
}
