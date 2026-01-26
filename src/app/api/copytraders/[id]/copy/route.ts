import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAuth } from '@/lib/auth/guards';
import {
  connectDB,
  CopyTraderProfile,
  CopyRelationship,
  Wallet,
  Transaction,
} from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  const { id: masterIdParam } = await params;
  if (!masterIdParam) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  let body: { amount?: number; allocationPercent?: number; autoCopy?: boolean; copyOpenPositions?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const amount = Number(body?.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
  }

  const allocationPercent = Number(body?.allocationPercent);
  const alloc = Number.isFinite(allocationPercent) && allocationPercent >= 1 && allocationPercent <= 100
    ? allocationPercent
    : 10;
  const autoCopy = body?.autoCopy !== false;
  const copyOpenPositions = body?.copyOpenPositions === true;

  const masterId = new mongoose.Types.ObjectId(masterIdParam);
  const copierId = new mongoose.Types.ObjectId(result.user.id);

  await connectDB();

  const profile = await CopyTraderProfile.findOne({ userId: masterId });
  if (!profile) return NextResponse.json({ error: 'Copy trader not found' }, { status: 404 });
  if (amount < (profile.minCopyAmount ?? 0)) {
    return NextResponse.json({ error: `Minimum copy amount is ${profile.minCopyAmount}` }, { status: 400 });
  }

  const wallet = await Wallet.findOne({ userId: copierId });
  if (!wallet) return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
  if (wallet.availableBalance < amount) {
    return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
  }

  const rel = await CopyRelationship.create({
    copierId,
    masterId,
    amount,
    allocationPercent: alloc,
    autoCopy,
    copyOpenPositions,
    status: 'active',
  });

  wallet.availableBalance -= amount;
  await wallet.save();

  await Transaction.create({
    userId: copierId,
    type: 'buy',
    amount,
    currency: wallet.currency,
    description: `Copy trade allocation`,
    timestamp: new Date().toISOString(),
    status: 'completed',
  });

  return NextResponse.json({
    relationship: {
      id: rel._id.toHexString(),
      amount: rel.amount,
      allocationPercent: rel.allocationPercent,
      status: rel.status,
    },
  });
}
