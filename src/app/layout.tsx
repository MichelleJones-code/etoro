import type { Metadata } from "next";
import { JetBrains_Mono, Raleway, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import AppFooter from "@/components/layout/AppFooter";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
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
    <html lang="en">
      <body className={`${roboto.variable} ${raleway.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
