"use client"

import React from "react";
import { AppLayout } from "@/components/layout";
import { ActionHeader } from '@/components/common/actionHeader';
import { Button } from '@/components/ui/button';
import { Book, HelpCircle, LucideMessagesSquare, MessageSquare, Plus, Search, Users, Video, Zap } from 'lucide-react';
import { StatsCard } from '@/components/statsCard';
import { FormTemplateGrid } from "@/components/Forms&Intake/formTemplateGrid";
import { Tutorials } from "@/components/Help&Support/tutorials";
import { Faq } from "@/components/Help&Support/faq";
import { Resources } from "@/components/Help&Support/resources";
import { ContactSupport } from "@/components/Help&Support/contactSupport";
import { Input } from "@/components/ui/input";

export const taskMetrics = [
  {
    title: "Quick Start",
    value: "Get Started",
    footerText: "5-minute setup guide",
    icon: <Zap className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    title: "Video Tutorials",
    value: "Learn",
    footerText: "Step-by-step guides",
    icon: <Video className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    title: "Community",
    value: "Connect",
    footerText: "Join discussions",
    icon: <Users className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  {
    title: "Support",
    value: "Get Help",
    footerText: "24/7 assistance",
    icon: <MessageSquare className="w-8 h-8 text-white/70" />,
    bg: "bg-gradient-to-r from-orange-500 to-orange-600",
  },
];

const financeTabs = [{
  title: "FAQ",
  count: 6,
  icon: HelpCircle
}, {
  title: "Tutorials",
  count: 4,
  icon: Video
},
{
  title: "Resources",
  count: 4,
  icon: Book
},
{
  title: "Contact Support",
  count: 0,
  icon: LucideMessagesSquare
}
]
export default function Operations() {

  const [activeTab, setActiveTab] = React.useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Faq />;
      case 1:
        return <Tutorials />;
      case 2:
        return <Resources />;
      case 3:
        return <ContactSupport />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <ActionHeader
          title="Operations Management"
          description="Comprehensive task and project management for legal operations"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Export Data
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              New Task
            </Button>
          </div>
        </ActionHeader>
        <StatsCard data={taskMetrics} />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for help articles, tutorials, or common questions..."
              className="pl-10 pr-3 py-3 h-11 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        </div>
        <FormTemplateGrid tabs={financeTabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </FormTemplateGrid>
      </div>
    </AppLayout>
  );
}
