import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB, Review } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    await connectDB();
    const reviews = await Review.find({ masterId: new mongoose.Types.ObjectId(id) })
      .populate('userId', 'username')
      .sort({ timestamp: -1 })
      .lean();

    const list = reviews.map((r) => {
      const d = r as unknown as { _id: mongoose.Types.ObjectId; userId?: unknown; rating: number; comment: string; timestamp: string; helpful?: number };
      const u = d.userId as { username?: string } | null;
      return {
        id: d._id.toHexString(),
        userId: (d.userId as mongoose.Types.ObjectId)?.toHexString?.() ?? '',
        username: u?.username ?? 'Anonymous',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u?.username ?? String(d._id))}`,
        rating: d.rating,
        comment: d.comment,
        timestamp: d.timestamp,
        helpful: d.helpful ?? 0,
      };
    });

    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/copytraders/[id]/reviews:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
