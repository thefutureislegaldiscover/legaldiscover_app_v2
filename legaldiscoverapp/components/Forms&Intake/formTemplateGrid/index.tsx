"use client";

import React from "react";

export type Tab = {
  title: string;
  count?: number;
};

type Props = {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
};

export const FormTemplateGrid = ({
  tabs,
  activeTab,
  onTabChange,
  children,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex space-x-8 px-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab: Tab, index: number) => (
          <div
            key={index}
            onClick={() => onTabChange(index)}
            className={`flex items-center whitespace-nowrap cursor-pointer py-4 px-1 font-medium text-sm ${activeTab === index
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-500 hover:border-b-2 hover:gray-blue-700 hover:text-gray-700'
              }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
            {tab.title}
            {tab.count > 0 &&
              <span className="ml-2 bg-gray-100 text-gray-900 rounded-full px-2 py-1 text-xs">
                {tab.count}
              </span>
            }
          </div>
        ))}
      </div>
      <div className="p-2 md:p-6">{children}</div>
    </div>
  );
};
