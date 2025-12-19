"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PrepareDiscoveryDoc } from "@/components/modals/prepareDiscoveryDoc";
import { Search, FileText, MessageSquare, CheckCircle, Funnel, ArrowUp, Minus, Paperclip, Eye } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Task {
  keyId: string;
  title: string;
  assignee: string;
  dueDate: string;
  tags: string[];
  status: "todo" | "in-progress";
  priority: "high" | "medium";
  comments: number;
  attachments: number;
  subtasks: number;
}
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const IconStat = ({
  icon: Icon,
  count,
}: {
  icon: React.ComponentType<{ className: string }>;
  count: number;
}) => (
  <div className="flex items-center space-x-1 text-xs text-gray-500">
    <Icon className="w-3 h-3" />
    <span>{count}</span>
  </div>
);

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const {
    keyId,
    title,
    assignee,
    dueDate,
    tags,
    status,
    priority,
    comments,
    attachments,
    subtasks,
  } = task;

  const statusMap = {
    "in-progress": {
      text: "In Progress",
      className: "bg-yellow-100 text-yellow-800",
      icon: <ArrowUp className="w-4 h-4 text-orange-600" />,
    },
    todo: {
      text: "Todo",
      className: "bg-blue-100 text-blue-800",
      icon: <Minus className="w-4 h-4 text-blue-600" />,
    },
  };

  const priorityMap = {
    high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {keyId === "LEG-001" ? (
            <CheckCircle className="w-4 h-4 text-blue-600" />
          ) : (
            <FileText className="w-4 h-4 text-green-600" />
          )}
          <span className="text-sm font-mono text-gray-500">{keyId}</span>
        </div>
        <div className="flex items-center gap-1">
          {statusMap[status].icon}
          <Badge className={statusMap[status].className}>
            {statusMap[status].text}
          </Badge>
        </div>
      </div>

      <h3 className="text-base font-semibold mb-3">{title}</h3>

      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>Assignee: {assignee}</span>
        <span>Due: {dueDate}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-blue-100 text-blue-800"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <IconStat icon={Paperclip} count={comments} />
          <IconStat icon={MessageSquare} count={attachments} />
          <IconStat icon={Eye} count={subtasks} />
        </div>

        <Badge className={priorityMap[priority]}>{priority}</Badge>
      </div>
    </div>
  );
};

const TaskFilters = () => (
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      <input
        placeholder="Search tasks..."
        className="w-full pl-10 pr-3 py-2 border rounded-lg"
      />
    </div>
    <Select defaultValue="all">
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button variant="outline">
      <Funnel className="w-4 h-4 mr-2" />
      More Filters
    </Button>
  </div>
);

export const Tasks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tasks: Task[] = [
    {
      keyId: "LEG-001",
      title: "Review contract terms for TechCorp acquisition",
      assignee: "Sarah Johnson",
      dueDate: "20/01/2024",
      tags: ["contract-review", "acquisition"],
      status: "in-progress",
      priority: "high",
      comments: 2,
      attachments: 1,
      subtasks: 3,
    },
    {
      keyId: "LEG-002",
      title: "Prepare discovery documents for healthcare case",
      assignee: "Emily Rodriguez",
      dueDate: "25/01/2024",
      tags: ["discovery", "healthcare"],
      status: "todo",
      priority: "medium",
      comments: 1,
      attachments: 0,
      subtasks: 1,
    },
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white md:max-w-6xl max-w-[95%] w-full max-h-[90vh] overflow-y-auto">
          <PrepareDiscoveryDoc />
        </DialogContent>
      </Dialog>

      <div className='space-y-6'>
        <TaskFilters />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task.keyId}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            >
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
