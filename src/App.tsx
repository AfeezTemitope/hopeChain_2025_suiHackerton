import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import { ThemeProvider } from './components/context/ThemeContext.tsx';
import Header from './components/common/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import Hero from './components/home/Hero';
import AuthModal from './components/auth/AuthModal';
import DonorDashboard from './components/dashboard/DonorDashboard';
import GrantMarketplace from './components/marketplace/GrantMarketplace';

const AppContent: React.FC = () => {
    const { user, isLoading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handleGetStarted = () => {
        if (user) {
            // User is logged in, redirect to their appropriate dashboard
            return;
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header onAuthClick={() => setShowAuthModal(true)} />

                <Routes>
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Navigate to={user.role === 'donor' ? '/donor-dashboard' : '/marketplace'} replace />
                            ) : (
                                <Hero onGetStarted={handleGetStarted} />
                            )
                        }
                    />

                    <Route
                        path="/donor-dashboard"
                        element={
                            user && user.role === 'donor' ? (
                                <DonorDashboard />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    <Route
                        path="/marketplace"
                        element={
                            user && (user.role === 'individual' || user.role === 'organization') ? (
                                <GrantMarketplace />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                />
            </div>
        </Router>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;