import React, { useState } from 'react';
import { Gift, Users, Share2, Trophy, Coins, CheckCircle, Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { demoAirdrops } from '../../data/demoData';

const AirdropCenter: React.FC = () => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);

    const handleCopyReferralCode = () => {
        if (user?.referralCode) {
            navigator.clipboard.writeText(user.referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClaimAirdrop = async () => {
        // Simulate claiming airdrop
        console.log('Claiming airdrop...');
    };

    if (!user) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sign In Required</h3>
                <p className="text-gray-600 dark:text-gray-400">Please sign in to access airdrop rewards</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Airdrop Balance */}
            <div className="bg-gradient-to-r from-success-500 to-accent-500 rounded-xl p-6 text-white animate-scale-in">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Gift className="h-6 w-6" />
                            <h2 className="text-xl font-semibold">Your Airdrop Balance</h2>
                        </div>
                        <div className="text-3xl font-bold mb-1">
                            {user.airdropBalance || 0} SUI
                        </div>
                        <p className="text-success-100">≈ ${((user.airdropBalance || 0) * 2.22).toFixed(2)} USD</p>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={handleClaimAirdrop}
                            disabled={!user.airdropBalance || user.airdropBalance === 0}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                            Claim Rewards
                        </button>
                    </div>
                </div>
            </div>

            {/* Referral Program */}
            {(user.role === 'organization' || user.role === 'donor') && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                    <div className="flex items-center space-x-2 mb-4">
                        <Share2 className="h-5 w-5 text-primary-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Referral Program</h3>
                    </div>

                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {user.role === 'organization' ? 'Refer Individuals & Organizations' : 'Refer New Users'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {user.role === 'organization'
                                ? 'Earn 100 SUI for each verified individual or organization you refer to the platform'
                                : 'Earn 50 SUI for each new user you bring to HopeChain'
                            }
                        </p>

                        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-3">
                            <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white">
                                {user.referralCode}
                            </code>
                            <button
                                onClick={handleCopyReferralCode}
                                className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors text-sm"
                            >
                                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in">
                            <Users className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user.role === 'organization' ? '12' : '5'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Referrals</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <Coins className="h-8 w-8 text-success-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user.role === 'organization' ? '1,200' : '250'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">SUI Earned</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <Trophy className="h-8 w-8 text-accent-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user.role === 'organization' ? 'Gold' : 'Silver'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Tier Status</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Airdrop History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Airdrop History</h3>

                {demoAirdrops.length > 0 ? (
                    <div className="space-y-3">
                        {demoAirdrops.map((airdrop, index) => (
                            <div key={airdrop.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-success-100 dark:bg-success-900/20 rounded-lg">
                                        <Gift className="h-5 w-5 text-success-600 dark:text-success-400" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            Referral Reward
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(airdrop.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-success-600 dark:text-success-400">
                                        +{airdrop.amount} {airdrop.currency}
                                    </div>
                                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle className="h-3 w-3" />
                                        <span>Claimed</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No airdrop rewards yet</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            Start referring users to earn rewards!
                        </p>
                    </div>
                )}
            </div>

            {/* How It Works */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Airdrops Work</h3>
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">1</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Share Your Referral Code</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Share your unique referral code with individuals or organizations
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">2</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">They Sign Up & Get Verified</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                New users register using your code and complete verification
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">3</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Earn SUI Rewards</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Receive SUI tokens automatically when they complete their first action
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AirdropCenter;