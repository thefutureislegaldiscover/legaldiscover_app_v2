"use client"

import React from "react";
import { AppLayout } from "@/components/layout";
import { ActionHeader } from '@/components/common/actionHeader';
import { Button } from '@/components/ui/button';
import { Overview } from "@/components/Operations/overview";
import { CheckCircle, Clock, Plus, Target, Users } from 'lucide-react';
import { StatsCard } from '@/components/statsCard';
import { FormTemplateGrid } from "@/components/Forms&Intake/formTemplateGrid";
import { TeamPerformance } from "@/components/Operations/teamPerformance";
import { Tasks } from "@/components/Operations/tasks";
import { Workflows } from "@/components/Operations/workflows";
import { Reports } from "@/components/Operations/reports";

const taskMetrics = [
  {
    title: "Active Tasks",
    value: "24",
    footerText: "+3 this week",
    icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Team Utilization",
    value: "87%",
    footerText: "Optimal range",
    icon: <Users className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Avg Completion",
    value: "3.2 days",
    footerText: "-0.5 days improved",
    icon: <Clock className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "Success Rate",
    value: "94%",
    footerText: "Above target",
    icon: <Target className="w-8 h-8 text-orange-500" />,
  },
];

const financeTabs = [{
  title: "Overview",
  count: 0,
}, {
  title: "Tasks",
  count: 24,
},
{
  title: "Team Performance",
  count: 0,
},
{
  title: "Workflows",
  count: 8,
},
{
  title: "Reports",
  count: 0,
}
]
export default function Operations() {

  const [activeTab, setActiveTab] = React.useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Overview />;
      case 1:
        return <Tasks />;
      case 2:
        return <TeamPerformance />;
      case 3:
        return <Workflows />;
      case 4:
        return <Reports />;
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
        <FormTemplateGrid tabs={financeTabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </FormTemplateGrid>
      </div>
    </AppLayout>
  );
}
