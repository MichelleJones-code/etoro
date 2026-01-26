// Load .env if present (no dotenv dependency required)
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
const envPath = join(process.cwd(), '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

import bcrypt from 'bcryptjs';
import {
  connectDB,
  User,
  Wallet,
  InvestmentPlan,
  CopyTraderProfile,
} from '../src/lib/db';

const PLANS = [
  { name: 'Bronze', description: 'Entry-level plan with steady returns. Ideal for beginners.', roiPercent: 8, durationMonths: 6, minAmount: 500, maxAmount: 5000, riskLevel: 'low' as const },
  { name: 'Silver', description: 'Balanced growth with monthly payouts. For cautious investors.', roiPercent: 12, durationMonths: 12, minAmount: 2000, maxAmount: 20000, riskLevel: 'low' as const },
  { name: 'Gold', description: 'Higher returns with moderate risk. Suited for mid-term goals.', roiPercent: 18, durationMonths: 12, minAmount: 5000, maxAmount: 50000, riskLevel: 'medium' as const },
  { name: 'Platinum', description: 'Premium plan with competitive ROI. For experienced investors.', roiPercent: 24, durationMonths: 18, minAmount: 10000, maxAmount: 100000, riskLevel: 'medium' as const },
  { name: 'Diamond', description: 'Maximum returns with higher risk. Long-term wealth building.', roiPercent: 32, durationMonths: 24, minAmount: 25000, riskLevel: 'high' as const },
];

async function main() {
  await connectDB();

  const existingAdmin = await User.findOne({ email: 'admin@etoro.com' });
  if (!existingAdmin) {
    const hash = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@etoro.com',
      username: 'admin',
      passwordHash: hash,
      firstName: 'Admin',
      lastName: 'User',
      verified: true,
      joinDate: new Date().toISOString().split('T')[0],
      country: 'United States',
      currency: 'USD',
      isPremium: false,
      role: 'admin',
      kycStatus: 'none',
    });
    await Wallet.create({ userId: admin._id, availableBalance: 0, currency: 'USD' });
    console.log('Created admin user: admin@etoro.com / admin123');
  } else {
    console.log('Admin user already exists');
  }

  const count = await InvestmentPlan.countDocuments();
  if (count === 0) {
    await InvestmentPlan.insertMany(PLANS);
    console.log('Created investment plans: Bronze, Silver, Gold, Platinum, Diamond');
  } else {
    console.log('Investment plans already exist');
  }

  const copytraderEmails = ['copytrader1@etoro.com', 'copytrader2@etoro.com'];
  for (const email of copytraderEmails) {
    let u = await User.findOne({ email });
    if (!u) {
      const hash = await bcrypt.hash('demo123', 10);
      u = await User.create({
        email,
        username: email.replace(/@.*/, ''),
        passwordHash: hash,
        firstName: 'Copy',
        lastName: 'Trader',
        verified: true,
        joinDate: new Date().toISOString().split('T')[0],
        country: 'United States',
        currency: 'USD',
        isPremium: false,
        role: 'user',
        kycStatus: 'approved',
      });
      await Wallet.create({ userId: u._id, availableBalance: 10000, currency: 'USD' });
      console.log('Created user:', email);
    }
    const existing = await CopyTraderProfile.findOne({ userId: u._id });
    if (!existing) {
      await CopyTraderProfile.create({
        userId: u._id,
        bio: 'Experienced trader. Focus on long-term value.',
        minCopyAmount: 100,
        riskScore: 5,
        verified: true,
        weeklyGain: 1.5,
        yearlyGain: 35,
        followers: 1000,
        copiers: 50,
        copiedPortfolios: 25,
        stats: { winRate: 68, avgProfit: 12, profitFactor: 1.8, maxDrawdown: 15, trades: 200, daysActive: 365 },
        recentActivity: [
          { symbol: 'AAPL', action: 'buy', timestamp: new Date().toISOString() },
          { symbol: 'BTC', action: 'sell', timestamp: new Date().toISOString() },
        ],
      });
      console.log('Created CopyTraderProfile for', email);
    }
  }

  console.log('Seed done.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
