import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, User } from '@/lib/db';
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
    const { emailOrUsername, password } = body;

    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { error: 'Missing emailOrUsername or password' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email/username or password' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email/username or password' }, { status: 401 });
    }

    const token = await signToken({
      userId: user._id.toHexString(),
      email: user.email,
      role: user.role ?? 'user',
    });

    const response = NextResponse.json({ user: toUserJson(user) });
    setAuthCookie(response, token);
    return response;
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
