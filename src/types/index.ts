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
}

export interface Grant {
  id: string;
  donorId: string;
  donorName: string;
  donorRating: number;
  title: string;
  description: string;
  amount: number;
  currency: 'USD' | 'SUI';
  category: 'healthcare' | 'education' | 'emergency' | 'research' | 'community';
  eligibility: string[];
  requirements: string[];
  deadline: string;
  maxApplications: number;
  currentApplications: number;
  status: 'active' | 'closed' | 'completed';
  createdAt: string;
  successfulGrants: number;
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
}