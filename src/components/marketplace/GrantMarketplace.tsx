import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, DollarSign, MapPin, Calendar, Heart, FileText } from 'lucide-react';
import { demoGrants } from '../../data/demoData';
import { Grant } from '../../types';
import ApplicationModal from './ApplicationModal';

const GrantMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const filteredGrants = demoGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || grant.category === selectedCategory;
    return matchesSearch && matchesCategory && grant.status === 'active';
  });

  const sortedGrants = [...filteredGrants].sort((a, b) => {
    switch (sortBy) {
      case 'amount-high':
        return b.amount - a.amount;
      case 'amount-low':
        return a.amount - b.amount;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'rating':
        return b.donorRating - a.donorRating;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleApply = (grant: Grant) => {
    setSelectedGrant(grant);
    setShowApplicationModal(true);
  };

  const GrantCard: React.FC<{ grant: Grant }> = ({ grant }) => {
    const daysLeft = Math.ceil((new Date(grant.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const applicationProgress = (grant.currentApplications / grant.maxApplications) * 100;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden group">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  grant.category === 'healthcare' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                  grant.category === 'education' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                  grant.category === 'emergency' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                  grant.category === 'research' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                  'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {grant.category}
                </span>
                {daysLeft <= 7 && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {grant.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {grant.description}
              </p>
            </div>
            <div className="ml-4 text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${grant.amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{grant.currency}</div>
            </div>
          </div>

          {/* Donor Info */}
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">{grant.donorName}</div>
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(grant.donorRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {grant.donorRating} • {grant.successfulGrants} successful grants
                </span>
              </div>
            </div>
          </div>

          {/* Progress and Stats */}
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Applications</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {grant.currentApplications}/{grant.maxApplications}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${applicationProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{daysLeft} days left</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Requirements Preview */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Requirements:</div>
            <div className="flex flex-wrap gap-1">
              {grant.requirements.slice(0, 3).map((req, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 rounded">
                  {req}
                </span>
              ))}
              {grant.requirements.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded">
                  +{grant.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm">
              View Details
            </button>
            <button
              onClick={() => handleApply(grant)}
              disabled={applicationProgress >= 100}
              className="px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {applicationProgress >= 100 ? 'Applications Full' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Grant Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover opportunities that match your needs and goals</p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search grants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="emergency">Emergency</option>
              <option value="research">Research</option>
              <option value="community">Community</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="deadline">Deadline Soon</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
              <option value="rating">Highest Rated Donor</option>
            </select>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{sortedGrants.length} grants found</span>
              <div className="flex items-center space-x-1">
                <Filter className="h-4 w-4" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sortedGrants.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Grants</div>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${sortedGrants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Available</div>
              </div>
              <div className="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sortedGrants.reduce((sum, grant) => sum + grant.currentApplications, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Applications</div>
              </div>
              <div className="p-3 bg-accent-100 dark:bg-accent-900/20 rounded-lg">
                <Users className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(sortedGrants.reduce((sum, grant) => sum + grant.donorRating, 0) / sortedGrants.length * 10) / 10}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Donor Rating</div>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedGrants.map((grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>

        {sortedGrants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No grants found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        grant={selectedGrant}
      />
    </div>
  );
};

export default GrantMarketplace;