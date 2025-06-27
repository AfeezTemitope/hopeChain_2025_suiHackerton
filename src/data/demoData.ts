import { Grant, Application, DonorStats } from '../types';

export const demoGrants: Grant[] = [
  {
    id: '1',
    donorId: '1',
    donorName: 'Dr. Sarah Johnson',
    donorRating: 4.8,
    title: 'Emergency Medical Equipment Fund',
    description: 'Supporting healthcare facilities in need of critical medical equipment to serve underserved communities.',
    amount: 50000,
    currency: 'USD',
    category: 'healthcare',
    eligibility: ['Registered healthcare organization', 'Serves underserved communities', 'Valid medical license'],
    requirements: ['Detailed equipment list', 'Impact assessment report', 'Financial statements'],
    deadline: '2024-03-15',
    maxApplications: 10,
    currentApplications: 7,
    status: 'active',
    createdAt: '2024-01-15',
    successfulGrants: 12
  },
  {
    id: '2',
    donorId: '1',
    donorName: 'Dr. Sarah Johnson',
    donorRating: 4.8,
    title: 'Individual Healthcare Support',
    description: 'Direct financial assistance for individuals facing medical emergencies or chronic conditions.',
    amount: 5000,
    currency: 'USD',
    category: 'healthcare',
    eligibility: ['Individual applicant', 'Medical documentation required', 'Financial need demonstrated'],
    requirements: ['Medical reports', 'Income verification', 'Personal statement'],
    deadline: '2024-02-28',
    maxApplications: 50,
    currentApplications: 23,
    status: 'active',
    createdAt: '2024-01-20',
    successfulGrants: 8
  },
  {
    id: '3',
    donorId: '1',
    donorName: 'Dr. Sarah Johnson',
    donorRating: 4.8,
    title: 'Community Health Research Grant',
    description: 'Funding innovative research projects that address pressing health challenges in developing communities.',
    amount: 25000,
    currency: 'USD',
    category: 'research',
    eligibility: ['Research institution', 'Community focus', 'Peer review approval'],
    requirements: ['Research proposal', 'Timeline and budget', 'IRB approval'],
    deadline: '2024-04-30',
    maxApplications: 5,
    currentApplications: 2,
    status: 'active',
    createdAt: '2024-02-01',
    successfulGrants: 15
  },
  {
    id: '4',
    donorId: '1',
    donorName: 'Dr. Sarah Johnson',
    donorRating: 4.8,
    title: 'Educational Healthcare Initiative',
    description: 'Supporting educational programs that train healthcare workers in underserved regions.',
    amount: 15000,
    currency: 'USD',
    category: 'education',
    eligibility: ['Educational institution', 'Healthcare focus', 'Community impact'],
    requirements: ['Program curriculum', 'Student outcomes plan', 'Budget breakdown'],
    deadline: '2024-03-30',
    maxApplications: 8,
    currentApplications: 4,
    status: 'active',
    createdAt: '2024-01-25',
    successfulGrants: 6
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
    submittedAt: '2024-02-10',
    documents: ['equipment-list.pdf', 'impact-report.pdf', 'financial-statements.pdf'],
    message: 'We urgently need ventilators and monitoring equipment to expand our ICU capacity for our rural community.'
  },
  {
    id: '2',
    grantId: '2',
    applicantId: '2',
    applicantName: 'Michael Chen',
    applicantType: 'individual',
    status: 'approved',
    submittedAt: '2024-02-05',
    documents: ['medical-reports.pdf', 'income-verification.pdf', 'personal-statement.pdf'],
    message: 'Seeking assistance for ongoing cancer treatment. Lost job due to illness and struggling with medical bills.'
  }
];

export const donorStats: DonorStats = {
  totalDonated: 145000,
  activeGrants: 4,
  completedGrants: 12,
  pendingApplications: 15,
  successfulGrants: 41,
  rating: 4.8
};