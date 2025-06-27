import React from 'react';
import { Heart, Shield, Globe, Zap, ArrowRight, Users, DollarSign, Award } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent-200 dark:bg-accent-800 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-success-200 dark:bg-success-800 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float" style={{ animationDelay: '-1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-slide-up">
          {/* Logo and Brand */}
          <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl shadow-lg animate-pulse-slow">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                HopeChain
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Decentralized Grant Platform</p>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Empowering Communities
            <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              Through Transparent Grants
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing healthcare funding with blockchain technology. Connect donors directly with beneficiaries through secure, transparent, and automated grant distribution.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <DollarSign className="h-8 w-8 text-success-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">$2.5M+</div>
              <div className="text-gray-600 dark:text-gray-400">Grants Distributed</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Users className="h-8 w-8 text-primary-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Lives Impacted</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Award className="h-8 w-8 text-accent-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-accent-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 animate-scale-in"
              style={{ animationDelay: '0.8s' }}
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-scale-in" style={{ animationDelay: '1s' }}>
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Secure & Transparent', desc: 'Blockchain-based security' },
              { icon: Zap, title: 'Instant Execution', desc: 'Smart contract automation' },
              { icon: Globe, title: 'Global Access', desc: 'Worldwide participation' },
              { icon: Heart, title: 'Social Impact', desc: 'Direct community benefit' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <feature.icon className="h-8 w-8 text-primary-500 group-hover:text-accent-500 mx-auto mb-3 transition-colors" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;