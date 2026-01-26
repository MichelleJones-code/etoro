import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth/guards';
import { connectDB, KYCSubmission } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = await requireAdmin();
  if (result instanceof NextResponse) return result;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await connectDB();
  const sub = await KYCSubmission.findById(id)
    .populate('userId', 'email username firstName lastName')
    .lean();

  if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const subDoc = sub as unknown as { _id: { toHexString: () => string }; userId?: unknown; status: string; documentType: string; firstName: string; lastName: string; dateOfBirth: string; nationality: string; address: string; city: string; postalCode: string; country: string; docFrontPath?: string; docBackPath?: string; selfiePath?: string; submittedAt?: Date };
  const u = subDoc.userId as { _id: mongoose.Types.ObjectId; email?: string; username?: string; firstName?: string; lastName?: string } | null;
  return NextResponse.json({
    id: subDoc._id.toHexString(),
    status: subDoc.status,
    documentType: subDoc.documentType,
    firstName: subDoc.firstName,
    lastName: subDoc.lastName,
    dateOfBirth: subDoc.dateOfBirth,
    nationality: subDoc.nationality,
    address: subDoc.address,
    city: subDoc.city,
    postalCode: subDoc.postalCode,
    country: subDoc.country,
    docFrontPath: subDoc.docFrontPath ? `/${subDoc.docFrontPath}` : null,
    docBackPath: subDoc.docBackPath ? `/${subDoc.docBackPath}` : null,
    selfiePath: subDoc.selfiePath ? `/${subDoc.selfiePath}` : null,
    submittedAt: subDoc.submittedAt,
    user: u
      ? {
          id: u._id.toHexString(),
          email: u.email,
          username: u.username,
          firstName: u.firstName,
          lastName: u.lastName,
          fullName: [u.firstName, u.lastName].filter(Boolean).join(' '),
        }
      : null,
  });
}
