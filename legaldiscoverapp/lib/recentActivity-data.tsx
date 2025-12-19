import { FileText, Users, Brain, BarChart3 } from 'lucide-react';

export const activityData = [
    {
        icon: FileText,
        text: 'New case filed: Personal Injury #PI-2025-001',
        time: '2 hours ago'
    },
    {
        icon: Users,
        text: 'Client meeting scheduled with Johnson & Associates',
        time: '4 hours ago'
    },
    {
        icon: Brain,
        text: 'AI completed case analysis for #LC-2024-089',
        time: '6 hours ago'
    },
];

export const qickActions = [
    {
        label: 'New Case',
        icon: FileText,
    },
    {
        label: 'Add Client',
        icon: Users,
    },
    {
        label: 'AI Assistant',
        icon: Brain,
    },
    {
        label: 'Analytics',
        icon: BarChart3,
    },
];