import { BarChart3, Calculator, Receipt, Target, TrendingUp, Users, Wallet, CreditCard, ArrowUpRight, ArrowDownRight, BadgeDollarSign, DollarSign, File } from "lucide-react";

export const financeMetrics = [
  {
    title: "Total Revenue",
    value: "$2,450,000",
    footerText: "+18.5% vs last period",
    icon: <DollarSign className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    title: "Net Profit",
    value: "$770,000",
    footerText: "31.4% margin",
    icon: <TrendingUp className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    title: "Outstanding A/R",
    value: "$156,000",
    footerText: "94.2% collection rate",
    icon: <BadgeDollarSign className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  {
    title: "Billable Hours",
    value: "8,456",
    footerText: "$285/hr avg",
    icon: <Calculator className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-orange-500 to-orange-600",
  },
];

export const financeTabs = [{
  title: "Financial Overview",
  icon: BarChart3,
  count: 0,
}, {
  title: "Revenue Analysis",
  icon: TrendingUp,
  count: 0,
},
{
  title: "Expense Management",
  icon: CreditCard,
  count: 0,
},
{
  title: "Budget vs Actual",
  icon: Target,
  count: 0,
},
{
  title: "Cash Flow",
  icon: Wallet,
  count: 0,
},
{
  title: "Financial Reports",
  icon: File,
  count: 0,
}
]

export const CHART_DATA = [
  { month: 'Jan', height: '45%' },
  { month: 'Feb', height: '48%' },
  { month: 'Mar', height: '55%' },
  { month: 'Apr', height: '62%' },
  { month: 'May', height: '65%' },
  { month: 'Jun', height: '72%' },
  { month: 'Jul', height: '78%' },
  { month: 'Aug', height: '85%' },
  { month: 'Sep', height: '88%' },
  { month: 'Oct', height: '92%' },
  { month: 'Nov', height: '95%' },
  { month: 'Dec', height: '100%' },
];

export const TOP_CLIENTS = [
  { name: 'TechCorp Inc.', share: '10%', revenue: '$245,000' },
  { name: 'Healthcare Systems', share: '7.7%', revenue: '$189,000' },
  { name: 'Manufacturing Ltd.', share: '6.4%', revenue: '$156,000' },
  { name: 'Financial Services', share: '5.5%', revenue: '$134,000' },
  { name: 'Retail Group', share: '4%', revenue: '$98,000' },
];

export const METRICS = [
  { label: 'Average Deal Size', value: '$45,200' },
  { label: 'Revenue per Client', value: '$12,950' },
  { label: 'Monthly Recurring', value: '$89,500' },
  { label: 'Growth Rate', value: '+18.5%', highlight: true },
];

export const monthlyData = [
  { month: 'Jan', revHeight: 'h-[38%]', expHeight: 'h-[25%]' },
  { month: 'Feb', revHeight: 'h-[40%]', expHeight: 'h-[27%]' },
  { month: 'Mar', revHeight: 'h-[42%]', expHeight: 'h-[29%]' },
  { month: 'Apr', revHeight: 'h-[44%]', expHeight: 'h-[31%]' },
  { month: 'May', revHeight: 'h-[46%]', expHeight: 'h-[33%]' },
  { month: 'Jun', revHeight: 'h-[48%]', expHeight: 'h-[35%]' },
  { month: 'Jul', revHeight: 'h-[50%]', expHeight: 'h-[37%]' },
  { month: 'Aug', revHeight: 'h-[52%]', expHeight: 'h-[39%]' },
  { month: 'Sep', revHeight: 'h-[54%]', expHeight: 'h-[41%]' },
  { month: 'Oct', revHeight: 'h-[54%]', expHeight: 'h-[43%]' },
  { month: 'Nov', revHeight: 'h-[56%]', expHeight: 'h-[44%]' },
  { month: 'Dec', revHeight: 'h-[59%]', expHeight: 'h-[47%]' },
];

export const expenseManagement = [
  { category: "Salaries & Benefits", amount: 980000, percent: "58.3%", budget: 1000000, variance: "-2.0%", vColor: "text-yellow-600" },
  { category: "Office Rent", amount: 240000, percent: "14.3%", budget: 240000, variance: "+0.0%", vColor: "text-green-600" },
  { category: "Technology", amount: 120000, percent: "7.1%", budget: 110000, variance: "+9.1%", vColor: "text-green-600" },
  { category: "Marketing", amount: 850000, percent: "5.1%", budget: 90000, variance: "-5.6%", vColor: "text-yellow-600" },
  { category: "Professional Services", amount: 75000, percent: "4.5%", budget: 80000, variance: "-6.3%", vColor: "text-yellow-600" },
  { category: "Travel & Entertainment", amount: 65000, percent: "3.9%", budget: 70000, variance: "-7.1%", vColor: "text-yellow-600" },
  { category: "Office Supplies", amount: 45000, percent: "2.7%", budget: 50000, variance: "-10.0%", vColor: "text-yellow-600" },
  { category: "Insurance", amount: 35000, percent: "2.1%", budget: 35000, variance: "+0.0%", vColor: "text-green-600" },
  { category: "Utilities", amount: 25000, percent: "1.5%", budget: 30000, variance: "-16.7%", vColor: "text-red-600" },
  { category: "Other", amount: 10000, percent: "0.6%", budget: 15000, variance: "-33.3%", vColor: "text-red-600" },
];

export const practiceAreas = [
  { name: 'IP Litigation', amount: '$850,000', percent: '34.7%', growth: '+22.3%', color: 'w-[34.7%]' },
  { name: 'Corporate Law', amount: '$620,000', percent: '25.3%', growth: '+15.8%', color: 'w-[25.3%]' },
  { name: 'Employment Law', amount: '$480,000', percent: '19.6%', growth: '+12.4%', color: 'w-[19.6%]' },
  { name: 'Real Estate', amount: '$320,000', percent: '13.1%', growth: '+8.9%', color: 'w-[13.1%]' },
  { name: 'Family Law', amount: '$180,000', percent: '7.3%', growth: '-2.1%', color: 'w-[7.3%]' },
];

export const REPORTS = [
  {
    key: "pl",
    title: "Profit & Loss Statement",
    description: "Comprehensive P&L analysis",
    colorClass: "bg-green-500",
    Icon: TrendingUp,
  },
  {
    key: "bs",
    title: "Balance Sheet",
    description: "Assets, liabilities, and equity",
    colorClass: "bg-blue-500",
    Icon: BarChart3,
  },
  {
    key: "cf",
    title: "Cash Flow Statement",
    description: "Cash inflows and outflows",
    colorClass: "bg-purple-500",
    Icon: Wallet,
  },
  {
    key: "budget",
    title: "Budget Report",
    description: "Budget vs actual performance",
    colorClass: "bg-orange-500",
    Icon: Target,
  },
  {
    key: "client-profit",
    title: "Client Profitability",
    description: "Revenue and profit by client",
    colorClass: "bg-indigo-500",
    Icon: Users,
  },
  {
    key: "practice-area",
    title: "Practice Area Analysis",
    description: "Performance by legal practice",
    colorClass: "bg-pink-500",
    Icon: CreditCard,
  },
  {
    key: "expense",
    title: "Expense Analysis",
    description: "Detailed expense breakdown",
    colorClass: "bg-red-500",
    Icon: CreditCard,
  },
  {
    key: "billing",
    title: "Billing Summary",
    description: "Billing and collection metrics",
    colorClass: "bg-yellow-500",
    Icon: Receipt,
  },
  {
    key: "tax",
    title: "Tax Preparation",
    description: "Tax-ready financial summaries",
    colorClass: "bg-gray-500",
    Icon: Calculator,
  },
];

export const cashFlowData = [
  { date: '01/01/2024', inflow: '$245,000', outflow: '$180,000', net: '+$65,000', balance: '$65,000' },
  { date: '08/01/2024', inflow: '$180,000', outflow: '$165,000', net: '+$15,000', balance: '$80,000' },
  { date: '15/01/2024', inflow: '$220,000', outflow: '$195,000', net: '+$25,000', balance: '$105,000' },
  { date: '22/01/2024', inflow: '$165,000', outflow: '$210,000', net: '-$45,000', balance: '$60,000' },
  { date: '29/01/2024', inflow: '$280,000', outflow: '$175,000', net: '+$105,000', balance: '$165,000' },
];

export const upcomingTransactions = [
  { name: 'Client Payment', type: 'inflow', amount: '+$45,000', icon: <ArrowUpRight className="w-4 h-4 text-green-500" /> },
  { name: 'Payroll', type: 'outflow', amount: '-$85,000', icon: <ArrowDownRight className="w-4 h-4 text-red-500" /> },
  { name: 'Retainer', type: 'inflow', amount: '+$25,000', icon: <ArrowUpRight className="w-4 h-4 text-green-500" /> },
];
