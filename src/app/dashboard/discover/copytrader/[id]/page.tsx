'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  X, 
  Check, 
  MoreVertical, 
  TrendingUp, 
  TrendingDown, 
  Star,
  User,
  Users,
  Copy,
  Calendar,
  DollarSign,
  BarChart3,
  ThumbsUp
} from 'lucide-react';
import type { CopyTrader, Review, TradeHistory } from '@/lib/types';
import { CopyTraderModal } from '@/components/dashboard/sections/CopyTraderModal';
import { apiFetch } from '@/lib/api/client';

export default function CopyTraderDetailPage() {
  const params = useParams();
  const traderId = params.id as string;
  const [trader, setTrader] = useState<CopyTrader | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'trade-history' | 'reviews'>('overview');
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (!traderId) return;
    (async () => {
      setIsLoading(true);
      try {
        const [traderRes, reviewsRes, tradesRes] = await Promise.all([
          apiFetch<CopyTrader | { error?: string }>(`/api/copytraders/${traderId}`),
          apiFetch<Review[] | { error?: string }>(`/api/copytraders/${traderId}/reviews`),
          apiFetch<TradeHistory[] | { error?: string }>(`/api/copytraders/${traderId}/trades`),
        ]);
        if (traderRes.res.ok && !('error' in (traderRes.data as object))) {
          setTrader(traderRes.data as CopyTrader);
        }
        if (reviewsRes.res.ok && Array.isArray(reviewsRes.data)) {
          setReviews(reviewsRes.data);
        }
        if (tradesRes.res.ok && Array.isArray(tradesRes.data)) {
          setTradeHistory(tradesRes.data);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [traderId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (isLoading || !trader) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trader data...</p>
        </div>
      </div>
    );
  }

  const averageRating = calculateAverageRating();
  const isPositiveGain = trader.yearlyGain >= 0;

  return (
    <div className="w-full bg-white">
      {/* Breadcrumbs */}
      <div className="px-8 py-1">
        <div className="flex items-center gap-1 text-xs tracking-tight font-semibold text-gray-600">
          <Link href="/dashboard/discover" className="hover:text-gray-900 transition-colors">Discover</Link>
          <span><ChevronRight className="w-4 h-4" /></span>
          <Link href="/dashboard/discover" className="hover:text-gray-900 transition-colors">CopyTrader</Link>
          <span><ChevronRight className="w-4 h-4" /></span>
          <span className="text-gray-900 font-semibold">{trader.username}</span>
        </div>
      </div>

      {/* Trader Information Section */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
              <img 
                src={trader.avatar} 
                alt={trader.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="text-gray-600 text-2xl font-bold">${trader.username.charAt(0).toUpperCase()}</span>`;
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xl font-bold text-gray-900">{trader.username}</div>
                {trader.verified && (
                  <span className="text-blue-500 text-sm" title="Verified">✓</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{trader.copiers.toLocaleString()} copiers</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{trader.followers.toLocaleString()} followers</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <div className={`text-2xl tracking-tighter font-bold ${isPositiveGain ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveGain ? '+' : ''}{trader.yearlyGain.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500 mb-1">Yearly return</div>
              </div>
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
              onClick={() => setIsCopyModalOpen(true)}
              className="bg-[#00b00f] hover:bg-[#00a060] text-white font-semibold px-10 py-2.5 rounded-full flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Win Rate</div>
            <div className="text-lg font-bold text-gray-900">{trader.stats.winRate.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Total Trades</div>
            <div className="text-lg font-bold text-gray-900">{trader.stats.trades.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Risk Score</div>
            <div className="text-lg font-bold text-gray-900">{trader.riskScore}/10</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Days Active</div>
            <div className="text-lg font-bold text-gray-900">{trader.stats.daysActive}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-8 border-b border-gray-200">
        <div className="flex items-center w-fit mx-auto gap-8">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'trade-history', label: 'Trade History' },
            { key: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-1 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'border-gray-900 border-b-2 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="px-8 py-6">
          <div className="space-y-6">
            {/* Bio Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{trader.bio}</p>
            </div>

            {/* Performance Stats */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Average Profit</div>
                  <div className="text-xl font-bold text-gray-900">{trader.stats.avgProfit.toFixed(2)}%</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Profit Factor</div>
                  <div className="text-xl font-bold text-gray-900">{trader.stats.profitFactor.toFixed(2)}</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Max Drawdown</div>
                  <div className="text-xl font-bold text-gray-900">{trader.stats.maxDrawdown.toFixed(2)}%</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {trader.recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.action === 'buy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {activity.action === 'buy' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{activity.symbol}</div>
                        <div className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${activity.action === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.action.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trade History Tab */}
      {activeTab === 'trade-history' && (
        <div className="px-8 py-4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Symbol</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Value</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tradeHistory.map((trade) => (
                    <tr key={trade.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-900">{formatDate(trade.timestamp)}</td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">{trade.symbol}</div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          trade.action === 'buy' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.action.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-sm font-medium text-gray-900">{trade.amount.toFixed(2)}</td>
                      <td className="py-4 px-6 text-right text-sm font-medium text-gray-900">${trade.price.toFixed(2)}</td>
                      <td className="py-4 px-6 text-right text-sm font-semibold text-gray-900">${trade.totalValue.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          trade.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : trade.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="px-8 py-6">
          {/* Average Rating Header */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Average Rating</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                    <img 
                      src={review.avatar} 
                      alt={review.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `<span class="text-gray-600 text-sm font-bold">${review.username.charAt(0).toUpperCase()}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">{review.username}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{formatTimeAgo(review.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy Trader Modal */}
      <CopyTraderModal 
        isOpen={isCopyModalOpen} 
        onClose={() => setIsCopyModalOpen(false)} 
        trader={trader}
      />
    </div>
  );
}

