'use client';

import React, { useState, useEffect } from 'react';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api/client';

interface GlobalMarketData {
  total_market_cap: { usd: number };
  market_cap_change_percentage_24h_usd: number;
}

type CopyTraderItem = { id: string; username: string; avatar: string; yearlyGain: number };

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'crypto' | 'copytrader'>('overview');
  const [cryptoCarouselIndex, setCryptoCarouselIndex] = useState(0);
  const [marketCapData, setMarketCapData] = useState<GlobalMarketData | null>(null);
  const [isLoadingMarketCap, setIsLoadingMarketCap] = useState(true);
  const [copytraders, setCopytraders] = useState<CopyTraderItem[]>([]);
  const [loadingCopytraders, setLoadingCopytraders] = useState(true);
  
  const cryptoCards = [
    { symbol: "BTC", name: "Bitcoin", price: "93031.66", change: "-2.46%", color: "bg-[#f7931a]", logo: "/dash/bitcoin.svg" },
    { symbol: "ADA", name: "Cardano", price: "0.37100", change: "-5.84%", color: "bg-[#0033ad]", logo: "/dash/cardano.svg" },
    { symbol: "ETH", name: "Ethereum", price: "3217.3600", change: "-3.67%", color: "bg-[#3c3c3d]", logo: "/dash/ethereum.svg" },
  ];

  const cryptoTabCards = [
    { symbol: "XLM", name: "Stellar", price: "0.21508", change: "-1.01%", color: "bg-gray-800", logo: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png" },
    { symbol: "SGB", name: "Songbird", price: "0.0021", change: "0%", color: "bg-purple-600", logo: "https://assets.coingecko.com/coins/images/18663/large/songbird.png" },
    { symbol: "MIOTA", name: "IOTA", price: "0.08502", change: "-1.07%", color: "bg-black", logo: "https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png" },
    { symbol: "LTC", name: "Litecoin", price: "70.68", change: "-0.86%", color: "bg-blue-600", logo: "https://assets.coingecko.com/coins/images/2/large/litecoin.png" },
    { symbol: "DOGE", name: "Dogecoin", price: "0.12862", change: "-0.75%", color: "bg-orange-400", logo: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
    { symbol: "SOL", name: "Solana", price: "142.35", change: "2.15%", color: "bg-purple-600", logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
    { symbol: "DOT", name: "Polkadot", price: "6.42", change: "-1.23%", color: "bg-pink-600", logo: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png" },
    { symbol: "MATIC", name: "Polygon", price: "0.89", change: "1.45%", color: "bg-indigo-600", logo: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png" },
    { symbol: "AVAX", name: "Avalanche", price: "34.56", change: "1.23%", color: "bg-red-600", logo: "https://assets.coingecko.com/coins/images/12559/large/avalanche-avax-logo.png" },
  ];

  const cardsPerPage = 3;
  const cryptoMaxIndex = Math.max(0, cryptoTabCards.length - cardsPerPage);
  
  const scrollCryptoToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, cryptoMaxIndex));
    setCryptoCarouselIndex(newIndex);
  };

  // Format market cap to readable format (e.g., 3.13T)
  const formatMarketCap = (value: number): string => {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    }
    return value.toFixed(2);
  };

  // Fetch global market cap data
  useEffect(() => {
    const fetchMarketCapData = async () => {
      try {
        setIsLoadingMarketCap(true);
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        setMarketCapData(data.data);
      } catch (error) {
        console.error('Error fetching market cap data:', error);
        // Fallback to default values if API fails
        setMarketCapData({
          total_market_cap: { usd: 3130000000000 },
          market_cap_change_percentage_24h_usd: -1.91
        });
      } finally {
        setIsLoadingMarketCap(false);
      }
    };

    fetchMarketCapData();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data, res } = await apiFetch<CopyTraderItem[]>('/api/copytraders');
        if (res.ok && Array.isArray(data)) setCopytraders(data);
      } finally {
        setLoadingCopytraders(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-[69rem] mx-auto pb-12 px-4 md:px-8">
      
      {/* 1. SUB-NAVIGATION */}
      <div className="sticky top-0 bg-white z-10 -mx-4 md:-mx-8 px-4 md:px-8 pt-8 mb-8">
        <nav className="flex mx-auto w-fit items-center gap-8 py-1.5 overflow-x-auto no-scrollbar">
          <SubNavLink label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          
          <SubNavLink label="Crypto" active={activeTab === 'crypto'} onClick={() => setActiveTab('crypto')} />
          
          <SubNavLink label="CopyTrader" badge="NEW" active={activeTab === 'copytrader'} onClick={() => setActiveTab('copytrader')} />
          
        </nav>
        <hr className="border-gray-200 mt-0" />
      </div>

      {/* CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'overview' && (
        <>
          {/* 2. EXPLORE MARKETS SECTION */}
          <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="flex items-center font-semibold gap-1.5 text-sm text-gray-800 tracking-tight ">
                  Investment Opportunities <Info size={14} className="cursor-help" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Explore Markets</h1>
              </div>
            </div>

            {/* Market Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cryptoCards.map((crypto, index) => (
                <MarketCard 
                  key={index}
                  symbol={crypto.symbol} 
                  name={crypto.name} 
                  price={crypto.price} 
                  change={crypto.change} 
                  color={crypto.color} 
                  logo={crypto.logo}
                />
              ))}
            </div>
          </section>

          {/* 3. COPYTRADER SECTION */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-1.5 text-2xl font-bold text-[#1e272e]">
                  CopyTrader™ <Info size={16} className="text-gray-300 cursor-help" />
                </div>
                <p className="tracking-tight font-light text-gray-700">Mirror the portfolios of other crypto investors</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-sm font-semibold tracking-tight text-gray-800 hover:text-[#1e272e] border border-gray-400 px-4 py-1.5 rounded-full">
                  View All
                </button>
                <div className="flex gap-2">
                   <CarouselButton icon={<ChevronLeft size={18} />} disabled />
                   <CarouselButton icon={<ChevronRight size={18} />} />
                </div>
              </div>
            </div>

            {/* Trader Grid */}
            {loadingCopytraders ? (
              <div className="py-8 text-center text-gray-500">Loading traders...</div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {copytraders.map((t) => (
                <TraderCard
                  key={t.id}
                  id={t.id}
                  name={t.username}
                  username={t.username}
                  image={t.avatar}
                  returnPercent={t.yearlyGain.toFixed(2)}
                />
              ))}
            </div>
            )}
          </section>
        </>
      )}

      {activeTab === 'crypto' && (
        <>
          {/* EXPLORE CRYPTO SECTION */}
          <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Explore Crypto</h1>
              <div className="flex gap-2">
                <CarouselButton 
                  icon={<ChevronLeft size={20} />} 
                  disabled={cryptoCarouselIndex === 0}
                  onClick={() => scrollCryptoToIndex(cryptoCarouselIndex - 1)}
                />
                <CarouselButton 
                  icon={<ChevronRight size={20} />} 
                  disabled={cryptoCarouselIndex >= cryptoMaxIndex}
                  onClick={() => scrollCryptoToIndex(cryptoCarouselIndex + 1)}
                />
              </div>
            </div>

            {/* Crypto Cards Carousel */}
            <div className="relative overflow-hidden">
              <div 
                className="flex gap-4 transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(calc(-${cryptoCarouselIndex} * ((100% - ${(cardsPerPage - 1) * 1}rem) / ${cardsPerPage} + 1rem)))`,
                }}
              >
                {cryptoTabCards.map((crypto, index) => (
                  <div 
                    key={index} 
                    className="shrink-0"
                    style={{ 
                      width: `calc((100% - ${(cardsPerPage - 1) * 1}rem) / ${cardsPerPage})`,
                    }}
                  >
                    <MarketCard 
                      symbol={crypto.symbol} 
                      name={crypto.name} 
                      price={crypto.price} 
                      change={crypto.change} 
                      color={crypto.color} 
                      logo={crypto.logo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BY MARKET CAP SECTION */}
          <section>
            <div className="flex justify-between items-center ">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">By Market Cap</h1>
            </div>

            {/* Market Cap Summary */}
            <div className="flex justify-between items-center -mt-1 mb-6">
              {isLoadingMarketCap ? (
                <p className="text-sm tracking-tight font-light text-gray-600">
                  Loading market data...
                </p>
              ) : marketCapData ? (
                <p className="text-sm tracking-tight font-light text-gray-600">
                  The crypto global market cap is <span className="font-semibold">{formatMarketCap(marketCapData.total_market_cap.usd)}</span>, a{' '}
                  <span className={`font-semibold ${marketCapData.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {marketCapData.market_cap_change_percentage_24h_usd >= 0 ? '+' : ''}
                    {marketCapData.market_cap_change_percentage_24h_usd.toFixed(2)}%
                  </span>{' '}
                  {marketCapData.market_cap_change_percentage_24h_usd >= 0 ? 'increase' : 'decrease'} over the last day.
                </p>
              ) : (
                <p className="text-sm tracking-tight font-light text-gray-600">
                  The crypto global market cap is <span className="font-semibold">3.13T</span>, a <span className="text-red-500 font-semibold">-1.91%</span> decrease over the last day.
                </p>
              )}
              <button className="text-sm font-semibold tracking-tight text-gray-800 hover:text-[#1e272e] border border-gray-400 px-4 py-1.5 rounded-full">
                View All
              </button>
            </div>

            {/* Crypto Table */}
            <CryptoTable />
          </section>
        </>
      )}

      {activeTab === 'copytrader' && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-2xl font-bold text-[#1e272e]">
                CopyTrader™ <Info size={16} className="text-gray-300 cursor-help" />
              </div>
              <p className="tracking-tight font-light text-gray-700">Mirror the portfolios of other crypto investors</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-semibold tracking-tight text-gray-800 hover:text-[#1e272e] border border-gray-400 px-4 py-1.5 rounded-full">
                View All
              </button>
              <div className="flex gap-2">
                 <CarouselButton icon={<ChevronLeft size={18} />} disabled />
                 <CarouselButton icon={<ChevronRight size={18} />} />
              </div>
            </div>
          </div>

          {/* Trader Grid */}
          {loadingCopytraders ? (
            <div className="py-8 text-center text-gray-500">Loading traders...</div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {copytraders.map((t) => (
              <TraderCard
                key={t.id}
                id={t.id}
                name={t.username}
                username={t.username}
                image={t.avatar}
                returnPercent={t.yearlyGain.toFixed(2)}
              />
            ))}
          </div>
          )}
        </section>
      )}
    </div>
  );
}

// UI HELPERS

function SubNavLink({ label, active = false, badge = "", onClick }: { label: string, active?: boolean, badge?: string, onClick?: () => void }) {
  return (
    <div className={`relative pb-4 cursor-pointer whitespace-nowrap group flex items-center gap-1.5`} onClick={onClick}>
      <span className={`text-sm font-semibold tracking-tight transition-colors ${active ? 'text-[#1e272e]' : 'text-[#1e272eb7] group-hover:text-gray-600'}`}>
        {label} 
      </span>
      {badge && <span className="bg-[#1c9607] text-white text-[9px] px-1.5 py-0.5 rounded-full font-semibold tracking-tighter">{badge}</span>}
      {active && <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1e272e]" />}
    </div>
  );
}

function MarketCard({ symbol, name, price, change, color, logo }: any) {
  const [logoError, setLogoError] = useState(false);
  
  // Randomly pick one of the crypto chart images based on symbol (deterministic per symbol)
  const chartImages = ['/dash/cryptochart.png', '/dash/cryptochart2.png', '/dash/cryptochart3.png'];
  // Use symbol to create a deterministic "random" selection
  const chartIndex = symbol.charCodeAt(0) % chartImages.length;
  const randomChart = chartImages[chartIndex];
  
  // Generic crypto logo fallback - using a simple circular design with the symbol's first letter
  const genericCryptoLogo = (
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-20 opacity-80 z-0 flex items-center justify-center">
      <div className="w-full h-full rounded-full border-4 border-white flex items-center justify-center">
        <span className="text-5xl font-bold text-white">{symbol.charAt(0)}</span>
      </div>
    </div>
  );
  
  return (
    <Link href={`/dashboard/discover/crypto/${symbol}`}>
      <div className={`${color} rounded-lg p-6 h-[220px] relative overflow-hidden flex flex-col justify-end text-white cursor-pointer hover:brightness-110 transition-all`}>
        {/* Chart background image */}
        <img 
          src={randomChart} 
          className="absolute bottom-5 left-0 w-full   opacity-70" 
          alt="" 
        />
        
        {/* Large faint logo in background - centered */}
        {!logo || logoError ? (
          genericCryptoLogo
        ) : (
          <img 
            src={logo} 
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 opacity-80 z-0" 
            style={{
              filter: 'brightness(0) invert(1)',
            }}
            alt="" 
            onError={() => setLogoError(true)}
          />
        )}
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
          <div className="text-lg font-bold mb-0.5 ">{symbol}</div>
          <div className="font-light opacity-80 ">{name}</div>
          </div>
          <div className='text-right'>
          <div className="text-2xl font-semibold tracking-tight">{price}</div>
          <div className="text-sm font-light opacity-90">{change}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TraderCard({ name, username, image, returnPercent, id }: { name: string, username: string, image: string, returnPercent: string, id?: string }) {
  // Use provided id or generate one from username (matching mock data pattern)
  const traderId = id || (username ? generateTraderIdFromUsername(username) : '1');
  
  return (
    <Link href={`/dashboard/discover/copytrader/${traderId}`} className="block">
      <div className="bg-white rounded-lg py-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer relative">
        {/* Profile Picture - Square with rounded corners, centered */}
        <div className="flex justify-center mb-3">
          <div className="w-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Name and Username - Centered */}
        <div className="text-center -mt-1">
          <div className="tracking-tight font-bold ">{name}</div>
          <div className="text-sm tracking-tight font-light -mt-1.5 text-gray-500">@{username}</div>
        </div>

        {/* Line Graph - Light green, horizontal span */}
        <div className="mb-6 -mt-4 h-20 w-full relative">
          <img src="/dash/greenchart.png" alt="Performance chart" className="w-full  " />
        </div>

        {/* Bottom Section: Return % on left, Copy button on right */}
        <div className="flex items-end justify-between px-4">
          {/* Return Percentage */}
          <div className=''>
            <div className="text-2xl font-semibold tracking-tight text-[#0eba25] leading-none mb-1">{returnPercent}%</div>
            <div className="text-xs text-gray-400">Return (12M)</div>
          </div>

          {/* Copy Button - styled as button but part of card link */}
          <span className="px-5 py-2 rounded-full border border-[#00b066]! bg-white text-[#00b066] font-semibold text-sm hover:bg-[#00b066] hover:text-white transition-colors inline-block cursor-pointer">
            Copy
          </span>
        </div>
      </div>
    </Link>
  );
}

// Helper: fallback trader ID when API does not provide id (e.g. from cached or legacy data)
function generateTraderIdFromUsername(username: string): string {
  const usernameToId: Record<string, string> = {
    'ESDRASVasquez': '1',
    'JeppeKirkBonde': '2',
    'CPHequities': '3',
    'Wesl3y': '4',
    'Rubymza': '5',
    'BalanceInvesting': '6',
  };
  
  return usernameToId[username] || '1';
}

function CarouselButton({ icon, disabled = false, onClick }: { icon: React.ReactNode, disabled?: boolean, onClick?: () => void }) {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-600'
      }`}
    >
      {icon}
    </button>
  );
}

function CryptoCard({ symbol, name, price, change, logo, bgColor, textColor, showGraph, graphColor = "gray" }: {
  symbol: string;
  name: string;
  price: string;
  change: string;
  logo: React.ReactNode;
  bgColor: string;
  textColor: string;
  showGraph: boolean;
  graphColor?: "gray" | "blue";
}) {
  const isNegative = change.startsWith('-');
  const isNeutral = change === '0%';

  // Generate simple graph data for display - decreasing trend
  const graphPoints = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 100;
    const y = 40 - (i / 19) * 10 + Math.sin(i * 0.2) * 3;
    return `${x},${Math.max(20, Math.min(80, y))}`;
  }).join(' L ');

  const textColorClass = textColor === "text-white" ? "text-white" : "text-gray-900";

  return (
    <div className={`${bgColor} rounded-lg p-6 h-[180px] relative overflow-hidden flex flex-col justify-between ${textColorClass} cursor-pointer hover:brightness-110 transition-all border border-gray-200`}>
      {/* Logo */}
      <div className="mb-2">{logo}</div>
      
      {/* Bottom Section */}
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className={`text-sm font-bold mb-1 ${textColorClass}`}>{symbol} {name}</div>
            <div className={`text-lg font-bold ${textColorClass}`}>{price}</div>
          </div>
          <div className={`text-sm font-semibold ${isNeutral ? textColorClass : isNegative ? 'text-red-500' : 'text-green-500'}`}>
            {change}
          </div>
        </div>
        
        {/* Graph */}
        {showGraph && (
          <div className="h-8 w-full mt-2">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none" style={{ height: '32px' }}>
              <path
                d={`M ${graphPoints}`}
                fill="none"
                stroke={graphColor === "blue" ? "#60a5fa" : "#6b7280"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function CryptoTable() {
  const cryptos = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      logo: "B",
      logoColor: "bg-yellow-400",
      price: "92302.29",
      change: "-0.72%",
      marketCap: "1.85T",
      volume: "39.2B",
      volumePercent: "31.84%",
      signal: "HOLD",
      signalCount: "4/8 Indicators",
      showGraph: true
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      logo: "◆",
      logoColor: "bg-gray-700",
      price: "3174.5900",
      change: "-1.19%",
      marketCap: "384.61B",
      volume: "27.96B",
      volumePercent: "22.71%",
      signal: "HOLD",
      signalCount: "4/8 Indicators",
      showGraph: true
    },
    {
      symbol: "USDC",
      name: "USDC",
      logo: "$",
      logoColor: "bg-blue-500",
      price: "0.9997",
      change: "0.00%",
      marketCap: "75.82B",
      volume: "14.83B",
      volumePercent: "12.04%",
      signal: "N/A",
      signalCount: "0/0 Indicators",
      showGraph: false
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      logo: "🐕",
      logoColor: "bg-orange-300",
      price: "0.12862",
      change: "-0.75%",
      marketCap: "21.73B",
      volume: "1.91B",
      volumePercent: "1.56%",
      signal: "BUY",
      signalCount: "5/8 Indicators",
      showGraph: true
    },
    {
      symbol: "ADA",
      name: "Cardano",
      logo: "A",
      logoColor: "bg-blue-300",
      price: "0.36850",
      change: "-0.54%",
      marketCap: "13.34B",
      volume: "989.77M",
      volumePercent: "0.80%",
      signal: "HOLD",
      signalCount: "5/8 Indicators",
      showGraph: true
    }
  ];

  // Generate graph data
  const graphPoints = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 100;
    const y = 60 + Math.sin(i * 0.4) * 15;
    return `${x},${y}`;
  }).join(' L ');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Coin</th>
              <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Last 7 Days</th>
              <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center gap-1 justify-end">
                  Market Cap <Info size={12} className="text-gray-400 cursor-help" />
                </div>
              </th>
              <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center gap-1 justify-end">
                  Volume (24H) <Info size={12} className="text-gray-400 cursor-help" />
                </div>
              </th>
              <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Signal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cryptos.map((crypto) => (
              <tr key={crypto.symbol} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${crypto.logoColor} flex items-center justify-center text-white font-bold text-sm`}>
                      {crypto.logo}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{crypto.symbol}</div>
                      <div className="text-xs text-gray-500">{crypto.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-semibold text-gray-900">{crypto.price}</div>
                  <div className={`text-xs font-medium ${crypto.change.startsWith('-') ? 'text-red-500' : crypto.change === '0.00%' ? 'text-gray-500' : 'text-green-500'}`}>
                    {crypto.change}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  {crypto.showGraph ? (
                    <div className="h-10 w-24 ml-auto">
                      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                        <path
                          d={`M ${graphPoints}`}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>
                <td className="py-4 px-6 text-right text-gray-900 font-medium">{crypto.marketCap}</td>
                <td className="py-4 px-6 text-right">
                  <div className="text-gray-900 font-medium">{crypto.volume}</div>
                  <div className="text-xs text-green-600 font-medium">{crypto.volumePercent}</div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="font-semibold text-gray-900">{crypto.signal}</div>
                  <div className="text-xs text-gray-500">{crypto.signalCount}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}