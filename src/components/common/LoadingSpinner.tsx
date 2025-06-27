import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="h-6 w-6 text-primary-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading HopeChain...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;