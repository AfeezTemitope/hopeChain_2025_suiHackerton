import React from 'react';
import { Heart, Sun, Moon, Menu, X, Coins, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
    onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 animate-fade-in">
                        <div className="relative p-2 bg-gradient-to-r from-primary-600 to-accent-500 rounded-xl shadow-lg animate-pulse-slow overflow-hidden group">
                            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                            <Heart className="h-6 w-6 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                            {/* Floating particles effect */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-300 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="text-left">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                                HopeChain
                            </h1>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                <Coins className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                                <span>Sui Powered</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {user && (
                            <>
                                <div className="flex items-center space-x-6 text-sm font-medium">
                                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105 relative group">
                                        Marketplace
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                                    </a>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105 relative group">
                                        Dashboard
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                                    </a>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105 relative group">
                                        Converter
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                                    </a>
                                    {(user.role === 'organization' || user.role === 'donor') && (
                                        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-105 relative group flex items-center space-x-1">
                                            <span>Airdrops</span>
                                            <TrendingUp className="h-3 w-3 text-accent-500 animate-bounce" />
                                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 animate-fade-in relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {isDark ? (
                                <Sun className="h-5 w-5 text-yellow-500 animate-pulse relative z-10" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-600 animate-pulse relative z-10" />
                            )}
                        </button>

                        {/* User Menu */}
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="hidden md:block text-right animate-slide-down">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {user.role === 'organization' ? user.organizationName : user.fullName}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center space-x-1">
                                        <span>{user.role}</span>
                                        {user.isVerified && (
                                            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:scale-110 transition-all duration-300 animate-scale-in relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                                        <span className="relative z-10">
                      {user.role === 'organization'
                          ? user.organizationName?.charAt(0).toUpperCase()
                          : user.fullName?.charAt(0).toUpperCase()
                      }
                    </span>
                                    </div>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {user.role === 'organization' ? user.organizationName : user.fullName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            {user.airdropBalance && user.airdropBalance > 0 && (
                                                <div className="flex items-center space-x-1 text-xs text-accent-600 dark:text-accent-400 mt-1">
                                                    <Coins className="h-3 w-3" />
                                                    <span>{user.airdropBalance} SUI rewards</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-2">
                                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                Profile Settings
                                            </button>
                                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                Wallet
                                            </button>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={onAuthClick}
                                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all duration-300 font-medium transform hover:scale-105 animate-scale-in relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <span className="relative z-10">Sign In</span>
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
                        {user && (
                            <div className="space-y-2">
                                <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                    Marketplace
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                    Dashboard
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                    Converter
                                </a>
                                {(user.role === 'organization' || user.role === 'donor') && (
                                    <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        Airdrops
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;