import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, OngoingInvestment } from '@/lib/db';

export async function GET() {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  await connectDB();
  const list = await OngoingInvestment.find({
    userId: new mongoose.Types.ObjectId(result.user.id),
  })
    .sort({ startDate: -1 })
    .lean();

  type ODoc = { _id: mongoose.Types.ObjectId; userId: mongoose.Types.ObjectId; planId: mongoose.Types.ObjectId; planName: string; amount: number; startDate: Date; endDate: Date; status: string; accruedProfit: number; nextPayoutDate?: Date; nextPayoutAmount?: number; roiPercent: number };
  const items = list.map((o) => {
    const d = o as unknown as ODoc;
    return {
    id: d._id.toHexString(),
    userId: d.userId.toHexString(),
    planId: d.planId.toHexString(),
    planName: d.planName,
    amount: d.amount,
    startDate: d.startDate,
    endDate: d.endDate,
    status: d.status,
    accruedProfit: d.accruedProfit,
    nextPayoutDate: d.nextPayoutDate,
    nextPayoutAmount: d.nextPayoutAmount,
    roiPercent: d.roiPercent,
  };
  });

  return NextResponse.json(items);
}
