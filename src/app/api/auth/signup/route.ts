import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, User, Wallet } from '@/lib/db';
import { signToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/cookies';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password, firstName, lastName } = body;

    if (!email || !username || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields: email, username, password, firstName, lastName' },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return NextResponse.json(
        { error: existing.email === email ? 'Email already in use' : 'Username already in use' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const joinDate = new Date().toISOString().split('T')[0];

    const user = await User.create({
      email,
      username,
      passwordHash,
      firstName,
      lastName,
      verified: false,
      joinDate,
      country: 'United States',
      currency: 'USD',
      isPremium: false,
      role: 'user',
      kycStatus: 'none',
    });

    await Wallet.create({
      userId: user._id,
      availableBalance: 0,
      currency: 'USD',
    });

    const token = await signToken({
      userId: user._id.toHexString(),
      email: user.email,
      role: user.role ?? 'user',
    });

    const response = NextResponse.json({ user: toUserJson(user) });
    setAuthCookie(response, token);
    return response;
  } catch (e) {
    console.error('Signup error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
