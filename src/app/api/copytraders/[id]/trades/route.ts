import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB, TradeHistory } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    await connectDB();
    const trades = await TradeHistory.find({ masterId: new mongoose.Types.ObjectId(id) })
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    const list = trades.map((t) => {
      const d = t as unknown as { _id: mongoose.Types.ObjectId; symbol: string; action: string; amount: number; price: number; totalValue: number; timestamp: string; status?: string };
      return {
        id: d._id.toHexString(),
        symbol: d.symbol,
        action: d.action,
        amount: d.amount,
        price: d.price,
        totalValue: d.totalValue,
        timestamp: d.timestamp,
        status: d.status ?? 'completed',
      };
    });

    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/copytraders/[id]/trades:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
