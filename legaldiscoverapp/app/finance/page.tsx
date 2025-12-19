"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/statsCard";
import { CashFlow } from '@/components/Finance/cashFlow';
import { ActionHeader } from "@/components/common/actionHeader";
import { financeMetrics, financeTabs } from '@/lib/finance.data';
import { RevenueAnalysis } from '@/components/Finance/revenueAnalysis';
import { BudgetVSActual } from '@/components/Finance/budget-vs-Actual';
import { FinancialReports } from '@/components/Finance/financialReports';
import { FinancialOverview } from '@/components/Finance/financialOverview';
import { ExpenseManagement } from '@/components/Finance/expenseManagement';
import { FormTemplateGrid } from "@/components/Forms&Intake/formTemplateGrid";

export default function Finance() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <FinancialOverview />
      case 1:
        return <RevenueAnalysis />
      case 2:
        return <ExpenseManagement />
      case 3:
        return <BudgetVSActual />;
      case 4:
        return <CashFlow />;
      case 5:
        return <FinancialReports />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <ActionHeader
          title="Financial Management"
          description="Comprehensive financial analytics and reporting"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto">
              Current Month
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Export Report
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              New Budget
            </Button>
          </div>
        </ActionHeader>
        <StatsCard data={financeMetrics} />
        <FormTemplateGrid tabs={financeTabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </FormTemplateGrid>
      </div>
    </AppLayout>
  );
}
