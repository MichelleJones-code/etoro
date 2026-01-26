import * as jose from 'jose';

const SECRET = process.env.JWT_SECRET ?? 'fallback-dev-secret-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  const secret = new TextEncoder().encode(SECRET);
  return new jose.SignJWT(payload as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(SECRET);
  const { payload } = await jose.jwtVerify(token, secret);
  return payload as unknown as JWTPayload;
}
