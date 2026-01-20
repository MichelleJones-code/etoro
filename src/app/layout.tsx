import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invest With eToro™ | Stocks, Crypto & ETFs in One Powerful App",
  description: "Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app. Copy top investors, discover new markets, and grow your portfolio with eToro.",
  keywords: ["investing", "stocks", "crypto", "ETFs", "trading", "copy trading", "eToro"],
  openGraph: {
    title: "Invest With eToro™ | Stocks, Crypto & ETFs",
    description: "Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
