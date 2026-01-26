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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    await connectDB();
    const inv = await OngoingInvestment.findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('planId', 'name')
      .lean();
    if (!inv) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(toItem(inv as unknown as Doc));
  } catch (e) {
    console.error('GET /api/admin/investment/ongoing/[id]:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const updates: Record<string, unknown> = {};
    if (body.status !== undefined && ['active', 'completed', 'cancelled'].includes(String(body.status))) {
      updates.status = body.status;
    }
    if (body.accruedProfit !== undefined) {
      const v = Number(body.accruedProfit);
      if (!Number.isFinite(v)) return NextResponse.json({ error: 'accruedProfit must be a number' }, { status: 400 });
      updates.accruedProfit = v;
    }
    if (body.nextPayoutDate !== undefined) {
      updates.nextPayoutDate = body.nextPayoutDate == null ? undefined : String(body.nextPayoutDate);
    }
    if (body.nextPayoutAmount !== undefined) {
      if (body.nextPayoutAmount == null) updates.nextPayoutAmount = undefined;
      else {
        const v = Number(body.nextPayoutAmount);
        if (!Number.isFinite(v)) return NextResponse.json({ error: 'nextPayoutAmount must be a number' }, { status: 400 });
        updates.nextPayoutAmount = v;
      }
    }

    await connectDB();
    const inv = await OngoingInvestment.findByIdAndUpdate(id, { $set: updates }, { new: true })
      .populate('userId', 'firstName lastName email')
      .populate('planId', 'name')
      .lean();
    if (!inv) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(toItem(inv as unknown as Doc));
  } catch (e) {
    console.error('PUT /api/admin/investment/ongoing/[id]:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
