"use client"

import { discoveryDocuments } from "@/lib/discovery-data";
import { Button } from "../ui/button";
import { RefreshCw, Lock, MoreHorizontal, Download, Eye, Settings, Brain, FileText, Mail, Table, File, Shield } from "lucide-react";

type Document = typeof discoveryDocuments[number] & {
    dateUploaded: string;
    isPrivileged: boolean;
    isConfidential: boolean;
};

const BADGE_STYLES: { [key: string]: { text: string; bg: string } } = {
    reviewed: { text: "text-blue-800", bg: "bg-blue-100" },
    produced: { text: "text-green-700", bg: "bg-green-100" },
    approved: { text: "text-green-700", bg: "bg-green-100" },
    pending: { text: "text-yellow-700", bg: "bg-yellow-100" },
    withheld: { text: "text-red-700", bg: "bg-red-100" },
    "high risk": { text: "text-red-600", bg: "bg-red-100" },
    "medium risk": { text: "text-orange-600", bg: "bg-orange-100" },
    "low risk": { text: "text-green-600", bg: "bg-green-100" },
    contract: { text: "text-indigo-800", bg: "bg-indigo-100" },
    amendment: { text: "text-purple-800", bg: "bg-purple-100" },
    techcorp: { text: "text-pink-800", bg: "bg-pink-100" },
    email: { text: "text-purple-800", bg: "bg-purple-100" },
    settlement: { text: "text-red-800", bg: "bg-red-100" },
    privileged: { text: "text-orange-800", bg: "bg-orange-100" },
    financial: { text: "text-teal-800", bg: "bg-teal-100" },
    statements: { text: "text-cyan-800", bg: "bg-cyan-100" },
    q4: { text: "text-lime-800", bg: "bg-lime-100" },
};

const getBadgeStyles = (key: string) => {
    return BADGE_STYLES[key.toLowerCase()] ?? {
        text: "text-gray-600",
        bg: "bg-gray-100",
    };
};

const FileIcon = ({ type }: { type: string }) => {
    const t = type.toUpperCase();
    if (t === "PDF") return <FileText className="w-5 h-5 text-red-500" />;
    if (t === "EMAIL") return <Mail className="w-5 h-5 text-purple-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
};

