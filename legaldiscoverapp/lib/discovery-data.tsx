export const discoveryDocuments = [
    {
        name: 'Contract_Amendment_TechCorp_2024.pdf',
        uploader: 'Sarah Johnson',
        type: 'PDF',
        size: '2.29 MB',
        relevance: 95,
        statusBadges: ['reviewed', 'produced'],
        aiRisk: 'medium risk',
        aiAnalysis: 'Financial Terms, Liability Clauses',
        dateUploaded: '15/01/2024',
        isPrivileged: false,
        isConfidential: true,
    },
    {
        name: 'Email_Chain_Settlement_Discussion.msg',
        uploader: 'Michael Chen',
        type: 'Email',
        size: '152.34 KB',
        relevance: 88,
        statusBadges: ['pending', 'withheld'],
        aiRisk: 'high risk',
        aiAnalysis: 'Settlement Amount, Negotiation Strategy',
        dateUploaded: '14/01/2024',
        isPrivileged: true,
        isConfidential: true,
    },
    {
        name: 'Financial_Statements_Q4_2023.xlsx',
        uploader: 'Emily Rodriguez',
        type: 'SPREADSHEET',
        size: '869.14 KB',
        relevance: 72,
        statusBadges: ['approved', 'produced'],
        aiRisk: 'low risk',
        aiAnalysis: 'Revenue Analysis, Expense Breakdown',
        dateUploaded: '12/01/2024',
        isPrivileged: false,
        isConfidential: true,
    },
];



export const FILTER_TAGS = [
    { name: "Privileged", count: 1 },
    { name: "Confidential", count: 3 },
    { name: "High Relevance", count: 2 },
    { name: "Pending Review", count: 1 },
    { name: "Email", count: 1 },
    { name: "Contracts", count: 1 },
];

export const FILE_TYPES = [
    "PDF",
    "Word Documents",
    "Excel Files",
    "Email Messages",
    "Presentations",
    "Images"
];

export const CUSTODIANS = [
    "Legal Department",
    "Finance Department",
    "HR Department",
    "IT Department",
    "Executive Team",
    "Sales Department"
];

export const REVIEW_STATUSES = [
    "All Statuses",
    "Reviewed",
    "Pending Review",
    "Not Reviewed",
    "Needs Attention"
];
