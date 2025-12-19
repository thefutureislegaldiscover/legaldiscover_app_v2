"use client";

import { toast } from "sonner";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { Spinner } from "../ui/spinner";
import { useAuthStore } from "@/store/Auth";
import { useGlobalStore } from "@/store/global";
import { useQuery } from "@tanstack/react-query";
import { getAllMatters, getMatterById } from "@/services/apis";
import { FileText, User, Archive, UserPlus, Clock, CircleAlert } from "lucide-react";

interface StatusBadgeProps { status: "Pending" | "Open" | "Closed"; }
interface PriorityBadgeProps { priority: "Low" | "Medium" | "High"; }
interface ListOfMattersProps {
    setViewData: Dispatch<SetStateAction<any>>;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    searchTerm: string;
    statusFilter: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusStyles = {
        Open: {
            wrapper: "bg-green-100 text-green-800 border-green-200",
            iconColor: "text-green-800",
            Icon: CircleAlert,
        },
        Pending: {
            wrapper: "bg-yellow-100 text-yellow-800 border-yellow-200",
            iconColor: "text-yellow-600",
            Icon: Clock,
        },
        Closed: {
            wrapper: "bg-red-100 text-red-800 border-red-200",
            iconColor: "text-red-800",
            Icon: CircleAlert,
        },
    };

    const { wrapper, iconColor, Icon } = statusStyles[status] || statusStyles.Open;

    return (
        <div className="flex items-center">
            <Icon className={`${iconColor} w-4 h-4 mr-1`} />
            <div className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${wrapper}`}>
                {status}
            </div>
        </div>
    );
};

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
    const styles = {
        Low: "bg-green-100 text-green-800 border-green-200",
        Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
        High: "bg-red-100 text-red-800 border-red-200",
    }[priority];

    return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
            {priority}
        </div>
    );
};

export const ListOfMatters: React.FC<ListOfMattersProps> = ({
    setViewData,
    setIsModalOpen,
    searchTerm,
    statusFilter,
}) => {

    const { token, user } = useAuthStore();
    const { setAllMatters, allMatters } = useGlobalStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["matters", token],
        queryFn: async () => {
            if (!token) throw new Error("No token available");
            return await getAllMatters(token);
        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data?.items) setAllMatters(data.items);
    }, [data, setAllMatters]);

    useEffect(() => {
        if (isError) toast.error("Failed to fetch matters");
    }, [isError]);

    const filteredMatters = useMemo(() => {
        const matters = allMatters ?? [];

        return matters.filter((m) => {
            const matchesSearch =
                !searchTerm ||
                m.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.matterId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || m.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter, allMatters]);

    const handleGetMatterById = async (matterId: string) => {
        try {
            const res = await getMatterById(token as string, matterId);
            setViewData({
                title: res.caseType,
                status: res.status,
                clientId: user?.id ?? null,
                clientName: res.clientName,
                caseType: res.caseType,
                priority: res.priority,
                description: res.description || "",
                matterId: res.matterId,
                assignedAttorney: res.assignedAttorney || "",
            });

            setIsModalOpen(true);
        } catch {
            toast.error("Failed to fetch matter details");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).toUpperCase();
    };

    return (
        <div className="bg-white h-[66vh] rounded-xl shadow-lg border overflow-x-auto">
            {isLoading ? (
                <TableSkeleton rows={8} />
            ) : (
                <table className="min-w-[900px] w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
                        <tr>
                            <th className="px-4 py-3 text-left">Matter Details</th>
                            <th className="px-4 py-3 text-left">Client</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Priority</th>
                            <th className="px-4 py-3 text-left">Documents</th>
                            <th className="px-4 py-3 text-left">Last Activity</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredMatters.map((matter, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 flex items-center">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <div className="ml-4">
                                        <span className="font-medium text-gray-900">{matter.caseType}</span>
                                        <span className="text-sm text-gray-500 block">#{matter.matterId}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="font-medium flex items-center">
                                        <User className="w-4 h-4 text-gray-400 mr-2" />
                                        {matter.clientName}
                                    </span>
                                    <span className="text-sm text-gray-500">{matter.clientCode}</span>
                                </td>

                                <td className="px-4 py-3">
                                    <StatusBadge status={matter.status} />
                                </td>
                                <td className="px-4 py-3">
                                    <PriorityBadge priority={matter.priority} />
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center">
                                            <FileText className="w-4 h-4 mr-1 text-gray-400" />
                                            0
                                        </div>
                                        <div className="flex items-center">
                                            <Archive className="w-4 h-4 mr-1 text-gray-400" />
                                            0
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {formatDate(matter.createdAt)}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-blue-700 cursor-pointer"
                                            onClick={() => handleGetMatterById(matter.matterId)}
                                        >
                                            View
                                        </span>
                                        <UserPlus className="w-4 h-4 text-green-600 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
    <table className="min-w-[900px] w-full text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
            <tr>
                {Array.from({ length: 7 }).map((_, i) => (
                    <th key={i} className="px-4 py-3 text-left">
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                    {Array.from({ length: 7 }).map((_, colIndex) => (
                        <td key={colIndex} className="px-4 py-4">
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);
