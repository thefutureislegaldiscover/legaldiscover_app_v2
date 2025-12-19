"use client"

import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { ChatPanel } from "@/components/messages/chatPanel";
import { ChannelSidebar } from "@/components/messages/channelSidebar";

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppLayout>
      <div className="min-h-screen p-2 sm:p-6">
        <div className="relative flex h-[calc(100vh-8rem)] sm:h-[calc(100vh-3rem)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ChannelSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatPanel onMenuClick={() => setSidebarOpen(true)} />
        </div>
      </div>
    </AppLayout>
  );
}
