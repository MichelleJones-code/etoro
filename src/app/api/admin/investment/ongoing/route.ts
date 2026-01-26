import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth/guards';
import { connectDB, OngoingInvestment } from '@/lib/db';

type Doc = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | { _id: mongoose.Types.ObjectId; firstName?: string; lastName?: string; email?: string };
  planId: mongoose.Types.ObjectId | { _id: mongoose.Types.ObjectId; name?: string };
  planName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  accruedProfit: number;
  nextPayoutDate?: string;
  nextPayoutAmount?: number;
  roiPercent: number;
};

function toItem(d: Doc) {
  const u = d.userId as { _id: mongoose.Types.ObjectId; firstName?: string; lastName?: string; email?: string } | mongoose.Types.ObjectId;
  const p = d.planId as { _id: mongoose.Types.ObjectId; name?: string } | mongoose.Types.ObjectId;
  const userIdStr = u && typeof u === 'object' && '_id' in u
    ? (u as { _id: mongoose.Types.ObjectId })._id.toHexString()
    : (d.userId as mongoose.Types.ObjectId).toHexString();
  const planIdStr = p && typeof p === 'object' && '_id' in p
    ? (p as { _id: mongoose.Types.ObjectId })._id.toHexString()
    : (d.planId as mongoose.Types.ObjectId).toHexString();
  const userObj = u && typeof u === 'object' && 'firstName' in u
    ? { firstName: (u as { firstName?: string }).firstName, lastName: (u as { lastName?: string }).lastName, email: (u as { email?: string }).email }
    : null;
  return {
    id: d._id.toHexString(),
    userId: userIdStr,
    user: userObj,
    planId: planIdStr,
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
}

export async function GET(request: Request) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const planId = searchParams.get('planId');

    const filter: Record<string, unknown> = {};
    if (status && ['active', 'completed', 'cancelled'].includes(status)) filter.status = status;
    if (userId) {
      try {
        filter.userId = new mongoose.Types.ObjectId(userId);
      } catch {
        // ignore invalid userId
      }
    }
    if (planId) {
      try {
        filter.planId = new mongoose.Types.ObjectId(planId);
      } catch {
        // ignore invalid planId
      }
    }

    await connectDB();
    const list = await OngoingInvestment.find(filter)
      .populate('userId', 'firstName lastName email')
      .populate('planId', 'name')
      .sort({ startDate: -1 })
      .limit(100)
      .lean();

    const items = list.map((o) => toItem(o as unknown as Doc));
    return NextResponse.json(items);
  } catch (e) {
    console.error('GET /api/admin/investment/ongoing:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
