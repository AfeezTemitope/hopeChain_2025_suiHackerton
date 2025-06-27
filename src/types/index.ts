export interface User {
  id: string;
  role: 'donor' | 'individual' | 'organization';
  email: string;
  fullName?: string;
  organizationName?: string;
  phone: string;
  isVerified: boolean;
  rating?: number;
  createdAt: string;
  walletAddress?: string;
  referralCode?: string;
  referredBy?: string;
  airdropBalance?: number;
}

export interface Grant {
  id: string;
  donorId: string;
  donorName: string;
  donorRating: number;
  title: string;
  description: string;
  amount: number;
  currency: 'USD' | 'SUI' | 'NGN' | 'EUR' | 'GBP';
  category: 'healthcare' | 'education' | 'emergency' | 'research' | 'community';
  eligibility: string[];
  requirements: string[];
  deadline: string;
  maxApplications: number;
  currentApplications: number;
  status: 'active' | 'closed' | 'completed';
  createdAt: string;
  successfulGrants: number;
  transactionFee: number;
}

export interface Application {
  id: string;
  grantId: string;
  applicantId: string;
  applicantName: string;
  applicantType: 'individual' | 'organization';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submittedAt: string;
  documents: string[];
  message: string;
}

export interface DonorStats {
  totalDonated: number;
  activeGrants: number;
  completedGrants: number;
  pendingApplications: number;
  successfulGrants: number;
  rating: number;
  totalFeesPaid: number;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'conversion' | 'grant' | 'airdrop' | 'fee';
  amount: number;
  fromCurrency: string;
  toCurrency?: string;
  fee: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  hash?: string;
}

export interface AirdropReward {
  id: string;
  organizationId: string;
  referredUserId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'claimed';
  createdAt: string;
}