import { FXRate } from '../types';

const FX_RATES_API = 'https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS';
const FX_RATES_CACHE_KEY = 'wiremit_fx_rates';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fxRatesService = {
  // Fetch FX rates from API
  async fetchRates(): Promise<FXRate> {
    try {
      const response = await fetch(FX_RATES_API);
      if (!response.ok) {
        throw new Error('Failed to fetch FX rates');
      }
      
      const data = await response.json();
      
      // Transform the array format to a single object
      const rates: FXRate = {
        USD: 1,
        GBP: 0.74,
        ZAR: 17.75,
        USDT: 1
      };
      
      // Extract rates from the API response array format
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          if (item.USD) rates.USD = item.USD;
          if (item.GBP) rates.GBP = item.GBP;
          if (item.ZAR) rates.ZAR = item.ZAR;
          if (item.USDT) rates.USDT = item.USDT;
        });
      }
      
      // Cache the rates with timestamp
      const cacheData = {
        rates,
        timestamp: Date.now()
      };
      localStorage.setItem(FX_RATES_CACHE_KEY, JSON.stringify(cacheData));
      
      return rates;
    } catch (error) {
      console.error('Error fetching FX rates:', error);
      
      // Return cached rates if available, otherwise fallback rates
      return this.getCachedRates() || {
        USD: 1,
        GBP: 0.74,
        ZAR: 17.75,
        USDT: 1
      };
    }
  },

  // Get cached rates if still valid
  getCachedRates(): FXRate | null {
    try {
      const cached = localStorage.getItem(FX_RATES_CACHE_KEY);
      if (!cached) return null;
      
      const { rates, timestamp } = JSON.parse(cached);
      
      // Check if cache is still valid (within 5 minutes)
      if (Date.now() - timestamp < CACHE_DURATION) {
        return rates;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  },

  // Get rates with caching logic
  async getRates(): Promise<FXRate> {
    const cached = this.getCachedRates();
    if (cached) {
      return cached;
    }
    
    return this.fetchRates();
  },

  // Calculate transaction details
  calculateTransaction(amountUSD: number, targetCurrency: 'GBP' | 'ZAR', rates: FXRate) {
    const feePercentage = targetCurrency === 'GBP' ? 0.1 : 0.2; // 10% for GBP, 20% for ZAR
    const exchangeRate = rates[targetCurrency];
    
    // Calculate fee (rounded up)
    const feeUSD = Math.ceil(amountUSD * feePercentage * 100) / 100;
    
    // Calculate amount after fee
    const amountAfterFee = amountUSD - feeUSD;
    
    // Convert to target currency (rounded up)
    const recipientAmount = Math.ceil((amountAfterFee / exchangeRate) * 100) / 100;
    
    return {
      feeUSD,
      feePercentage,
      exchangeRate,
      recipientAmount,
      amountAfterFee
    };
  }
};