const StatusBadge = ({ status }: { status: string }) => {
    const { text, bg } = getBadgeStyles(status);
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${bg} ${text}`}>
            {status}
        </span>
    );
};

export const DocumentsTable = ({ view }: { view: "list" | "grid" }) => {
    const documentsWithTags: (Document & { fileTags: string[] })[] = discoveryDocuments.map((doc) => {
        let fileTags: string[] = [];
        if (doc.name.includes('Contract')) fileTags = ['contract', 'amendment', 'techcorp', '+1'];
        if (doc.name.includes('Email_Chain')) fileTags = ['email', 'settlement', 'privileged', '+1'];
        if (doc.name.includes('Financial_Statements')) fileTags = ['financial', 'statements', 'q4', '+1'];

        return {
            ...doc as Document,
            dateUploaded: doc.name.includes('Contract') ? '15/01/2024' : doc.name.includes('Email') ? '14/01/2024' : '12/01/2024',
            isPrivileged: doc.name.includes('Email'),
            isConfidential: true,
            fileTags: fileTags,
        }
    });

    return (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100">
            <Header />
            {view === "grid" ? (
                <GridView documents={documentsWithTags} />
            ) : (
                <TableView documents={documentsWithTags} />
            )}
        </div>
    );
};

const Header = () => (
    <div className="flex justify-between p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center space-x-2">
            <input
                type="checkbox"
                className="rounded text-violet-600 focus:ring-violet-500"
            />
            <span className="text-sm text-gray-700">Select All</span>
            <span className="text-sm text-gray-500">
                {discoveryDocuments.length} documents found
            </span>
        </div>
        <div className="flex flex-wrap gap-3 space-x-2">
            <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </Button>
            <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-1" /> Columns
            </Button>
        </div>
    </div>
);

const GridView = ({ documents }: { documents: (Document & { fileTags: string[] })[] }) => (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((doc, index) => (
            <DocumentCard key={index} doc={doc} />
        ))}
    </div>
);

const DocumentCard = ({ doc }: { doc: Document & { fileTags: string[] } }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    className="rounded-md w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                />
                <FileIcon type={doc.type} />
            </div>

            <div className="flex space-x-1">
                {doc.isConfidential && <div title="Confidential"><Lock className="w-4 h-4 text-orange-500" /></div>}
                {doc.isPrivileged && <div title="Privileged"><Shield className="w-4 h-4 text-red-500" /></div>}
            </div>
        </div>

        <p className="text-sm font-medium text-gray-900 mb-2 truncate" title={doc.name}>
            {doc.name}
        </p>

        <div className="space-y-2 mb-3">
            <div className="flex justify-between text-xs">
                <span className="text-gray-500">Size:</span>
                <span className="text-gray-700">{doc.size}</span>
            </div>
            <div className="flex justify-between text-xs">
                <span className="text-gray-500">Relevance:</span>
                <span className="text-gray-700">{doc.relevance}%</span>
            </div>
            <div className="flex justify-between text-xs">
                <span className="text-gray-500">Uploaded:</span>
                <span className="text-gray-700">{doc.dateUploaded}</span>
            </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
            {doc.fileTags.map((tag, i) => (
                <StatusBadge key={i} status={tag} />
            ))}
        </div>

        <div className="flex space-x-2">
            <Button
                variant="ghost"
                className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
            >
                <Eye className="w-5 h-5" /> View
            </Button>
            <div className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
                <Download className="w-3 h-3" />
            </div>
        </div>
    </div>
);

const TableView = ({ documents }: { documents: (Document & { fileTags: string[] })[] }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <TableHead />
            <TableBody documents={documents} />
        </table>
    </div>
);

const TableHead = () => (
    <thead className="bg-gray-50">
        <tr>
            {["",
                "Document",
                "Type",
                "Size",
                "Relevance",
                "Status",
                "AI Analysis",
                "Actions",
            ].map((header, i) => (
                <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                    {i === 0 ? (
                        <input type="checkbox" className="rounded text-violet-600" />
                    ) : (
                        header
                    )}
                </th>
            ))}
        </tr>
    </thead>
);

const TableBody = ({ documents }: { documents: (Document & { fileTags: string[] })[] }) => (
    <tbody className="bg-white divide-y divide-gray-200">
        {documents.map((doc, index) => {
            const aiStyles = getBadgeStyles(doc.aiRisk);
            return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                        <input type="checkbox" className="rounded text-violet-600 focus:ring-violet-500" />
                    </td>

                    <td className="px-4 py-3 min-w-0">
                        <div className="flex items-center gap-2">
                            <FileIcon type={doc.type} />
                            <div>
                                <div className="text-sm font-medium text-gray-900 truncate">{doc.name}</div>
                                <div className="text-xs text-gray-500">Uploaded by {doc.uploader}</div>
                            </div>
                        </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-[5px] text-sm text-gray-900 uppercase">
                            {doc.isPrivileged && <span title="Privileged" className="flex"><Shield className="ml-[-20px] w-4 h-4 text-red-500" /></span>}
                            {doc.isConfidential && <span title="Confidential" className="flex"><Lock className="w-4 h-4 text-orange-500 mr-2" /></span>}
                            {doc.type}
                        </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-900">
                        {doc.size}
                    </td>

                    <td className="px-4 py-5 whitespace-nowrap flex items-center gap-2">
                        <div className="h-1.5 w-full bg-blue-100 rounded-full">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${doc.relevance}%` }}
                            ></div>
                        </div>
                        <div className="text-sm font-medium text-gray-700 w-[40px] text-right">{doc.relevance}%</div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                            {doc.statusBadges.map(status => (
                                <StatusBadge key={status} status={status} />
                            ))}
                        </div>
                    </td>

                    <td className="px-4 py-3 min-w-0">
                        <div className="flex items-center gap-2">
                            <Brain className={`w-4 h-4 text-purple-500`} />
                            <div className="min-w-0">
                                <div className={`font-medium text-xs whitespace-nowrap ${aiStyles.text}`}>
                                    {doc.aiRisk}
                                </div>
                                <div className="text-xs text-gray-500 truncate">{doc.aiAnalysis}</div>
                            </div>
                        </div>
                    </td>

                    <td className="flex justify-end space-x-2 px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <Eye className="cursor-pointer w-4 h-4 text-blue-600 hover:text-blue-900 rounded-full hover:bg-gray-100" />
                            <Download className="cursor-pointer w-4 h-4 text-gray-600 hover:text-blue-900 rounded-full hover:bg-gray-100" />
                            <MoreHorizontal className="cursor-pointer w-4 h-4 text-gray-600 hover:text-blue-900 rounded-full hover:bg-gray-100" />
                    </td>
                </tr>
            );
        })}
    </tbody>
)