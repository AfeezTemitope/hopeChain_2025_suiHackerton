import React, { useState } from 'react';
import { Plus, DollarSign, Users, Clock, CheckCircle, Star, Calendar, Search, Filter, Eye, TrendingUp, Coins, Receipt } from 'lucide-react';
import { donorStats, demoGrants, demoApplications } from '../../data/demoData';
import CreateGrantModal from './CreateGrantModal';
import CurrencyConverter from '../currency/CurrencyConverter';
import AirdropCenter from '../airdrop/AirdropCenter';
import { Grant, Application } from '../../types';

const DonorDashboard: React.FC = () => {
  const [showCreateGrant, setShowCreateGrant] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'grants' | 'applications' | 'converter' | 'airdrops'>('overview');

  const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; subtitle: string; color: string; trend?: string }> =
      ({ icon, title, value, subtitle, color, trend }) => (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${color} animate-pulse-slow`}>
                {icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white animate-fade-in">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>
                {trend && (
                    <div className="flex items-center space-x-1 text-xs text-success-600 dark:text-success-400 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{trend}</span>
                    </div>
                )}
              </div>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          </div>
      );

  const GrantCard: React.FC<{ grant: Grant }> = ({ grant }) => (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{grant.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full animate-pulse ${
                grant.status === 'active' ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400' :
                    grant.status === 'closed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' :
                        'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
            }`}>
            {grant.status}
          </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              {grant.currency === 'SUI' && <Coins className="h-4 w-4 text-accent-500 mr-1" />}
              {grant.amount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{grant.currency}</div>
            <div className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
              <Receipt className="h-3 w-3 mr-1" />
              Fee: {grant.currency === 'SUI' ? grant.transactionFee : `$${grant.transactionFee}`}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{grant.description}</p>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
          <span className="text-gray-500 dark:text-gray-400">
            Applications: {grant.currentApplications}/{grant.maxApplications}
          </span>
            <span className="text-gray-500 dark:text-gray-400">
            Deadline: {new Date(grant.deadline).toLocaleDateString()}
          </span>
          </div>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all duration-300 hover:scale-110">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
  );

  const ApplicationCard: React.FC<{ application: Application }> = ({ application }) => {
    const grant = demoGrants.find(g => g.id === application.grantId);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-scale-in">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{application.applicantName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{grant?.title}</p>
              <span className="capitalize px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full mt-1 inline-block animate-pulse">
              {application.applicantType}
            </span>
            </div>
            <div className="text-right">
            <span className={`px-2 py-1 text-xs rounded-full animate-pulse ${
                application.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    application.status === 'approved' ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
            }`}>
              {application.status}
            </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(application.submittedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{application.message}</p>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {application.documents.length} documents
            </div>
            <div className="flex space-x-2">
              {application.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400 rounded-lg text-sm hover:bg-success-200 dark:hover:bg-success-900/40 transition-all duration-300 transform hover:scale-105">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-900/40 transition-all duration-300 transform hover:scale-105">
                      Reject
                    </button>
                  </>
              )}
            </div>
          </div>
        </div>
    );
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Donor Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your grants and track impact</p>
            </div>
            <button
                onClick={() => setShowCreateGrant(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all duration-300 transform hover:scale-105 animate-scale-in"
            >
              <Plus className="h-5 w-5" />
              <span>Create Grant</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-8 w-fit animate-slide-down">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'grants', label: 'My Grants' },
              { key: 'applications', label: 'Applications' },
              { key: 'converter', label: 'Currency' },
              { key: 'airdrops', label: 'Airdrops' }
            ].map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedTab === tab.key
                            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm transform scale-105'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  {tab.label}
                </button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                      icon={<DollarSign className="h-6 w-6 text-white" />}
                      title="Total Donated"
                      value={`$${donorStats.totalDonated.toLocaleString()}`}
                      subtitle="Lifetime contribution"
                      color="bg-success-500"
                      trend="+12% this month"
                  />
                  <StatCard
                      icon={<Users className="h-6 w-6 text-white" />}
                      title="Active Grants"
                      value={donorStats.activeGrants.toString()}
                      subtitle="Currently open"
                      color="bg-primary-500"
                      trend="+2 new"
                  />
                  <StatCard
                      icon={<Clock className="h-6 w-6 text-white" />}
                      title="Pending Applications"
                      value={donorStats.pendingApplications.toString()}
                      subtitle="Awaiting review"
                      color="bg-yellow-500"
                      trend="5 urgent"
                  />
                  <StatCard
                      icon={<CheckCircle className="h-6 w-6 text-white" />}
                      title="Successful Grants"
                      value={donorStats.successfulGrants.toString()}
                      subtitle="Completed successfully"
                      color="bg-accent-500"
                      trend="98% success rate"
                  />
                </div>

                {/* Transaction Fees */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8 animate-scale-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Platform Fees Contributed</h2>
                      <p className="text-gray-600 dark:text-gray-400">Your fees help build and maintain the HopeChain platform</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 animate-pulse">
                        ${donorStats.totalFeesPaid.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Fees Paid</div>
                      <div className="text-xs text-success-600 dark:text-success-400 mt-1">
                        2.5% of donations
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donor Rating */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Donor Rating</h2>
                      <p className="text-gray-600 dark:text-gray-400">Based on successful grant completions and beneficiary feedback</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center space-x-1 mb-2 justify-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-6 w-6 animate-pulse ${
                                    i < Math.floor(donorStats.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                }`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{donorStats.rating}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Excellent</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Applications</h2>
                    <div className="space-y-4">
                      {demoApplications.slice(0, 3).map((application, index) => (
                          <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{application.applicantName}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{application.submittedAt}</div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                application.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                    application.status === 'approved' ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                        {application.status}
                      </span>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-slide-up">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Grant Performance</h2>
                    <div className="space-y-4">
                      {demoGrants.slice(0, 3).map((grant, index) => (
                          <div key={grant.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{grant.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {grant.currentApplications}/{grant.maxApplications} applications
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                                {grant.currency === 'SUI' && <Coins className="h-4 w-4 text-accent-500 mr-1" />}
                                {grant.amount.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{grant.status}</div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
          )}

          {selectedTab === 'grants' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Grants</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                          type="text"
                          placeholder="Search grants..."
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {demoGrants.map((grant, index) => (
                      <div key={grant.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <GrantCard grant={grant} />
                      </div>
                  ))}
                </div>
              </div>
          )}

          {selectedTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Grant Applications</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                          type="text"
                          placeholder="Search applications..."
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                      />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300">
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {demoApplications.map((application, index) => (
                      <div key={application.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <ApplicationCard application={application} />
                      </div>
                  ))}
                </div>
              </div>
          )}

          {selectedTab === 'converter' && <CurrencyConverter />}
          {selectedTab === 'airdrops' && <AirdropCenter />}
        </div>

        {/* Create Grant Modal */}
        <CreateGrantModal
            isOpen={showCreateGrant}
            onClose={() => setShowCreateGrant(false)}
        />
      </div>
  );
};

export default DonorDashboard;