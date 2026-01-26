import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import {
  connectDB,
  InvestmentPlan,
  OngoingInvestment,
  Wallet,
  Transaction,
} from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  const { id: planId } = await params;
  if (!planId) return NextResponse.json({ error: 'Missing plan id' }, { status: 400 });

  let body: { amount?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const amount = Number(body?.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
  }

  await connectDB();
  const plan = await InvestmentPlan.findById(planId);
  if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });

  if (amount < plan.minAmount) {
    return NextResponse.json({ error: `Minimum amount is ${plan.minAmount}` }, { status: 400 });
  }
  if (plan.maxAmount != null && amount > plan.maxAmount) {
    return NextResponse.json({ error: `Maximum amount is ${plan.maxAmount}` }, { status: 400 });
  }

  const userId = new mongoose.Types.ObjectId(result.user.id);
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
  if (wallet.availableBalance < amount) {
    return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
  }

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + plan.durationMonths);

  const inv = await OngoingInvestment.create({
    userId,
    planId: plan._id,
    planName: plan.name,
    amount,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    status: 'active',
    accruedProfit: 0,
    roiPercent: plan.roiPercent,
  });

  wallet.availableBalance -= amount;
  await wallet.save();

  await Transaction.create({
    userId,
    type: 'buy',
    amount,
    currency: wallet.currency,
    description: `Investment in ${plan.name}`,
    timestamp: new Date().toISOString(),
    status: 'completed',
  });

  return NextResponse.json({
    investment: {
      id: inv._id.toHexString(),
      planId: plan._id.toHexString(),
      planName: inv.planName,
      amount: inv.amount,
      startDate: inv.startDate,
      endDate: inv.endDate,
      status: inv.status,
      accruedProfit: inv.accruedProfit,
      roiPercent: inv.roiPercent,
    },
  });
}
