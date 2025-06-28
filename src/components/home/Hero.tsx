import React from 'react';
import { Heart, Shield, Globe, Zap, ArrowRight, Users, DollarSign, Award, Coins, TrendingUp, Star } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float"></div>
          <div className="absolute top-52 right-20 w-32 h-32 bg-accent-200 dark:bg-accent-800 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-success-200 dark:bg-success-800 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float" style={{ animationDelay: '-4s' }}></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-float" style={{ animationDelay: '-1s' }}></div>

          {/* Web3 Floating Icons */}
          <div className="absolute top-44 right-32 animate-float" style={{ animationDelay: '-3s' }}>
            <Coins className="h-8 w-8 text-accent-400 dark:text-accent-600 opacity-60" />
          </div>
          <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '-5s' }}>
            <TrendingUp className="h-6 w-6 text-primary-400 dark:text-primary-600 opacity-60" />
          </div>
          <div className="absolute top-1/2 left-16 animate-float" style={{ animationDelay: '-1.5s' }}>
            <Star className="h-7 w-7 text-yellow-400 dark:text-yellow-600 opacity-60" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center animate-slide-up">
            {/* Logo and Brand */}
            <div className="flex justify-center items-center space-x-3 mb-8">
              <div className="p-4 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl shadow-lg animate-pulse-slow relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                <Heart className="h-8 w-8 text-white relative z-10" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent animate-fade-in">
                  HopeChain
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium animate-slide-down">Decentralized Grant Platform</p>
              </div>
            </div>

            {/* Main Headline with enhanced animations */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="animate-slide-up">Empowering Communities</span>
              <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.3s' }}>
              Through Transparent Grants
            </span>
            </h2>

            {/* Subtitle with Web3 emphasis */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Revolutionizing healthcare funding with <span className="font-semibold text-accent-600 dark:text-accent-400">blockchain technology</span>.
              Connect donors directly with beneficiaries through secure, transparent, and automated grant distribution.
            </p>

            {/* Enhanced Stats with Web3 elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-scale-in hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-8 w-8 text-success-500 animate-pulse" />
                  <Coins className="h-6 w-6 text-accent-500 ml-2 animate-bounce" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">$2.5M+</div>
                <div className="text-gray-600 dark:text-gray-400">Grants Distributed</div>
                <div className="text-xs text-success-600 dark:text-success-400 mt-1">Multi-currency support</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-scale-in hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
                <Users className="h-8 w-8 text-primary-500 mx-auto mb-2 animate-pulse" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Lives Impacted</div>
                <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">Verified beneficiaries</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-scale-in hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.6s' }}>
                <Award className="h-8 w-8 text-accent-500 mx-auto mb-2 animate-pulse" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">98%</div>
                <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
                <div className="text-xs text-accent-600 dark:text-accent-400 mt-1">Smart contract verified</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                  onClick={onGetStarted}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-accent-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 animate-scale-in relative overflow-hidden"
                  style={{ animationDelay: '0.8s' }}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 animate-scale-in hover:scale-105" style={{ animationDelay: '1s' }}>
                Learn More
              </button>
            </div>

            {/* Enhanced Features with Web3 focus */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Shield, title: 'Secure & Transparent', desc: 'Blockchain-based security', color: 'text-primary-500' },
                { icon: Zap, title: 'Instant Execution', desc: 'Smart contract automation', color: 'text-accent-500' },
                { icon: Globe, title: 'Global Access', desc: 'Worldwide participation', color: 'text-success-500' },
                { icon: Heart, title: 'Social Impact', desc: 'Direct community benefit', color: 'text-red-500' }
              ].map((feature, index) => (
                  <div
                      key={index}
                      className="group p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 animate-slide-up hover:scale-105"
                      style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                  >
                    <div className="relative">
                      <feature.icon className={`h-8 w-8 ${feature.color} group-hover:text-accent-500 mx-auto mb-3 transition-all duration-300 animate-pulse`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
              ))}
            </div>

            {/* Web3 Badge */}
            <div className="mt-12 flex justify-center animate-fade-in" style={{ animationDelay: '1.6s' }}>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/20 dark:to-primary-900/20 rounded-full border border-accent-200 dark:border-accent-700">
                <Coins className="h-5 w-5 text-accent-600 dark:text-accent-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm font-medium text-accent-800 dark:text-accent-300">Powered by Sui Blockchain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;