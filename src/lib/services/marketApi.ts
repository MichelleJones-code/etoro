export interface TickerData {
  symbol: string;
  price: string;
  change: string;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

interface ApiResponse {
  data: Array<{
    symbol: string;
    price?: number;
    changePercent?: number;
    error?: string;
  }>;
}

// Fetch market data from our Next.js API route (which proxies Yahoo Finance)
async function fetchMarketDataFromAPI(symbols: string[]): Promise<ApiResponse> {
  try {
    const symbolsParam = symbols.join(',');
    const url = `/api/market?symbols=${encodeURIComponent(symbolsParam)}`;
    console.log('Fetching from API:', url);
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}):`, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching market data from API:', error);
    throw error;
  }
}

// Format price based on symbol type
function formatPrice(price: number, symbol: string): string {
  if (symbol === 'EURUSD') {
    return price.toFixed(5);
  } else if (symbol === 'BTC' || symbol === 'ETH') {
    return price.toFixed(2);
  } else if (symbol === 'OIL') {
    return price.toFixed(2);
  } else {
    return price.toFixed(2);
  }
}

// Format change percentage
function formatChange(changePercent: number): string {
  const sign = changePercent >= 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(2)}%`;
}

// Determine trend from change percentage
function getTrend(changePercent: number): 'up' | 'down' | 'neutral' {
  if (changePercent > 0) return 'up';
  if (changePercent < 0) return 'down';
  return 'neutral';
}

// Fetch ticker data for multiple symbols
export async function fetchMultipleTickerData(symbols: string[]): Promise<TickerData[]> {
  try {
    const apiResponse = await fetchMarketDataFromAPI(symbols);
    
    const results: TickerData[] = apiResponse.data
      .filter((item) => item.price !== undefined && item.changePercent !== undefined && !item.error)
      .map((item) => ({
        symbol: item.symbol,
        price: formatPrice(item.price!, item.symbol),
        change: formatChange(item.changePercent!),
        changePercent: item.changePercent!,
        trend: getTrend(item.changePercent!),
      }));

    return results;
  } catch (error) {
    console.error('Error in fetchMultipleTickerData:', error);
    return [];
  }
}

