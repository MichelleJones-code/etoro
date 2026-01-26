import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, OngoingInvestment } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await connectDB();
  const inv = await OngoingInvestment.findOne({
    _id: new mongoose.Types.ObjectId(id),
    userId: new mongoose.Types.ObjectId(result.user.id),
  })
    .populate('planId')
    .lean();

  if (!inv) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  type InvDoc = { _id: mongoose.Types.ObjectId; userId: unknown; planId?: unknown; planName: string; amount: number; startDate: Date; endDate: Date; status: string; accruedProfit: number; nextPayoutDate?: Date; nextPayoutAmount?: number; roiPercent: number };
  const invDoc = inv as unknown as InvDoc;
  const plan = invDoc.planId as { _id: mongoose.Types.ObjectId; name?: string; description?: string; roiPercent?: number; durationMonths?: number; minAmount?: number; maxAmount?: number; riskLevel?: string } | null;

  return NextResponse.json({
    id: invDoc._id.toHexString(),
    userId: (invDoc.userId as mongoose.Types.ObjectId).toHexString(),
    planId: (invDoc.planId as mongoose.Types.ObjectId)?.toHexString?.() ?? (invDoc.planId as unknown as string),
    planName: invDoc.planName,
    amount: invDoc.amount,
    startDate: invDoc.startDate,
    endDate: invDoc.endDate,
    status: invDoc.status,
    accruedProfit: invDoc.accruedProfit,
    nextPayoutDate: invDoc.nextPayoutDate,
    nextPayoutAmount: invDoc.nextPayoutAmount,
    roiPercent: invDoc.roiPercent,
    plan: plan
      ? {
          description: plan.description,
          roiPercent: plan.roiPercent,
          durationMonths: plan.durationMonths,
          minAmount: plan.minAmount,
          maxAmount: plan.maxAmount,
          riskLevel: plan.riskLevel,
        }
      : null,
  });
}
