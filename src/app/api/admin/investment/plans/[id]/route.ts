import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth/guards';
import { connectDB, InvestmentPlan, OngoingInvestment } from '@/lib/db';

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    await connectDB();
    const plan = await InvestmentPlan.findById(id).lean();
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    return NextResponse.json(toPlanJson(plan as unknown as PlanDoc));
  } catch (e) {
    console.error('GET /api/admin/investment/plans/[id]:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const updates: Record<string, unknown> = {};
    if (body.name != null) updates.name = String(body.name).trim();
    if (body.description != null) updates.description = String(body.description).trim();
    if (body.roiPercent != null) {
      const v = Number(body.roiPercent);
      if (!Number.isFinite(v)) return NextResponse.json({ error: 'roiPercent must be a number' }, { status: 400 });
      updates.roiPercent = v;
    }
    if (body.durationMonths != null) {
      const v = Number(body.durationMonths);
      if (!Number.isFinite(v) || v < 1) return NextResponse.json({ error: 'durationMonths must be >= 1' }, { status: 400 });
      updates.durationMonths = v;
    }
    if (body.minAmount != null) {
      const v = Number(body.minAmount);
      if (!Number.isFinite(v) || v < 0) return NextResponse.json({ error: 'minAmount must be >= 0' }, { status: 400 });
      updates.minAmount = v;
    }
    if (body.maxAmount !== undefined) {
      if (body.maxAmount == null) updates.maxAmount = undefined;
      else {
        const v = Number(body.maxAmount);
        if (!Number.isFinite(v) || v < 0) return NextResponse.json({ error: 'maxAmount must be a number >= 0' }, { status: 400 });
        updates.maxAmount = v;
      }
    }
    if (body.riskLevel !== undefined) {
      updates.riskLevel = ['low', 'medium', 'high'].includes(String(body.riskLevel)) ? body.riskLevel : undefined;
    }

    await connectDB();
    const plan = await InvestmentPlan.findByIdAndUpdate(id, { $set: updates }, { new: true }).lean();
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    return NextResponse.json(toPlanJson(plan as unknown as PlanDoc));
  } catch (e) {
    console.error('PUT /api/admin/investment/plans/[id]:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    await connectDB();
    const objId = new mongoose.Types.ObjectId(id);
    const inUse = await OngoingInvestment.exists({ planId: objId });
    if (inUse) {
      return NextResponse.json({ error: 'Cannot delete plan: it has ongoing investments' }, { status: 409 });
    }
    const deleted = await InvestmentPlan.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/admin/investment/plans/[id]:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
