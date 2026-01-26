import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, Wallet } from '@/lib/db';

export async function GET() {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  await connectDB();
  const wallet = await Wallet.findOne({ userId: new mongoose.Types.ObjectId(result.user.id) });
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
  }

  return NextResponse.json({
    availableBalance: wallet.availableBalance,
    currency: wallet.currency,
  });
}
