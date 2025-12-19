"use client"

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, ChangeEvent } from "react";
import { Plus, Funnel, Search } from "lucide-react";
import { ListOfMatters } from "../list-of-Matters";
import { CreateMatter } from "../modals/CreateMatter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const CaseManagement: React.FC = () => {
  const [viewData, setViewData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="sm:mb-[0px] mb-[10px]">
          <h1 className="text-3xl font-bold text-gray-900">Legal Matters</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and monitor all your legal matters</p>
        </div>
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setViewData(null);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setViewData(null)}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Matter
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white sm:max-w-[65%] w-[95%] p-6">
            <CreateMatter onClose={() => setIsModalOpen(false)} viewData={viewData} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl py-7 px-4 mb-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-full flex items-center px-[10px] border border-gray-300 rounded-lg">
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input placeholder="Search matters..." value={searchTerm} onChange={handleSearchChange} className=" placeholder-cool-gray border-none border-transparent focus:ring-transparent"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="md:w-[110px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Funnel className="w-4 h-4 mr-1" />
            Filters
          </Button>
        </div>
      </div>
      <ListOfMatters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        setViewData={setViewData}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
