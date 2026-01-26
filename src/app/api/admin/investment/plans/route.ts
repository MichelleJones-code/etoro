import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/guards';
import { connectDB, InvestmentPlan } from '@/lib/db';

type PlanDoc = { _id: { toHexString: () => string }; name: string; description: string; roiPercent: number; durationMonths: number; minAmount: number; maxAmount?: number; riskLevel?: string };

function toPlanJson(d: PlanDoc) {
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
}

export async function GET() {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  try {
    await connectDB();
    const plans = await InvestmentPlan.find({}).lean();
    const list = plans.map((p) => toPlanJson(p as unknown as PlanDoc));
    return NextResponse.json(list);
  } catch (e) {
    console.error('GET /api/admin/investment/plans:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  try {
    const body = await request.json();
    const { name, description, roiPercent, durationMonths, minAmount, maxAmount, riskLevel } = body;
    if (!name || typeof name !== 'string' || !description || typeof description !== 'string') {
      return NextResponse.json({ error: 'name and description are required' }, { status: 400 });
    }
    const roi = Number(roiPercent);
    const dur = Number(durationMonths);
    const min = Number(minAmount);
    if (!Number.isFinite(roi) || !Number.isFinite(dur) || !Number.isFinite(min) || min < 0) {
      return NextResponse.json({ error: 'roiPercent, durationMonths, and minAmount must be valid numbers' }, { status: 400 });
    }
    const max = maxAmount != null ? Number(maxAmount) : undefined;
    if (max != null && (!Number.isFinite(max) || max < min)) {
      return NextResponse.json({ error: 'maxAmount must be a number >= minAmount' }, { status: 400 });
    }
    const validRisk = ['low', 'medium', 'high'].includes(riskLevel) ? riskLevel : undefined;

    await connectDB();
    const plan = await InvestmentPlan.create({
      name: String(name).trim(),
      description: String(description).trim(),
      roiPercent: roi,
      durationMonths: dur,
      minAmount: min,
      maxAmount: max,
      riskLevel: validRisk,
    });
    return NextResponse.json(toPlanJson(plan as unknown as PlanDoc));
  } catch (e) {
    console.error('POST /api/admin/investment/plans:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
