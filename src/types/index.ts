export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: 'GBP' | 'ZAR';
  fee: number;
  exchangeRate: number;
  recipientAmount: number;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface FXRate {
  USD: number;
  GBP: number;
  ZAR: number;
  USDT: number;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
  actionUrl: string;
}