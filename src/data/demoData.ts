import { Grant, Application, DonorStats, CurrencyRate, Transaction, AirdropReward } from '../types';

export const demoGrants: Grant[] = [
  {
    id: '1',
    donorId: '1',
    donorName: 'Badafee Semicolon',
    donorRating: 4.8,
    title: 'Emergency Medical Equipment Fund',
    description: 'Supporting healthcare facilities in need of critical medical equipment to serve underserved communities.',
    amount: 50000,
    currency: 'USD',
    category: 'healthcare',
    eligibility: ['Registered healthcare organization', 'Serves underserved communities', 'Valid medical license'],
    requirements: ['Detailed equipment list', 'Impact assessment report', 'Financial statements'],
    deadline: '2025-03-15',
    maxApplications: 10,
    currentApplications: 7,
    status: 'active',
    createdAt: '2024-11-15',
    successfulGrants: 12,
    transactionFee: 1250
  },
  {
    id: '2',
    donorId: '1',
    donorName: 'Badafee Semicolon',
    donorRating: 4.8,
    title: 'Individual Healthcare Support',
    description: 'Direct financial assistance for individuals facing medical emergencies or chronic conditions.',
    amount: 5000,
    currency: 'USD',
    category: 'healthcare',
    eligibility: ['Individual applicant', 'Medical documentation required', 'Financial need demonstrated'],
    requirements: ['Medical reports', 'Income verification', 'Personal statement'],
    deadline: '2025-02-28',
    maxApplications: 50,
    currentApplications: 23,
    status: 'active',
    createdAt: '2024-12-20',
    successfulGrants: 8,
    transactionFee: 125
  },
  {
    id: '3',
    donorId: '1',
    donorName: 'Badafee Semicolon',
    donorRating: 4.8,
    title: 'Community Health Research Grant',
    description: 'Funding innovative research projects that address pressing health challenges in developing communities.',
    amount: 25000,
    currency: 'SUI',
    category: 'research',
    eligibility: ['Research institution', 'Community focus', 'Peer review approval'],
    requirements: ['Research proposal', 'Timeline and budget', 'IRB approval'],
    deadline: '2025-04-30',
    maxApplications: 5,
    currentApplications: 2,
    status: 'active',
    createdAt: '2025-01-01',
    successfulGrants: 15,
    transactionFee: 625
  },
  {
    id: '4',
    donorId: '1',
    donorName: 'Badafee Semicolon',
    donorRating: 4.8,
    title: 'Educational Healthcare Initiative',
    description: 'Supporting educational programs that train healthcare workers in underserved regions.',
    amount: 15000,
    currency: 'NGN',
    category: 'education',
    eligibility: ['Educational institution', 'Healthcare focus', 'Community impact'],
    requirements: ['Program curriculum', 'Student outcomes plan', 'Budget breakdown'],
    deadline: '2025-03-30',
    maxApplications: 8,
    currentApplications: 4,
    status: 'active',
    createdAt: '2024-12-25',
    successfulGrants: 6,
    transactionFee: 375
  },
  {
    id: '5',
    donorId: '2',
    donorName: 'Dr. Michael Thompson',
    donorRating: 4.6,
    title: 'Rural Healthcare Access Program',
    description: 'Expanding healthcare access to remote rural communities through mobile clinics and telemedicine.',
    amount: 75000,
    currency: 'USD',
    category: 'healthcare',
    eligibility: ['Healthcare organization', 'Rural focus', 'Proven track record'],
    requirements: ['Project proposal', 'Community needs assessment', 'Implementation timeline'],
    deadline: '2025-05-15',
    maxApplications: 6,
    currentApplications: 3,
    status: 'active',
    createdAt: '2025-01-10',
    successfulGrants: 9,
    transactionFee: 1875
  },
  {
    id: '6',
    donorId: '3',
    donorName: 'Sarah Williams Foundation',
    donorRating: 4.9,
    title: 'Mental Health Support Initiative',
    description: 'Providing mental health resources and counseling services to underserved populations.',
    amount: 30000,
    currency: 'EUR',
    category: 'healthcare',
    eligibility: ['Mental health organization', 'Licensed professionals', 'Community outreach'],
    requirements: ['Service plan', 'Staff qualifications', 'Impact metrics'],
    deadline: '2025-04-20',
    maxApplications: 12,
    currentApplications: 8,
    status: 'active',
    createdAt: '2024-12-15',
    successfulGrants: 18,
    transactionFee: 750
  }
];

export const demoApplications: Application[] = [
  {
    id: '1',
    grantId: '1',
    applicantId: '3',
    applicantName: 'Hope Medical Center',
    applicantType: 'organization',
    status: 'pending',
    submittedAt: '2025-01-10',
    documents: ['equipment-list.pdf', 'impact-report.pdf', 'financial-statements.pdf'],
    message: 'We urgently need ventilators and monitoring equipment to expand our ICU capacity for our rural community.'
  },
  {
    id: '2',
    grantId: '2',
    applicantId: '2',
    applicantName: 'Afeez Flower',
    applicantType: 'individual',
    status: 'approved',
    submittedAt: '2025-01-05',
    documents: ['medical-reports.pdf', 'income-verification.pdf', 'personal-statement.pdf'],
    message: 'Seeking assistance for ongoing cancer treatment. Lost job due to illness and struggling with medical bills.'
  }
];

export const donorStats: DonorStats = {
  totalDonated: 245000,
  activeGrants: 6,
  completedGrants: 18,
  pendingApplications: 25,
  successfulGrants: 68,
  rating: 4.8,
  totalFeesPaid: 6125
};

export const currencyRates: CurrencyRate[] = [
  { from: 'USD', to: 'NGN', rate: 1650, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'USD', to: 'SUI', rate: 0.45, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'USD', to: 'EUR', rate: 0.92, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'USD', to: 'GBP', rate: 0.79, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'SUI', to: 'USD', rate: 2.22, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'SUI', to: 'NGN', rate: 3663, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'NGN', to: 'USD', rate: 0.00061, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'EUR', to: 'USD', rate: 1.09, lastUpdated: '2025-01-15T10:00:00Z' },
  { from: 'GBP', to: 'USD', rate: 1.27, lastUpdated: '2025-01-15T10:00:00Z' }
];

export const demoTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'grant',
    amount: 50000,
    fromCurrency: 'USD',
    fee: 1250,
    status: 'completed',
    createdAt: '2024-11-15T14:30:00Z',
    hash: '0xabc123...def456'
  },
  {
    id: '2',
    userId: '2',
    type: 'conversion',
    amount: 1000,
    fromCurrency: 'USD',
    toCurrency: 'NGN',
    fee: 15,
    status: 'completed',
    createdAt: '2025-01-10T09:15:00Z',
    hash: '0x789xyz...123abc'
  }
];

export const demoAirdrops: AirdropReward[] = [
  {
    id: '1',
    organizationId: '3',
    referredUserId: '2',
    amount: 100,
    currency: 'SUI',
    status: 'claimed',
    createdAt: '2025-01-05T12:00:00Z'
  }
];