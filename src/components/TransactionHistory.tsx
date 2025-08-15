import React, { useState, useEffect } from 'react';
import { History, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { transactionsService } from '../utils/transactions';
import { Transaction } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface TransactionHistoryProps {
  userId: string;
}

const ITEMS_PER_PAGE = 10;

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const userTransactions = transactionsService.getUserTransactions(userId);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [userId]);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
            <History className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white ml-4">Transaction History</h2>
        </div>
        <LoadingSpinner size="md" className="py-12" />
      </div>
    );
  }

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
            <History className="h-7 w-7 text-white" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Transaction History</h2>
            <p className="text-slate-600 dark:text-slate-400">Track all your money transfers</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 px-4 py-2 rounded-2xl">
          <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
            {transactions.length} transfers
          </div>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full p-6 w-24 h-24 mx-auto mb-6">
            <History className="h-12 w-12 text-purple-500 dark:text-purple-400 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">No transactions yet</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Your transfer history will appear here once you start sending money.</p>
        </div>
      ) : (
        <>
          {/* Transactions List */}
          <div className="space-y-6">
            {currentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gradient-to-r from-slate-50/50 to-white/50 dark:from-slate-700/30 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl p-6 hover:shadow-lg dark:hover:shadow-slate-900/20 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      {getStatusIcon(transaction.status)}
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        ${transaction.amount.toFixed(2)} USD → {transaction.recipientAmount.toFixed(2)} {transaction.currency}
                      </span>
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium mb-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>{transaction.recipient}</span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span>{formatDate(transaction.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-red-400" />
                        <span>Fee: ${transaction.fee.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span>Rate: {transaction.exchangeRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Showing {startIndex + 1} to {Math.min(endIndex, transactions.length)} of {transactions.length} transactions
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-3 text-sm rounded-2xl font-semibold transition-all duration-300 ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-110'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};