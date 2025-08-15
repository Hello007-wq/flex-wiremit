import { Transaction } from '../types';

const TRANSACTIONS_KEY = 'wiremit_transactions';

// Mock transaction data
const mockTransactions: Omit<Transaction, 'userId'>[] = [
  {
    id: '1',
    amount: 500,
    currency: 'GBP',
    fee: 50,
    exchangeRate: 0.74,
    recipientAmount: 608.11,
    recipient: 'John Smith - University of Oxford',
    status: 'completed',
    createdAt: '2024-12-15T10:30:00Z'
  },
  {
    id: '2',
    amount: 300,
    currency: 'ZAR',
    fee: 60,
    exchangeRate: 17.75,
    recipientAmount: 13.52,
    recipient: 'Mary Johnson - University of Cape Town',
    status: 'completed',
    createdAt: '2024-12-14T15:45:00Z'
  },
  {
    id: '3',
    amount: 750,
    currency: 'GBP',
    fee: 75,
    exchangeRate: 0.74,
    recipientAmount: 912.16,
    recipient: 'David Wilson - Imperial College London',
    status: 'pending',
    createdAt: '2024-12-13T09:15:00Z'
  },
  {
    id: '4',
    amount: 200,
    currency: 'ZAR',
    fee: 40,
    exchangeRate: 17.75,
    recipientAmount: 9.01,
    recipient: 'Sarah Brown - Stellenbosch University',
    status: 'completed',
    createdAt: '2024-12-12T14:20:00Z'
  },
  {
    id: '5',
    amount: 1000,
    currency: 'GBP',
    fee: 100,
    exchangeRate: 0.74,
    recipientAmount: 1216.22,
    recipient: 'Michael Davis - Cambridge University',
    status: 'completed',
    createdAt: '2024-12-11T11:00:00Z'
  },
  {
    id: '6',
    amount: 450,
    currency: 'ZAR',
    fee: 90,
    exchangeRate: 17.75,
    recipientAmount: 20.28,
    recipient: 'Lisa Garcia - University of Witwatersrand',
    status: 'failed',
    createdAt: '2024-12-10T16:30:00Z'
  },
  {
    id: '7',
    amount: 600,
    currency: 'GBP',
    fee: 60,
    exchangeRate: 0.74,
    recipientAmount: 729.73,
    recipient: 'James Miller - London School of Economics',
    status: 'completed',
    createdAt: '2024-12-09T08:45:00Z'
  },
  {
    id: '8',
    amount: 350,
    currency: 'ZAR',
    fee: 70,
    exchangeRate: 17.75,
    recipientAmount: 15.77,
    recipient: 'Amanda White - Rhodes University',
    status: 'completed',
    createdAt: '2024-12-08T13:15:00Z'
  },
  {
    id: '9',
    amount: 800,
    currency: 'GBP',
    fee: 80,
    exchangeRate: 0.74,
    recipientAmount: 972.97,
    recipient: 'Robert Taylor - University of Edinburgh',
    status: 'completed',
    createdAt: '2024-12-07T10:00:00Z'
  },
  {
    id: '10',
    amount: 250,
    currency: 'ZAR',
    fee: 50,
    exchangeRate: 17.75,
    recipientAmount: 11.27,
    recipient: 'Jennifer Lee - University of the Western Cape',
    status: 'pending',
    createdAt: '2024-12-06T15:30:00Z'
  },
  {
    id: '11',
    amount: 900,
    currency: 'GBP',
    fee: 90,
    exchangeRate: 0.74,
    recipientAmount: 1094.59,
    recipient: 'Kevin Anderson - King\'s College London',
    status: 'completed',
    createdAt: '2024-12-05T09:20:00Z'
  },
  {
    id: '12',
    amount: 400,
    currency: 'ZAR',
    fee: 80,
    exchangeRate: 17.75,
    recipientAmount: 18.03,
    recipient: 'Michelle Thompson - University of Pretoria',
    status: 'completed',
    createdAt: '2024-12-04T14:45:00Z'
  },
  {
    id: '13',
    amount: 650,
    currency: 'GBP',
    fee: 65,
    exchangeRate: 0.74,
    recipientAmount: 790.54,
    recipient: 'Daniel Martinez - University of Manchester',
    status: 'failed',
    createdAt: '2024-12-03T11:10:00Z'
  },
  {
    id: '14',
    amount: 550,
    currency: 'ZAR',
    fee: 110,
    exchangeRate: 17.75,
    recipientAmount: 24.79,
    recipient: 'Patricia Rodriguez - University of Johannesburg',
    status: 'completed',
    createdAt: '2024-12-02T16:00:00Z'
  },
  {
    id: '15',
    amount: 720,
    currency: 'GBP',
    fee: 72,
    exchangeRate: 0.74,
    recipientAmount: 875.68,
    recipient: 'Christopher Clark - University of Warwick',
    status: 'completed',
    createdAt: '2024-12-01T12:30:00Z'
  },
  {
    id: '16',
    amount: 380,
    currency: 'ZAR',
    fee: 76,
    exchangeRate: 17.75,
    recipientAmount: 17.13,
    recipient: 'Laura Lewis - University of Cape Town',
    status: 'pending',
    createdAt: '2024-11-30T10:15:00Z'
  }
];

export const transactionsService = {
  // Get user transactions
  getUserTransactions(userId: string): Transaction[] {
    try {
      const stored = localStorage.getItem(TRANSACTIONS_KEY);
      const allTransactions: Transaction[] = stored ? JSON.parse(stored) : [];
      
      // Filter by user ID
      const userTransactions = allTransactions.filter(t => t.userId === userId);
      
      // If no transactions exist for user, create mock data
      if (userTransactions.length === 0) {
        const mockUserTransactions: Transaction[] = mockTransactions.map(t => ({
          ...t,
          userId
        }));
        
        // Save mock transactions
        const updatedTransactions = [...allTransactions, ...mockUserTransactions];
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
        
        return mockUserTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      
      return userTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  // Add new transaction
  addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem(TRANSACTIONS_KEY);
      const allTransactions: Transaction[] = stored ? JSON.parse(stored) : [];
      
      allTransactions.push(newTransaction);
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(allTransactions));
      
      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }
};