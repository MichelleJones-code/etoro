import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB, CopyTraderProfile } from '@/lib/db';

type ProfileDoc = {
  userId?: { _id?: { toHexString: () => string }; username?: string; avatar?: string } | null;
  verified?: boolean;
  followers?: number;
  copiers?: number;
  copiedPortfolios?: number;
  weeklyGain?: number;
  yearlyGain?: number;
  riskScore?: number;
  minCopyAmount?: number;
  bio?: string;
  stats?: { winRate?: number; avgProfit?: number; profitFactor?: number; maxDrawdown?: number; trades?: number; daysActive?: number };
  recentActivity?: Array<{ symbol: string; action: string; timestamp: string }>;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    await connectDB();
    const profile = await CopyTraderProfile.findOne({ userId: new mongoose.Types.ObjectId(id) })
      .populate('userId', 'username avatar')
      .lean();

    if (!profile) return NextResponse.json({ error: 'Copy trader not found' }, { status: 404 });

    const p = profile as unknown as ProfileDoc;
    const user = p.userId ?? null;
    const out = {
      id: (user as { _id?: { toHexString: () => string } })?._id?.toHexString?.() ?? id,
      username: user?.username ?? 'unknown',
      avatar: user?.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username ?? 'default'}`,
      verified: p.verified ?? false,
      followers: p.followers ?? 0,
      copiers: p.copiers ?? 0,
      copiedPortfolios: p.copiedPortfolios ?? 0,
      weeklyGain: p.weeklyGain ?? 0,
      yearlyGain: p.yearlyGain ?? 0,
      riskScore: p.riskScore ?? 0,
      minCopyAmount: p.minCopyAmount ?? 100,
      bio: p.bio ?? '',
      stats: {
        winRate: p.stats?.winRate ?? 0,
        avgProfit: p.stats?.avgProfit ?? 0,
        profitFactor: p.stats?.profitFactor ?? 0,
        maxDrawdown: p.stats?.maxDrawdown ?? 0,
        trades: p.stats?.trades ?? 0,
        daysActive: p.stats?.daysActive ?? 0,
      },
      recentActivity: p.recentActivity ?? [],
    };
    return NextResponse.json(out);
  } catch (e) {
    console.error('GET /api/copytraders/[id]:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
