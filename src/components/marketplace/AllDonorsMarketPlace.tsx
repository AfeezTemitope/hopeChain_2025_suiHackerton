import React, { useState } from 'react';
import { Search, Filter, Star, Heart, TrendingUp, Award, Users, DollarSign, Calendar, MapPin } from 'lucide-react';
import { demoGrants } from '../../data/demoData';

const AllDonorsMarketplace: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating');

    // Get unique donors from grants
    const donors = demoGrants.reduce((acc, grant) => {
        const existingDonor = acc.find(d => d.donorId === grant.donorId);
        if (existingDonor) {
            existingDonor.totalDonated += grant.amount;
            existingDonor.activeGrants += 1;
            existingDonor.grants.push(grant);
        } else {
            acc.push({
                donorId: grant.donorId,
                donorName: grant.donorName,
                donorRating: grant.donorRating,
                totalDonated: grant.amount,
                activeGrants: 1,
                successfulGrants: grant.successfulGrants,
                grants: [grant],
                joinedDate: grant.createdAt,
                specialization: grant.category,
                verified: true
            });
        }
        return acc;
    }, [] as any[]);

    const filteredDonors = donors.filter(donor =>
        donor.donorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedDonors = [...filteredDonors].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.donorRating - a.donorRating;
            case 'donated':
                return b.totalDonated - a.totalDonated;
            case 'grants':
                return b.successfulGrants - a.successfulGrants;
            case 'newest':
                return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
            default:
                return 0;
        }
    });

    const DonorCard: React.FC<{ donor: any }> = ({ donor }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden group animate-scale-in">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow">
                                <Heart className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{donor.donorName}</h3>
                                <div className="flex items-center space-x-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i < Math.floor(donor.donorRating)
                                                        ? 'text-yellow-300 fill-current'
                                                        : 'text-white/30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-white/90 text-sm">({donor.donorRating})</span>
                                </div>
                            </div>
                        </div>
                        {donor.verified && (
                            <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                                <Award className="h-4 w-4" />
                                <span className="text-xs font-medium">Verified</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold">${donor.totalDonated.toLocaleString()}</div>
                            <div className="text-white/80 text-xs">Total Donated</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{donor.activeGrants}</div>
                            <div className="text-white/80 text-xs">Active Grants</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{donor.successfulGrants}</div>
                            <div className="text-white/80 text-xs">Successful</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {donor.specialization} Focus
            </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>Since {new Date(donor.joinedDate).getFullYear()}</span>
                    </div>
                </div>

                {/* Recent Grants Preview */}
                <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Recent Grants:</h4>
                    {donor.grants.slice(0, 2).map((grant: any, index: number) => (
                        <div key={grant.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {grant.title}
              </span>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                ${grant.amount.toLocaleString()}
              </span>
                        </div>
                    ))}
                    {donor.grants.length > 2 && (
                        <div className="text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{donor.grants.length - 2} more grants
              </span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all duration-300 font-medium text-sm transform hover:scale-105">
                        View All Grants
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8 animate-slide-up">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Donors</h1>
                <p className="text-gray-600 dark:text-gray-400">Discover verified donors making a difference worldwide</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-scale-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{donors.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Active Donors</div>
                        </div>
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                            <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${donors.reduce((sum, donor) => sum + donor.totalDonated, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Donated</div>
                        </div>
                        <div className="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg">
                            <DollarSign className="h-6 w-6 text-success-600 dark:text-success-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {donors.reduce((sum, donor) => sum + donor.successfulGrants, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Successful Grants</div>
                        </div>
                        <div className="p-3 bg-accent-100 dark:bg-accent-900/20 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {(donors.reduce((sum, donor) => sum + donor.donorRating, 0) / donors.length).toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
                        </div>
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                            <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search donors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="rating">Highest Rated</option>
                        <option value="donated">Most Donated</option>
                        <option value="grants">Most Successful</option>
                        <option value="newest">Newest</option>
                    </select>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Filter className="h-4 w-4" />
                        <span>{sortedDonors.length} donors</span>
                    </div>
                </div>
            </div>

            {/* Donors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedDonors.map((donor, index) => (
                    <div key={donor.donorId} style={{ animationDelay: `${index * 0.1}s` }}>
                        <DonorCard donor={donor} />
                    </div>
                ))}
            </div>

            {sortedDonors.length === 0 && (
                <div className="text-center py-12 animate-fade-in">
                    <div className="text-gray-400 dark:text-gray-600 mb-4">
                        <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No donors found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default AllDonorsMarketplace;