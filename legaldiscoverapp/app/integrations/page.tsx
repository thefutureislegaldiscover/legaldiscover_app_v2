"use client"

import React from "react";
import { AppLayout } from "@/components/layout";
import { ActionHeader } from '@/components/common/actionHeader';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Download, Globe, Plus, RefreshCcw } from 'lucide-react';
import { StatsCard } from '@/components/statsCard';
import { FormTemplateGrid } from "@/components/Forms&Intake/formTemplateGrid";

const taskMetrics = [
  {
    title: "Connected",
    value: "16",
    footerText: "Active integrations",
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Available",
    value: "6",
    footerText: "Ready to connect",
    icon: <Globe className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Errors",
    value: "1",
    footerText: "Need attention",
    icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
  },
  {
    title: "Data Synced",
    value: "14",
    footerText: "Real-time sync",
    icon: <RefreshCcw className="w-8 h-8 text-purple-500" />,
  },
];

const financeTabs = [{
  title: "All Integrations",
  count: 23,
}, {
  title: "Connected",
  count: 16,
},
{
  title: "Available",
  count: 6,
},
{
  title: "Popular",
  count: 20,
}
]

export default function Operations() {

  const [activeTab, setActiveTab] = React.useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return null
      case 1:
        return null
      case 2:
        return null
      case 3:
        return null
      case 4:
        return null;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <ActionHeader
          title="Enterprise Integrations"
          description="Connect with leading legal technology platforms and services"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Download />
              Export Config
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              Custom Integration
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
