import React, { useState, useEffect } from 'react';
import { ArrowUpDown, TrendingUp, Clock, CheckCircle, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { currencyRates } from '../../data/demoData.ts';
import { Transaction } from '../../types';

const CurrencyConverter: React.FC = () => {
    const { user } = useAuth();
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('NGN');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [fee, setFee] = useState(0);
    const [isConverting, setIsConverting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
        { code: 'SUI', name: 'Sui Token', symbol: 'SUI' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' }
    ];

    useEffect(() => {
        if (amount && fromCurrency !== toCurrency) {
            const rate = currencyRates.find(r => r.from === fromCurrency && r.to === toCurrency);
            if (rate) {
                const converted = parseFloat(amount) * rate.rate;
                setConvertedAmount(converted);
                // Fee is 1.5% of the amount being converted
                setFee(parseFloat(amount) * 0.015);
            }
        } else {
            setConvertedAmount(0);
            setFee(0);
        }
    }, [amount, fromCurrency, toCurrency]);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleConvert = async () => {
        if (!user) return;

        setIsConverting(true);

        // Simulate conversion process
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newTransaction: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            userId: user.id,
            type: 'conversion',
            amount: parseFloat(amount),
            fromCurrency,
            toCurrency,
            fee,
            status: 'completed',
            createdAt: new Date().toISOString(),
            hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 6)}`
        };

        setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
        setIsConverting(false);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
            setAmount('');
        }, 3000);
    };

    if (!user) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sign In Required</h3>
                <p className="text-gray-600 dark:text-gray-400">Please sign in to access the currency converter</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Converter Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-scale-in">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
                        <ArrowUpDown className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Currency Converter</h2>
                </div>

                <div className="space-y-4">
                    {/* From Currency */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                        <div className="flex space-x-2">
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                {currencies.map(currency => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.code} - {currency.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleSwapCurrencies}
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 animate-pulse"
                        >
                            <ArrowUpDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* To Currency */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                        <div className="flex space-x-2">
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                {currencies.map(currency => (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.code} - {currency.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-medium">
                                {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                            </div>
                        </div>
                    </div>

                    {/* Fee Information */}
                    {fee > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 animate-fade-in">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-blue-800 dark:text-blue-300">Transaction Fee (1.5%)</span>
                                <span className="font-medium text-blue-900 dark:text-blue-200">
                  {currencies.find(c => c.code === fromCurrency)?.symbol}{fee.toFixed(2)}
                </span>
                            </div>
                        </div>
                    )}

                    {/* Convert Button */}
                    <button
                        onClick={handleConvert}
                        disabled={!amount || parseFloat(amount) <= 0 || fromCurrency === toCurrency || isConverting}
                        className="w-full py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium transform hover:scale-105"
                    >
                        {isConverting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Converting...</span>
                            </div>
                        ) : (
                            'Convert Currency'
                        )}
                    </button>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 animate-scale-in">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400" />
                        <span className="text-success-800 dark:text-success-300 font-medium">
              Conversion completed successfully!
            </span>
                    </div>
                </div>
            )}

            {/* Exchange Rates */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-accent-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Exchange Rates</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currencyRates.slice(0, 6).map((rate, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="font-medium text-gray-900 dark:text-white">
                {rate.from}/{rate.to}
              </span>
                            <span className="text-gray-600 dark:text-gray-400">
                {rate.rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Recent Transactions */}
            {recentTransactions.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Conversions</h3>
                    <div className="space-y-3">
                        {recentTransactions.map((transaction, index) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {transaction.amount} {transaction.fromCurrency} → {transaction.toCurrency}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(transaction.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success-500" />
                                    <span className="text-sm text-success-600 dark:text-success-400">Completed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;