import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth/guards';
import {
  connectDB,
  User,
  Transaction,
  OngoingInvestment,
} from '@/lib/db';

export async function GET() {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;

  try {
    await connectDB();

    const [totalUsers, totalDepositsResult, activeInvestments, flaggedCount, recentUsers, recentActivity] =
      await Promise.all([
        User.countDocuments(),
        Transaction.aggregate([
          { $match: { type: 'deposit', status: 'completed' } },
          { $group: { _id: null, sum: { $sum: '$amount' } } },
        ]),
        OngoingInvestment.countDocuments({ status: 'active' }),
        User.countDocuments({ kycStatus: 'rejected' }),
        User.find()
          .sort({ joinDate: -1 })
          .limit(5)
          .select('_id firstName lastName email joinDate kycStatus')
          .lean(),
        Transaction.find()
          .sort({ timestamp: -1 })
          .limit(8)
          .populate('userId', 'firstName lastName')
          .lean(),
      ]);

    const totalDeposits = totalDepositsResult[0]?.sum ?? 0;

    const recentUsersList = (recentUsers as { _id: mongoose.Types.ObjectId; firstName?: string; lastName?: string; email?: string; joinDate?: string; kycStatus?: string }[]).map((u) => ({
      id: u._id.toHexString(),
      name: [u.firstName, u.lastName].filter(Boolean).join(' ') || '—',
      email: u.email || '—',
      joined: u.joinDate || '—',
      kycStatus: u.kycStatus || 'none',
    }));

    type TDoc = { _id: mongoose.Types.ObjectId; type?: string; amount?: number; description?: string; timestamp?: string; status?: string; userId?: { firstName?: string; lastName?: string } | null };
    const recentActivityList = (recentActivity as TDoc[]).map((t) => {
      const u = t.userId;
      const name = u ? [u.firstName, u.lastName].filter(Boolean).join(' ') : null;
      const msg = `${t.type || 'tx'} $${Number(t.amount || 0).toFixed(2)}${name ? ` by ${name}` : ''}`;
      return {
        id: t._id.toHexString(),
        time: t.timestamp || '—',
        msg,
        isAlert: t.type === 'withdraw' && t.status === 'pending',
      };
    });

    const systemHealth = [
      { label: 'API Services', status: 'Healthy', uptime: '99.98%' },
      { label: 'Crypto Node', status: 'Syncing', uptime: '94.12%', isWarning: true },
      { label: 'Fiat Gateway', status: 'Healthy', uptime: '100%' },
    ];

    return NextResponse.json({
      totalUsers,
      totalDeposits,
      activeInvestments,
      flaggedCount,
      recentUsers: recentUsersList,
      recentActivity: recentActivityList,
      systemHealth,
    });
  } catch (e) {
    console.error('GET /api/admin/dashboard:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
