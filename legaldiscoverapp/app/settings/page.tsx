"use client"

import { Download, Save } from 'lucide-react';
import { AppLayout } from "@/components/layout";
import { Button } from '@/components/ui/button';
import { ActionHeader } from '@/components/common/actionHeader';

export default function Operations() {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <ActionHeader
          title="Enterprise Settings"
          description="Manage your account, security, and system preferences"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Download />
              Export Settings
            </Button>
            <Button className="w-full sm:w-auto">
              <Save className="w-5 h-5 mr-2" />
              Save All
            </Button>
          </div>
        </ActionHeader>
      </div>
    </AppLayout>
  );
}
