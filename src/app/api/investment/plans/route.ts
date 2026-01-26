import { NextResponse } from 'next/server';
import { connectDB, InvestmentPlan } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const plans = await InvestmentPlan.find({}).lean();
    const list = plans.map((p) => {
      const d = p as unknown as { _id: { toHexString: () => string }; name: string; description: string; roiPercent: number; durationMonths: number; minAmount: number; maxAmount?: number; riskLevel?: string };
      return {
      id: d._id.toHexString(),
      name: d.name,
      description: d.description,
      roiPercent: d.roiPercent,
      durationMonths: d.durationMonths,
      minAmount: d.minAmount,
      maxAmount: d.maxAmount,
      riskLevel: d.riskLevel,
    };
    });
    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/investment/plans:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
