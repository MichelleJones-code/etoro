import { NextResponse } from 'next/server';
import { connectDB, CopyTraderProfile, User } from '@/lib/db';

function toCopyTraderShape(profile: { userId: unknown; bio: string; minCopyAmount: number; riskScore: number; verified: boolean; weeklyGain: number; yearlyGain: number; followers: number; copiers: number; copiedPortfolios: number; stats: { winRate?: number; avgProfit?: number; profitFactor?: number; maxDrawdown?: number; trades?: number; daysActive?: number }; recentActivity?: Array<{ symbol: string; action: string; timestamp: string }> }, user: { _id?: { toHexString: () => string }; username?: string; avatar?: string } | null) {
  const id = user?._id?.toHexString?.() ?? (typeof profile.userId === 'object' && profile.userId && 'toHexString' in profile.userId ? (profile.userId as { toHexString: () => string }).toHexString() : '');
  return {
    id,
    username: user?.username || 'unknown',
    avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'default'}`,
    verified: profile.verified,
    followers: profile.followers ?? 0,
    copiers: profile.copiers ?? 0,
    copiedPortfolios: profile.copiedPortfolios ?? 0,
    weeklyGain: profile.weeklyGain ?? 0,
    yearlyGain: profile.yearlyGain ?? 0,
    riskScore: profile.riskScore ?? 0,
    minCopyAmount: profile.minCopyAmount ?? 100,
    bio: profile.bio,
    stats: {
      winRate: profile.stats?.winRate ?? 0,
      avgProfit: profile.stats?.avgProfit ?? 0,
      profitFactor: profile.stats?.profitFactor ?? 0,
      maxDrawdown: profile.stats?.maxDrawdown ?? 0,
      trades: profile.stats?.trades ?? 0,
      daysActive: profile.stats?.daysActive ?? 0,
    },
    recentActivity: profile.recentActivity || [],
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'yearlyGain';

    await connectDB();
    const profiles = await CopyTraderProfile.find({})
      .populate('userId', 'username avatar')
      .lean();

    let filtered = profiles;
    if (search) {
      const s = search.toLowerCase();
      filtered = profiles.filter((p) => {
        const u = p.userId as { username?: string } | null;
        return u?.username?.toLowerCase().includes(s);
      });
    }

    const withUser = filtered.map((p) => ({
      profile: p,
      user: p.userId,
    }));

    if (sort === 'yearlyGain') {
      withUser.sort((a, b) => (b.profile.yearlyGain ?? 0) - (a.profile.yearlyGain ?? 0));
    }

    const list = withUser.map(({ profile, user }) =>
      toCopyTraderShape(profile as unknown as Parameters<typeof toCopyTraderShape>[0], user as unknown as Parameters<typeof toCopyTraderShape>[1])
    );

    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/copytraders:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
