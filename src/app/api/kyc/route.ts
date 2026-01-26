import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { requireAuth } from '@/lib/auth/guards';
import { connectDB, KYCSubmission, User } from '@/lib/db';
import mongoose from 'mongoose';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

function getExt(name: string): string {
  const i = name.lastIndexOf('.');
  if (i === -1) return '.jpg';
  const ext = name.slice(i).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
}

async function saveFile(
  file: File,
  dir: string,
  filename: string
): Promise<string> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  const ext = getExt(file.name);
  const fullName = `${filename}${ext}`;
  const filepath = path.join(dir, fullName);
  const bytes = await file.arrayBuffer();
  await writeFile(filepath, Buffer.from(bytes));
  const relative = path.relative(path.join(process.cwd(), 'public'), filepath);
  return relative.replace(/\\/g, '/');
}

export async function POST(request: Request) {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string | null;
    const lastName = formData.get('lastName') as string | null;
    const dateOfBirth = formData.get('dateOfBirth') as string | null;
    const nationality = formData.get('nationality') as string | null;
    const address = formData.get('address') as string | null;
    const city = formData.get('city') as string | null;
    const postalCode = formData.get('postalCode') as string | null;
    const country = formData.get('country') as string | null;
    const documentType = formData.get('documentType') as string | null;
    const docFront = formData.get('docFront') as File | null;
    const docBack = formData.get('docBack') as File | null;
    const selfie = formData.get('selfie') as File | null;

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !nationality ||
      !address ||
      !city ||
      !postalCode ||
      !country ||
      !documentType ||
      !['passport', 'id', 'driving'].includes(documentType)
    ) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }
    if (!docFront?.size || !selfie?.size) {
      return NextResponse.json({ error: 'docFront and selfie are required' }, { status: 400 });
    }
    if (documentType !== 'passport' && (!docBack || !docBack.size)) {
      return NextResponse.json({ error: 'docBack is required for ID and driving license' }, { status: 400 });
    }

    const baseDir = path.join(process.cwd(), 'public', 'uploads', 'kyc', result.user.id);
    await mkdir(baseDir, { recursive: true });
    const prefix = `kyc_${Date.now()}`;

    const docFrontPath = await saveFile(docFront, baseDir, `${prefix}_front`);
    let docBackPath: string | undefined;
    if (docBack?.size) {
      docBackPath = await saveFile(docBack, baseDir, `${prefix}_back`);
    }
    const selfiePath = await saveFile(selfie, baseDir, `${prefix}_selfie`);

    await connectDB();
    const sub = await KYCSubmission.create({
      userId: new mongoose.Types.ObjectId(result.user.id),
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      address,
      city,
      postalCode,
      country,
      documentType,
      docFrontPath,
      docBackPath,
      selfiePath,
      status: 'pending',
    });

    await User.findByIdAndUpdate(result.user.id, { kycStatus: 'pending' });

    const subDoc = sub as { _id: { toHexString: () => string }; status: string; submittedAt: Date };
    return NextResponse.json({
      submission: {
        id: subDoc._id.toHexString(),
        status: subDoc.status,
        submittedAt: subDoc.submittedAt,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Internal server error';
    if (msg === 'File too large' || msg === 'Invalid file type') {
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error('KYC POST error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  await connectDB();
  const sub = await KYCSubmission.findOne({ userId: new mongoose.Types.ObjectId(result.user.id) })
    .sort({ submittedAt: -1 })
    .lean();

  type SubDoc = { _id: { toHexString: () => string }; status: string; submittedAt: Date; documentType: string };
  return NextResponse.json({
    submission: sub
      ? (() => { const d = sub as unknown as SubDoc; return { id: d._id.toHexString(), status: d.status, submittedAt: d.submittedAt, documentType: d.documentType }; })()
      : null,
    kycStatus: result.user.kycStatus ?? 'none',
  });
}
