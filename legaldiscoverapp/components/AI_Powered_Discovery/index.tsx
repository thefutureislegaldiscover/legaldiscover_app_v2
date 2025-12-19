"use client"

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ActionHeader } from "../common/actionHeader";
import { DocumentsTable } from "../documentsTable";
import { AI_Discovery_Insights } from "../AI-Discovery-Insights";
import { CUSTODIANS, FILE_TYPES, FILTER_TAGS, REVIEW_STATUSES } from "@/lib/discovery-data";
import { Brain, Search, List, Funnel, Upload, ChevronRight, Calendar, Grid3x3 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const Checkbox: React.FC<any> = ({ id, checked, onCheckedChange, children }) => (
    <div className="flex items-center space-x-2">
        <input type="checkbox" id={id} checked={checked} onChange={onCheckedChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label htmlFor={id} className="text-sm text-gray-700">{children}</label>
    </div>
);

interface ProcessingBarProps {
    progress: number;
    statusText: string;
    subText: string;
}

const DocumentProcessingBar: React.FC<ProcessingBarProps> = ({
    progress,
    statusText,
    subText,
}) => {
    return (
        <div className="w-full bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-semibold text-gray-700">{statusText}</h2>
                <span className="text-base font-medium text-gray-800">{progress}%</span>
            </div>

            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-xs text-gray-500">{subText}</p>
        </div>
    );
};

interface FilterDocumentProps {
    view: "list" | "grid";
    handleChangeView: (view: "list" | "grid") => void;
}

const FilterDocument: React.FC<FilterDocumentProps> = ({ view, handleChangeView }) => {
    const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <div className="flex w-full items-center h-11 pr-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                    <Search className="text-gray-400 w-5 h-5 ml-4" />
                    <Input
                        placeholder="Search documents using natural language or keywords..."
                        className="border-none text-base placeholder-gray-500 focus:ring-transparent px-3"
                    />
                    <span className="whitespace-nowrap w-[75px] text-xs bg-purple-100 text-purple-600 font-medium text-center py-1 rounded cursor-pointer  hover:bg-purple-200">
                        AI Search
                    </span>
                </div>
                <Button className="h-full py-3">
                    <Search className="w-5 h-5 mr-1 sm:mr-0" />
                    <span className="hidden sm:inline">Search</span>
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {FILTER_TAGS.map((tag) => (
                    <div
                        key={tag.name}
                        className="text-sm flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {tag.name}
                        <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-xs">
                            {tag.count}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-[15px] justify-between items-center border-t border-gray-100 pt-3">
                <span className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700  cursor-pointer"
                    onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}>
                    <Funnel className="w-4 h-4 mr-1.5" />
                    Advanced Filters
                    <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isAdvancedFiltersOpen ? 'rotate-90' : 'rotate-0'}`} />
                </span>

                <div className="flex flex-wrap items-center gap-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">View:</span>
                        <div className="flex rounded-lg overflow-hidden">
                            <div
                                className={`cursor-pointer p-2 rounded ${view === "list" ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:bg-gray-200"
                                    }`}
                                onClick={() => handleChangeView("list")}
                            >
                                <List className="w-5 h-5" />
                            </div>
                            <div
                                className={`cursor-pointer p-2 rounded  ${view === "grid" ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:bg-gray-200"
                                    }`}
                                onClick={() => handleChangeView("grid")}
                            >
                                <Grid3x3 className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    <Select defaultValue="relevance">
                        <SelectTrigger className="w-[180px] text-sm border-gray-300 hover:border-gray-400">
                            <SelectValue placeholder="Sort by Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="relevance">Sort by Relevance</SelectItem>
                                <SelectItem value="date">Sort by Date</SelectItem>
                                <SelectItem value="size">Sort by Size</SelectItem>
                                <SelectItem value="name">Sort by Name</SelectItem>
                                <SelectItem value="type">Sort by Type</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {isAdvancedFiltersOpen && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 mb-2">Date Range</label>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Input placeholder="mm/dd/yyyy" className="pr-10" />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <Input placeholder="mm/dd/yyyy" className="pr-10" />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 mb-2">File Types</label>
                            <div className="h-32 overflow-y-auto border p-2 rounded-lg bg-white space-y-1 text-sm text-gray-600">
                                {FILE_TYPES.map(type => (
                                    <div key={type} className="hover:bg-gray-100 p-1 rounded cursor-pointer">{type}</div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 mb-2">Custodians</label>
                            <div className="h-32 overflow-y-auto border p-2 rounded-lg bg-white space-y-1 text-sm text-gray-600">
                                {CUSTODIANS.map(custodian => (
                                    <div key={custodian} className="hover:bg-gray-100 p-1 rounded cursor-pointer">{custodian}</div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 mb-2">Review Status</label>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full text-sm font-normal border-gray-300">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {REVIEW_STATUSES.map(status => (
                                            <SelectItem key={status} value={status.toLowerCase().replace(' ', '-')}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                        <Checkbox>
                            Privileged Only
                        </Checkbox>
                        <Checkbox>
                            Confidential Only
                        </Checkbox>
                        <Checkbox>
                            Has Attachments
                        </Checkbox>
                    </div>
                </div>
            )}
        </div>
    );
};

export const AI_Powered_Discovery: React.FC = () => {
    const [progress, setProgress] = useState(50);
    const [view, setView] = useState<"list" | "grid">("list");

    const processingStatus = {
        title: "Uploading and Processing Documents",
        subtext: "AI is analyzing documents for privilege, relevance, and confidentiality",
    };

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <ActionHeader
                title="AI-Powered Discovery"
                description="Intelligent document review and analysis platform"
            >
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Documents
                    </Button>
                    <Button className="w-full sm:w-auto">
                        <Brain className="w-5 h-5 mr-2" />
                        AI Analysis
                    </Button>
                </div>
            </ActionHeader>
            <DocumentProcessingBar
                progress={progress}
                statusText={processingStatus.title}
                subText={processingStatus.subtext}
            />
            <AI_Discovery_Insights />
            <FilterDocument view={view} handleChangeView={setView} />
            <DocumentsTable view={view} />
        </div>
    );
};