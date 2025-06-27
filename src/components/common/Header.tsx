import React from 'react';
import { Heart, Moon, Sun, User, LogOut, Wallet, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

interface HeaderProps {
    onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg animate-pulse-slow">
                            <Heart className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent animate-fade-in">
                                HopeChain
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Decentralized Grants</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user && (
                            <>
                                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full animate-slide-down">
                                    <Wallet className="h-4 w-4 text-accent-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.walletAddress}
                  </span>
                                </div>

                                {user.airdropBalance && user.airdropBalance > 0 && (
                                    <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/20 dark:to-success-800/20 rounded-full animate-bounce">
                                        <Gift className="h-4 w-4 text-success-600 dark:text-success-400" />
                                        <span className="text-sm font-medium text-success-700 dark:text-success-300">
                      {user.airdropBalance} SUI
                    </span>
                                    </div>
                                )}
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-600 animate-pulse" />
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 animate-slide-down">
                                    <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.fullName || user.organizationName}
                  </span>
                                    <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full capitalize animate-pulse">
                    {user.role}
                  </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-all duration-300 hover:scale-110"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onAuthClick}
                                className="px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all duration-300 font-medium transform hover:scale-105 animate-scale-in"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;