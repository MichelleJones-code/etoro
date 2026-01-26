import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, Wallet, Transaction } from '@/lib/db';

export async function POST(request: Request) {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  let body: { amount?: number; method?: string; details?: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const amount = Number(body?.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
  }

  const method = typeof body?.method === 'string' ? body.method : 'Withdrawal';

  await connectDB();
  const userId = new mongoose.Types.ObjectId(result.user.id);
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
  }
  if (wallet.availableBalance < amount) {
    return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
  }

  const referenceId = `WD-${Date.now()}`;
  const description = `Withdrawal via ${method} - Ref: ${referenceId}`;

  wallet.availableBalance -= amount;
  await wallet.save();

  const tx = await Transaction.create({
    userId,
    type: 'withdraw',
    amount,
    currency: wallet.currency,
    description,
    timestamp: new Date().toISOString(),
    status: 'pending',
  });

  return NextResponse.json({
    transaction: {
      id: tx._id.toHexString(),
      status: tx.status,
      amount: tx.amount,
      currency: tx.currency,
      description: tx.description,
      timestamp: tx.timestamp,
      referenceId,
    },
  });
}
