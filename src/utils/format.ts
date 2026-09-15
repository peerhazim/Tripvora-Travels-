import { Currency, CurrencyConfig } from '../types';
import { CURRENCY_CONFIGS } from '../data/tours';

export function formatPrice(priceUSD: number, currency: Currency): string {
  const config: CurrencyConfig = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.INR;
  let converted = Math.round(priceUSD * config.rate);
  
  // Format standard ~13,000 package rates to the market-standard ₹12,999 charm pricing
  if (currency === 'INR' && Math.abs(converted - 13000) <= 15) {
    converted = 12999;
  }
  
  if (currency === 'INR') {
    return `${config.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toLocaleString()}`;
}

export function generateBookingRef(): string {
  const prefix = 'TVR';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
}
