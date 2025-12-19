import {
    Brain,
    Briefcase,
    CircleQuestionMark,
    DollarSign,
    FileText,
    Globe,
    House,
    MessageSquare,
    Search,
    Settings,
    SquarePen,
    Users,
} from "lucide-react";

export const navigationTabs = [
    {
        section: {
            name: "Core Functions",
            icon: <House size={16} />,
        },
        items: [
            { label: "Dashboard", icon: <House size={20} color="rgb(96 165 250)" />, href: "/" },
            { label: "Discovery", icon: <Search size={20} color="rgb(192 132 252)" />, href: "/discovery" },
            { label: "Matters", icon: <FileText size={20} color="rgb(251 146 60)" />, href: "/matters" },
            { label: "AI Consultant", icon: <Brain size={20} color="rgb(167 139 250)" />, href: "/ai-consultant" },
        ],
    },
    {
        section: { name: "Client Work", icon: <Users size={16} /> },
        items: [
            { label: "Forms", icon: <SquarePen size={20} color="rgb(74 222 128)" />, href: "/forms" },
            { label: "Messages", icon: <MessageSquare size={20} color="rgb(251 113 133)" />, href: "/messages" },
        ],
    },
    {
        section: { name: "Management", icon: <Briefcase size={16} /> },
        items: [
            { label: "Finance", icon: <DollarSign size={20} color="rgb(45 212 191)" />, href: "/finance" },
            { label: "Operations", icon: <Briefcase size={20} color="rgb(34 211 238)" />, href: "/operations" },
        ],
    },
    {
        section: { name: "System", icon: <Settings size={16} /> },
        items: [
            { label: "Integrations", icon: <Globe size={20} color="rgb(52 211 153)" />, href: "/integrations" },
            { label: "Settings", icon: <Settings size={20} color="rgb(156 163 175)" />, href: "/settings" },
            { label: "Help & FAQ", icon: <CircleQuestionMark size={20} color="rgb(148 163 184)" />, href: "/help" },
        ],
    },
]