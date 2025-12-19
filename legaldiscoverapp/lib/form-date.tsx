import { Send, CheckCircle, Zap, FilePen } from "lucide-react";

export const formTemplates = [
  {
    title: "Personal Injury Intake Form",
    description: "Initial consultation form for personal injury cases",
    category: "Intake",
    usage: 156,
    completionRate: 94,
    estTime: "8-12 min",
    icon: "👤",
    hasAI: true,
    isActive: true,
  },
  {
    title: "Divorce Petition",
    description: "Initial divorce filing form",
    category: "Family Law",
    usage: 89,
    completionRate: 87,
    estTime: "15-20 min",
    icon: "⚖️",
    hasAI: true,
    isActive: true,
  },
  {
    title: "Property Purchase Agreement",
    description: "Standard real estate purchase agreement form",
    category: "Real Estate",
    usage: 67,
    completionRate: 91,
    estTime: "10-15 min",
    icon: "📄",
    hasAI: false,
    isActive: true,
  },
  {
    title: "Last Will and Testament",
    description: "Basic will creation form",
    category: "Estate Planning",
    usage: 34,
    completionRate: 89,
    estTime: "20-25 min",
    icon: "📜",
    hasAI: false,
    isActive: true,
  },
  {
    title: "Employment Discrimination Intake",
    description: "Initial intake for discrimination cases",
    category: "Employment Law",
    usage: 45,
    completionRate: 92,
    estTime: "12-18 min",
    icon: "💼",
    hasAI: true,
    isActive: true,
  },
  {
    title: "LLC Formation Questionnaire",
    description: "Information needed for LLC formation",
    category: "Business Law",
    usage: 78,
    completionRate: 95,
    estTime: "10-15 min",
    icon: "🏢",
    hasAI: false,
    isActive: true,
  },
];

export const intakeQueue = [
  {
    name: "Sarah Johnson",
    status: "New",
    priority: "High",
    form: "Personal Injury Intake Form",
    date: "2024-01-15 14:30",
    fee: "$125,000",
    completeness: "100% complete",
    issues: ["Statute of limitations concern", "Multiple defendants"],
    aiScore: 87,
  },
  {
    name: "TechStart LLC",
    status: "Review",
    priority: "Medium",
    form: "LLC Formation Questionnaire",
    date: "2024-01-15 11:45",
    fee: "$5,000",
    completeness: "95% complete",
    issues: ["Name availability check needed"],
    aiScore: 72,
  },
  {
    name: "Michael Chen",
    status: "Follow-up",
    priority: "Medium",
    form: "Employment Discrimination Intake",
    date: "2024-01-14 16:20",
    fee: "$75,000",
    completeness: "68% complete",
    issues: ["Missing documentation", "Timeline clarification needed"],
    aiScore: 65,
  },
  {
    name: "Maria Rodriguez",
    status: "Scheduled",
    priority: "High",
    form: "Immigration Consultation Form",
    date: "2024-01-14 09:15",
    fee: "$8,500",
    completeness: "100% complete",
    issues: ["Urgent timeline", "Complex case"],
    aiScore: 91,
  },
];

export const AIEnhancementImpact = [
  { value: "+23%", label: "Completion Rate Increase" },
  { value: "-35%", label: "Time to Complete" },
  { value: "+41%", label: "Data Quality Score" },
]

export const formMetrics = [
  {
    title: "Active Forms",
    value: "10",
    footerText: "+3 this month",
    icon: <FilePen className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Total Submissions",
    value: "1,247",
    footerText: "+18% this week",
    icon: <Send className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Avg Completion Rate",
    value: "92%",
    footerText: "Above target",
    icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "AI Enhanced",
    value: "7",
    footerText: "70% of forms",
    icon: <Zap className="w-8 h-8 text-orange-500" />,
  },
];

export const formsTabs = [{
  title: "Form Templates",
  count: formTemplates.length,
}, {
  title: "Intake Queue",
  count: intakeQueue.length,
},
{
  title: "Form Analytics",
  count: "",
},
{
  title: "AI Automation",
  count: "",
}
]