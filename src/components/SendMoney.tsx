import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle, Info, Shield, Zap, Smartphone } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { fxRatesService } from '../utils/fxRates';
import { transactionsService } from '../utils/transactions';
import { FXRate } from '../types';

interface SendMoneyProps {
  fxRates: FXRate | null;
  isLoadingRates: boolean;
  userId: string;
}

export const SendMoney: React.FC<SendMoneyProps> = ({ fxRates, isLoadingRates, userId }) => {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'GBP' as 'GBP' | 'ZAR',
    recipient: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const MIN_AMOUNT = 50;
  const MAX_AMOUNT = 5000;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const amount = parseFloat(formData.amount);

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (amount < MIN_AMOUNT) {
      newErrors.amount = `Minimum amount is $${MIN_AMOUNT}`;
    } else if (amount > MAX_AMOUNT) {
      newErrors.amount = `Maximum amount is $${MAX_AMOUNT}`;
    }

    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient information is required';
    } else if (formData.recipient.trim().length < 3) {
      newErrors.recipient = 'Please provide full recipient details';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !fxRates) return;

    setIsSubmitting(true);

    try {
      const amount = parseFloat(formData.amount);
      const calculation = fxRatesService.calculateTransaction(amount, formData.currency, fxRates);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add transaction
      transactionsService.addTransaction({
        userId,
        amount,
        currency: formData.currency,
        fee: calculation.feeUSD,
        exchangeRate: calculation.exchangeRate,
        recipientAmount: calculation.recipientAmount,
        recipient: formData.recipient.trim(),
        status: 'pending'
      });

      // Show success and reset form
      setShowSuccess(true);
      setFormData({ amount: '', currency: 'GBP', recipient: '' });
      
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      setErrors({ general: 'Failed to process transaction. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculation = fxRates && formData.amount && !isNaN(parseFloat(formData.amount)) 
    ? fxRatesService.calculateTransaction(parseFloat(formData.amount), formData.currency, fxRates)
    : null;

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg">
            <Send className="h-7 w-7 text-white" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Send Money</h2>
            <p className="text-slate-600 dark:text-slate-400">Fast, secure international transfers</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 rounded-xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Live rates</span>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-800/50 rounded-2xl p-6 mb-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-emerald-500 dark:text-emerald-400 mt-0.5" />
            <div className="ml-4">
              <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                Transaction submitted successfully!
              </h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                Your money transfer is being processed and will be available to the recipient shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {errors.general && (
          <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-400 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400 ml-3 font-medium">{errors.general}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Input
            type="number"
            name="amount"
            label="Amount to Send (USD)"
            placeholder={`${MIN_AMOUNT} - ${MAX_AMOUNT}`}
            value={formData.amount}
            onChange={handleInputChange}
            error={errors.amount}
            required
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step="0.01"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Destination Country <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-2xl shadow-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all duration-300 backdrop-blur-sm"
              required
            >
              <option value="GBP">United Kingdom (GBP)</option>
              <option value="ZAR">South Africa (ZAR)</option>
            </select>
          </div>
        </div>

        <Input
          type="text"
          name="recipient"
          label="Recipient Details"
          placeholder="e.g., John Smith - University of Oxford"
          value={formData.recipient}
          onChange={handleInputChange}
          error={errors.recipient}
          required
        />

        {/* Transaction Summary */}
        {calculation && !isLoadingRates && (
          <div className="bg-gradient-to-r from-slate-50 to-emerald-50/50 dark:from-slate-700/50 dark:to-emerald-900/20 rounded-2xl p-6 space-y-4 border border-slate-200/50 dark:border-slate-600/50">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Transaction Preview
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">You send:</span>
                <span className="font-bold text-slate-900 dark:text-white text-lg">${parseFloat(formData.amount).toFixed(2)} USD</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Our fee ({(calculation.feePercentage * 100).toFixed(0)}%):</span>
                <span className="font-semibold text-red-500 dark:text-red-400">-${calculation.feeUSD.toFixed(2)} USD</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Exchange rate:</span>
                <span className="font-semibold text-slate-900 dark:text-white">1 USD = {calculation.exchangeRate} {formData.currency}</span>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-600 pt-3 mt-4">
                <div className="flex justify-between">
                  <span className="text-slate-900 dark:text-white font-semibold text-lg">Recipient gets:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xl">
                    {calculation.recipientAmount.toFixed(2)} {formData.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isLoadingRates || !fxRates}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? 'Processing Transfer...' : 'Send Money Now'}
        </Button>

        <div className="text-sm text-slate-500 dark:text-slate-400 text-center space-y-1 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2 font-medium mb-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span><strong>Fee structure:</strong> 10% for UK transfers, 20% for South Africa</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-green-500" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span>Instant processing</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="h-3 w-3 text-blue-500" />
              <span>Real-time notifications</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};