import { NextResponse } from 'next/server';
import { getTokenFromRequest } from './cookies';
import { verifyToken } from './jwt';
import { connectDB, User } from '@/lib/db';

export interface AuthResult {
  user: { id: string; email: string; username: string; firstName: string; lastName: string; avatar?: string; verified: boolean; joinDate: string; country: string; currency: string; isPremium: boolean; role: string; kycStatus: string };
  tokenPayload: { userId: string; email: string; role: string };
}

function toUserJson(doc: { _id: { toHexString: () => string }; email: string; username: string; firstName: string; lastName: string; avatar?: string; verified: boolean; joinDate: string; country: string; currency: string; isPremium: boolean; role: string; kycStatus: string }) {
  return {
    id: doc._id.toHexString(),
    email: doc.email,
    username: doc.username,
    firstName: doc.firstName,
    lastName: doc.lastName,
    avatar: doc.avatar,
    verified: doc.verified,
    joinDate: doc.joinDate,
    country: doc.country,
    currency: doc.currency,
    isPremium: doc.isPremium,
    role: doc.role ?? 'user',
    kycStatus: doc.kycStatus ?? 'none',
  };
}

export async function requireAuth(): Promise<AuthResult | NextResponse> {
  const token = await getTokenFromRequest();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let tokenPayload;
  try {
    tokenPayload = await verifyToken(token);
  } catch {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(tokenPayload.userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  return {
    user: toUserJson(user),
    tokenPayload,
  };
}

export async function requireAdmin(): Promise<AuthResult | NextResponse> {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;
  if (result.tokenPayload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return result;
}
