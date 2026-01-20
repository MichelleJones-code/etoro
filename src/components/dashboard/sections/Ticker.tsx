'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { fetchMultipleTickerData, type TickerData } from '@/lib/services/marketApi';

interface TickerItemProps {
  symbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  changePercent: number;
}

// Get random chart image based on trend
const getChartImage = (trend: 'up' | 'down' | 'neutral', symbol: string, changePercent: number): string | null => {
  // Use symbol-based hash for consistent image per symbol (but still random)
  const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Show green chart for up or neutral with positive/zero change
  if (trend === 'up' || (trend === 'neutral' && changePercent >= 0)) {
    const greenImages = ['green.png', 'green2.png', 'green3.png'];
    const index = hash % greenImages.length;
    return `/dash/${greenImages[index]}`;
  } 
  // Show red chart for down or neutral with negative change
  else if (trend === 'down' || (trend === 'neutral' && changePercent < 0)) {
    const redImages = ['red.png', 'red2.png', 'red3.png'];
    const index = hash % redImages.length;
    return `/dash/${redImages[index]}`;
  }
  
  return null;
};

const TickerItem = ({ symbol, price, change, trend, changePercent }: TickerItemProps) => {
  const isUp = trend === 'up' || (trend === 'neutral' && changePercent >= 0);
  const isDown = trend === 'down' || (trend === 'neutral' && changePercent < 0);
  
  // Color logic based on eToro's UI
  const colorClass = isUp ? 'text-[#46b445]' : isDown ? 'text-[#ff4a4a]' : 'text-gray-500';
  const bgGradient = isUp ? 'from-green-50/50' : isDown ? 'from-red-50/50' : 'from-transparent';
  
  const chartImage = useMemo(() => getChartImage(trend, symbol, changePercent), [trend, symbol, changePercent]);

  return (
    <div className={`flex items-end justify-between gap-3 min-w-[200px] px-4 py-2 border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group`}>
      {/* Small trend sparkline-style background indicator */}
      <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      {/* Left side: Symbol, Price, Change */}
      <div className="flex flex-col flex-1">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-tight ">
          {symbol}
        </div>
        
        <div className="text-lg tracking-tighter leading-tight font-bold text-[#1e272e]">
          {price}
        </div>
        
        <div className={`text-[11px] mt-1 font-light ${colorClass}`}>
          {change}
        </div>
      </div>
      
      {/* Right side: Chart Image (aligned to bottom) */}
      {chartImage && (
        <div className="shrink-0 ml-3 mb-1">
          <img 
            src={chartImage} 
            alt={trend === 'up' ? 'Up trend' : 'Down trend'} 
            className="object-contain w-14"
          />
        </div>
      )}
    </div>
  );
};

export const Ticker = () => {
  const symbols = ['SPX500', 'BTC', 'DJ30', 'ETH', 'EURUSD', 'OIL', 'NSDQ100'];
  
  // Initialize with fallback data so something always displays
  const getFallbackData = (): TickerData[] => {
    // Sample fallback data with prices, changes, and trends
    const fallbackData: Record<string, { price: string; changePercent: number; trend: 'up' | 'down' | 'neutral' }> = {
      SPX500: { price: '6879.87', changePercent: -0.87, trend: 'down' },
      BTC: { price: '92281.41', changePercent: -3.25, trend: 'down' },
      DJ30: { price: '48986.15', changePercent: -0.72, trend: 'down' },
      ETH: { price: '3198.62', changePercent: -4.24, trend: 'down' },
      EURUSD: { price: '1.16264', changePercent: 0.24, trend: 'up' },
      OIL: { price: '59.28', changePercent: 0, trend: 'neutral' },
      NSDQ100: { price: '21042.10', changePercent: 1.12, trend: 'up' },
    };

    return symbols.map(symbol => {
      const data = fallbackData[symbol] || { price: '--', changePercent: 0, trend: 'neutral' as const };
      const sign = data.changePercent >= 0 ? '+' : '';
      return {
        symbol,
        price: data.price,
        change: `${sign}${data.changePercent.toFixed(2)}%`,
        changePercent: data.changePercent,
        trend: data.trend,
      };
    });
  };

  const [marketData, setMarketData] = useState<TickerData[]>(getFallbackData());
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching market data for symbols:', symbols);
      const data = await fetchMultipleTickerData(symbols);
      console.log('Received market data:', data);
      if (data.length > 0) {
        setMarketData(data);
      } else {
        console.warn('No market data received, keeping existing data');
      }
    } catch (err) {
      console.error('Error fetching market data:', err);
      // Keep existing data on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate data for seamless infinite scroll
  const duplicatedData = [...marketData, ...marketData];

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling ticker */}
      <div className="flex items-center animate-ticker-scroll">
        {duplicatedData.map((item, index) => (
          <TickerItem key={`${item.symbol}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};