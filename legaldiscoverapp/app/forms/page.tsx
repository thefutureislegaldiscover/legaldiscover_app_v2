"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/statsCard";
import { ActionHeader } from "@/components/common/actionHeader";
import { formMetrics, formTemplates, intakeQueue } from "@/lib/form-date";
import { FormTemplateGrid } from "@/components/Forms&Intake/formTemplateGrid";
import { FormTemplates } from "@/components/Forms&Intake/formTemplates";
import { IntakeQueue } from "@/components/Forms&Intake/intakeQueue";
import { FormAnalytics } from "@/components/Forms&Intake/formAnalytics";
import { AIAutomation } from "@/components/Forms&Intake/AI-Automation";

const formsTabs = [
  { title: "Form Templates", count: formTemplates.length },
  { title: "Intake Queue", count: intakeQueue.length },
  { title: "Form Analytics", count: 0 },
  { title: "AI Automation", count: 0 },
];

export default function Forms() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <FormTemplates />;
      case 1:
        return <IntakeQueue />;
      case 2:
        return <FormAnalytics />;
      case 3:
        return <AIAutomation />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <ActionHeader
          title="Forms & Intake"
          description="Manage intake forms and client onboarding process"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto">
              Form Builder
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              New Form
            </Button>
          </div>
        </ActionHeader>
        <StatsCard data={formMetrics} />
        <FormTemplateGrid
          tabs={formsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {renderTabContent()}
        </FormTemplateGrid>
      </div>
    </AppLayout>
  );
}
