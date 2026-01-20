'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Search, Bell, Check, MoreVertical, TrendingUp, TrendingDown, Crown, Maximize2, Share2, Settings, ArrowRight, ChevronRight, X, RotateCcw, Coins } from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  open: number;
}

export default function CryptoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = (params.symbol as string)?.toUpperCase();
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'chart' | 'analysis' | 'news' | 'financials'>('chart');
  const [timeframe, setTimeframe] = useState('1D');
  const [isWatched, setIsWatched] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('10');

  // CoinGecko ID mapping for symbols
  const symbolToId: Record<string, string> = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'ADA': 'cardano',
    'XLM': 'stellar',
    'SGB': 'songbird',
    'MIOTA': 'iota',
    'LTC': 'litecoin',
    'DOGE': 'dogecoin',
    'SOL': 'solana',
    'DOT': 'polkadot',
    'MATIC': 'polygon',
    'AVAX': 'avalanche-2',
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setIsLoading(true);
        const coinId = symbolToId[symbol] || symbol.toLowerCase();
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        const data = await response.json();
        
        setCryptoData({
          id: data.id,
          symbol: data.symbol.toUpperCase(),
          name: data.name,
          image: data.image.large,
          current_price: data.market_data.current_price.usd,
          price_change_24h: data.market_data.price_change_24h_in_currency.usd,
          price_change_percentage_24h: data.market_data.price_change_percentage_24h_in_currency.usd,
          market_cap: data.market_data.market_cap.usd,
          total_volume: data.market_data.total_volume.usd,
          high_24h: data.market_data.high_24h.usd,
          low_24h: data.market_data.low_24h.usd,
          open: data.market_data.current_price.usd - data.market_data.price_change_24h_in_currency.usd,
        });
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) {
      fetchCryptoData();
    }
  }, [symbol]);

  // TradingView Widget Integration
  useEffect(() => {
    if (activeTab === 'chart' && cryptoData) {
      // Clean up previous widget
      const container = document.getElementById('tradingview_widget');
      if (container) {
        container.innerHTML = '';
      }

      // Map timeframe to TradingView interval
      const intervalMap: Record<string, string> = {
        '1D': 'D',
        '1W': 'W',
        '1M': 'M',
        '3M': '3M',
        '6M': '6M',
        '1Y': '12M',
        'ALL': 'ALL',
      };

      // Map symbol to TradingView format (try BINANCE first, fallback to COINBASE)
      const chartSymbol = symbol === 'BTC' ? 'BINANCE:BTCUSDT' : 
                         symbol === 'ETH' ? 'BINANCE:ETHUSDT' :
                         `BINANCE:${symbol}USDT`;

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: chartSymbol,
        interval: intervalMap[timeframe] || 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        hide_side_toolbar: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: 'https://www.tradingview.com',
        container_id: 'tradingview_widget',
      });

      if (container) {
        container.appendChild(script);
      }

      return () => {
        if (container) {
          container.innerHTML = '';
        }
      };
    }
  }, [activeTab, cryptoData, timeframe, symbol]);

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
  };

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const formatPercentage = (percentage: number): string => {
    const sign = percentage >= 0 ? '+' : '';
    return `(${sign}${percentage.toFixed(2)}%)`;
  };

  if (isLoading || !cryptoData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {symbol} data...</p>
        </div>
      </div>
    );
  }

  const isPositive = cryptoData.price_change_percentage_24h >= 0;
  const buyPrice = cryptoData.current_price + 0.01;
  const sellPrice = cryptoData.current_price;

  return (
    <div className="w-full bg-white">
      

      {/* Breadcrumbs */}
      <div className="px-8 py-1">
        <div className="flex items-center gap-1 text-xs tracking-tight font-semibold text-gray-600">
          <Link href="/dashboard/discover" className="hover:text-gray-900 transition-colors">Discover</Link>
            <span><ChevronRight className="w-4 h-4" /></span>
          <Link href="/dashboard/discover" className="hover:text-gray-900 transition-colors">Crypto</Link>
          <span><ChevronRight className="w-4 h-4" /></span>
          <span className="text-gray-900">Coins</span>
          <span><ChevronRight className="w-4 h-4" /></span>
          <span className="text-gray-900 font-semibold">{symbol}</span>
        </div>
      </div>

      {/* Asset Information Section */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#f7931a] flex items-center justify-center shrink-0">
              <img 
                src={cryptoData.image} 
                alt={cryptoData.name}
                className="w-12 h-12 rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="text-white text-2xl font-bold">${symbol.charAt(0)}</span>`;
                  }
                }}
              />
            </div>
            <div>
             
              <div className="text-sm text-gray-600 mb-1">{cryptoData.symbol} • {cryptoData.name}</div>
              <div className="flex items-end gap-2">
              <div className="text-3xl tracking-tighter font-bold text-gray-900 ">{formatPrice(cryptoData.current_price)}</div>
              <div className={`text-xs mb-1 tracking-tight ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {formatChange(cryptoData.price_change_24h)} {formatPercentage(cryptoData.price_change_percentage_24h)}
              </div>
              </div>
              
              
              <div className="text-xs text-gray-500 ">Market is open • PRICES BY eToro, IN USD</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWatched(!isWatched)}
              className={`p-2 rounded-lg border ${isWatched ? 'bg-green-50 border-green-200 text-green-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <Check className={`h-5 w-5 ${isWatched ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setIsTradeModalOpen(true)}
              className="bg-[#00b00f] hover:bg-[#00a060] text-white font-semibold px-10 py-2.5 rounded-full"
            >
              Trade
            </button>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-8 border-b  border-gray-200">
        <div className="flex items-center w-fit mx-auto gap-8">
          {['Overview', 'Chart', 'Analysis'].map((tab) => (
            <button
              key={tab.toLowerCase()}
              onClick={() => setActiveTab(tab.toLowerCase() as any)}
              className={`py-4 px-1 text-sm font-semibold  transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'border-gray-900 border-b-2 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      {activeTab === 'chart' && (
        <div className="px-8 py-4">
          {/* Chart Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white appearance-none pr-8 cursor-pointer hover:bg-gray-50"
                >
                  {['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'].map((tf) => (
                    <option key={tf} value={tf}>{tf}</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Crown className="h-4 w-4" />
                ProCharts
              </button>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100">S {formatPrice(sellPrice)}</button>
                <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full hover:bg-green-100">B {formatPrice(buyPrice)}</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors" title="Settings">
                <Settings className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors" title="Fullscreen">
                <Maximize2 className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors" title="Share">
                <Share2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>


          {/* TradingView Chart */}
          <div className="border h-fit border-gray-200 rounded-lg overflow-hidden bg-white" style={{ height: '400px' }}>
            <div id="tradingview_widget" style={{ width: '100%', height: '100%' }}></div>
          </div>

          {/* Chart Footer */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Chart data is indicative and shows eToro's bid price
          </div>
        </div>
      )}

      {/* Other Tabs Content */}
      {activeTab !== 'chart' && (
        <div className="px-8 py-12 text-center text-gray-500">
          <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...</p>
        </div>
      )}

      {/* Trade Modal */}
      {isTradeModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-gradient-to-b from-black/70 via-black/70 to-black  backdrop-brightness-50 ">
          <div className="bg-white max-w-[39rem] rounded-lg shadow-2xl overflow-auto">
            {/* Header */}
            <div className="px-7 pt-10 w-full flex justify-end">
              
              <button 
                onClick={() => setIsTradeModalOpen(false)}
                className="text-gray-400  hover:text-gray-600  transition-colors"
              >
                <X className='' size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6 px-20">
            <h2 className="text-xl mb-8 text-center font-light tracking-tight text-gray-900">How much money would you like to invest?</h2>
              {/* Amount Input */}
              <div className="space-y-2">
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 tracking-tight font-light">Amount</span>
                  <input 
                    type="text" 
                    value={`$ ${tradeAmount}`}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9.]/g, '');
                      setTradeAmount(rawValue || '10');
                    }}
                    onFocus={(e) => {
                      if (tradeAmount === '10') {
                        setTradeAmount('');
                      }
                    }}
                    onBlur={(e) => {
                      if (!tradeAmount || tradeAmount === '') {
                        setTradeAmount('10');
                      }
                    }}
                    className="w-full text-right border border-red-500 rounded-md py-3 pl-20 pr-4 text-lg font-semibold text-gray-900 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none"
                    placeholder="$ 10"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-red-600 font-light tracking-tight">Deposit ${tradeAmount || '10'} in order to open this trade</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {((parseFloat(tradeAmount) || 10) / cryptoData.current_price).toFixed(4)} Units
                    </span>
                    <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors">
                      <RotateCcw className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

             
            

              {/* Asset Details */}
              <div className="flex items-center pt-4 pb-2 gap-2">
                <div className="w-10 h-10 rounded-sm bg-[#f7931a] flex items-center justify-center shrink-0">
                  <img 
                    src={cryptoData.image} 
                    alt={cryptoData.name}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<span class="text-white text-sm font-bold">${symbol.charAt(0)}</span>`;
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                  <div className=" font-semibold text-gray-900">{cryptoData.symbol} </div>
                  <div className="text-sm font-light -mt-1 text-gray-500">{cryptoData.name}</div>
                  </div>
                  <div className="">
                    <span className="tracking-tight text-gray-900">${formatPrice(cryptoData.current_price)}</span>
                    <div className={`flex items-center ml-auto w-fit  gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? ( 
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="text-xs tracking-tight text-right ">
                        {formatPercentage(cryptoData.price_change_percentage_24h)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Type */}
              <div className="gap-y-2 flex items-center justify-between mb-5">
                <label className="tracking-tight font-light  text-gray-900 ">Order Type</label>
                <select className=" rounded-md tracking-tight  text-gray-900 bg-white cursor-pointer">
                  <option>Market Order</option>
                  <option>Limit Order</option>
                  <option>Stop Order</option>
                </select>
              </div>

              <hr className=" border-gray-200 " />

              {/* Available Funds */}
              <div className="flex items-center justify-between -mt-2 ">
                <span className="tracking-tight font-light  text-gray-900 ">Available USD</span>
                <span className="text-right  tracking-tight  text-gray-900">$0.00</span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 pb-24 ">
              <button className="px-20 mx-auto  bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2  text-base">
                <Coins className="h-5 w-5" />
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

