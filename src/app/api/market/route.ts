import { NextResponse } from 'next/server';

// Symbol mapping from eToro symbols to Yahoo Finance symbols
const YAHOO_SYMBOL_MAP: Record<string, string> = {
  SPX500: '^GSPC', // S&P 500
  BTC: 'BTC-USD', // Bitcoin
  DJ30: '^DJI', // Dow Jones
  ETH: 'ETH-USD', // Ethereum
  EURUSD: 'EURUSD=X', // EUR/USD
  OIL: 'CL=F', // Crude Oil
  NSDQ100: '^NDX', // Nasdaq 100
};

// Fetch data from Yahoo Finance
async function fetchYahooFinanceData(yahooSymbol: string): Promise<{ price: number; changePercent: number } | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!response.ok) {
      console.error(`Yahoo Finance HTTP error for ${yahooSymbol}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      console.error(`Invalid Yahoo Finance response for ${yahooSymbol}`);
      return null;
    }

    const result = data.chart.result[0];
    if (!result.meta) {
      console.error(`No meta data for ${yahooSymbol}`);
      return null;
    }

    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice || meta.previousClose || meta.chartPreviousClose;
    
    if (!currentPrice) {
      console.error(`No price data for ${yahooSymbol}`);
      return null;
    }
    
    // Try to get changePercent directly from Yahoo Finance, otherwise calculate it
    let changePercent = 0;
    
    if (meta.regularMarketChangePercent !== undefined && meta.regularMarketChangePercent !== null) {
      // Use the change percent directly from Yahoo Finance (already in percentage)
      changePercent = meta.regularMarketChangePercent;
    } else if (meta.regularMarketChange !== undefined && meta.regularMarketChange !== null && currentPrice !== 0) {
      // Calculate from change amount
      changePercent = (meta.regularMarketChange / currentPrice) * 100;
    } else {
      // Fallback: calculate from previousClose
      const previousClose = meta.previousClose || meta.chartPreviousClose;
      if (previousClose && previousClose !== 0) {
        changePercent = ((currentPrice - previousClose) / previousClose) * 100;
      }
    }

    return {
      price: currentPrice,
      changePercent,
    };
  } catch (error) {
    console.error(`Error fetching Yahoo Finance data for ${yahooSymbol}:`, error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols');

    if (!symbols) {
      return NextResponse.json({ error: 'Symbols parameter is required' }, { status: 400 });
    }

    const symbolList = symbols.split(',').map(s => s.trim());
    const results = await Promise.all(
      symbolList.map(async (symbol) => {
        try {
          const yahooSymbol = YAHOO_SYMBOL_MAP[symbol];
          
          if (!yahooSymbol) {
            console.error(`No mapping found for symbol: ${symbol}`);
            return { symbol, error: 'Symbol not found' };
          }

          const data = await fetchYahooFinanceData(yahooSymbol);

          if (!data) {
            return { symbol, error: 'Failed to fetch data' };
          }

          return {
            symbol,
            price: data.price,
            changePercent: data.changePercent,
          };
        } catch (error) {
          console.error(`Error processing symbol ${symbol}:`, error);
          return { symbol, error: 'Failed to fetch data' };
        }
      })
    );

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('Error in GET /api/market:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

