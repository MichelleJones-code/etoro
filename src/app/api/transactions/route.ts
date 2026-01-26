import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, Transaction } from '@/lib/db';

export async function GET(request: Request) {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || undefined;

  await connectDB();
  const filter: { userId: mongoose.Types.ObjectId; type?: string } = {
    userId: new mongoose.Types.ObjectId(result.user.id),
  };
  if (type) filter.type = type;

  const list = await Transaction.find(filter)
    .sort({ timestamp: -1 })
    .lean();

  type TxDoc = { _id: mongoose.Types.ObjectId; type: string; amount: number; currency: string; description: string; timestamp: string; status: string };
  const transactions = (list as unknown as TxDoc[]).map((t) => ({
    id: t._id.toHexString(),
    type: t.type,
    amount: t.amount,
    currency: t.currency,
    description: t.description,
    timestamp: t.timestamp,
    status: t.status,
  }));

  return NextResponse.json({ transactions });
}
