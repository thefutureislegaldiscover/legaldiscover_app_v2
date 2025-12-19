import axios from "axios";
import { toast } from "sonner";
import { X, FileText, Download } from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { useState, ChangeEvent, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFileUpload } from "@/hooks/useFileUpload";
import { createMatter, getFile, uploadFile } from "@/services/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MatterFormData {
    title: string;
    status: "Open" | "Pending" | "Closed";
    clientId: string;
    clientName: string;
    caseType: string;
    priority: "High" | "Medium" | "Low";
    matterId?: string;
}

interface CreateMatterProps {
    onClose: () => void;
    viewData?: Partial<MatterFormData>;
}

type FileRecord = {
    clientId?: string;
    tenantId?: string;
    matterId?: string;
    documentId: string;
    fileName: string;
    createdAt?: string;
    s3Bucket?: string;
    s3Key?: string;
};

export const CreateMatter: React.FC<CreateMatterProps> = ({ onClose, viewData }) => {
    const { token, user } = useAuthStore();
    const queryClient = useQueryClient();
    const isViewMode = !!viewData;

    const [formData, setFormData] = useState<MatterFormData>({
        title: viewData?.title || "",
        status: viewData?.status || "Open",
        clientId: user?.id ?? "",
        clientName: viewData?.clientName || "",
        caseType: viewData?.caseType || "",
        priority: viewData?.priority || "Medium",
        matterId: viewData?.matterId,
    });
    const {
        files,
        handleFileChange,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleClick,
        removeFile,
    } = UseFileUpload(isViewMode);
    const [fileRecords, setFileRecords] = useState<FileRecord[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (isViewMode) return;
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: keyof MatterFormData, value: string) => {
        if (isViewMode) return;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const { mutate: createMatterMutate, isPending: isCreating } = useMutation({
        mutationFn: (data: MatterFormData) => createMatter(data, token as string),
        onSuccess: async (res: any) => {
            toast.success(res.message || "Matter created successfully!");

            if (files && files.length > 0) {
                for (const f of files) {
                    if (f.type !== "application/pdf") {
                        toast.error(`${f.name} skipped: only PDFs allowed.`);
                        continue;
                    }

                    try {
                        const meta = await uploadFile({
                            fileName: f.name,
                            type: "upload",
                            clientId: res?.clientId,
                            matterId: res?.matterId,
                        } as any,
                            token as string
                        );

                        if (meta?.uploadUrl) {
                            await axios.put(meta.uploadUrl, f, {
                                headers: { "Content-Type": f.type },
                            });
                            toast.success(`${f.name} uploaded successfully`);
                        } else {
                            toast.error(`No upload URL for ${f.name}`);
                        }
                    } catch {
                        toast.error(`Failed to upload ${f.name}`);
                    }
                }
            }

            await queryClient.invalidateQueries({ queryKey: ["matters"] });
            onClose();
        },
        onError: () => toast.error("Failed to create matter")
    });

    const isFormValid = useMemo(() => {
        return (
            formData.title.trim() !== "" &&
            formData.clientName.trim() !== "" &&
            formData.caseType.trim() !== "" &&
            formData.priority.trim() !== "" &&
            formData.status.trim() !== ""
        );
    }, [formData]);

    const handleCreateMatter = () => {
        if (isViewMode) return;
        if (!isFormValid) return;
        createMatterMutate(formData);
    };

    const { mutate: fetchFiles } = useMutation({
        mutationFn: (data: { clientId?: string; matterId?: string }) => getFile(data as any, token as string),
        onSuccess: (res: any) => {
            setFileRecords(res?.items ?? []);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Failed to load files");
        },
    });

    useEffect(() => {
        if (isViewMode && viewData?.clientId && viewData?.matterId) {
            fetchFiles({ clientId: viewData.clientId, matterId: viewData.matterId });
        }
    }, [isViewMode, viewData?.clientId, viewData?.matterId]);

    const { mutate: download, isPending: isOpenLoading } = useMutation({
        mutationFn: async (f) => {
            const response = await uploadFile(
                {
                    fileName: f?.fileName,
                    type: "download",
                    clientId: f?.clientId,
                    matterId: f?.matterId,
                },
                token as string
            );
            const downloadUrl = response.downloadUrl;
            window.open(downloadUrl, '_blank');
        },
    });



    return (
        <>
            <DialogHeader className="space-y-2 pb-2">
                <DialogTitle className="text-xl font-semibold">
                    {isViewMode ? "View Matter" : "Create New Legal Matter"}
                </DialogTitle>

                <DialogDescription className="text-gray-500">
                    {isViewMode ? "Viewing matter details." : "Fill in the details below to create a new legal matter."}
                </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-auto">
                <div className="flex flex-col space-y-1 md:space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">
                        Matter Title
                    </label>
                    <Input id="title" value={formData.title} onChange={handleInputChange} readOnly={isViewMode} className="h-10" />
                </div>

                <div className="flex flex-col space-y-1 md:space-y-2">
                    <label className="text-sm font-medium text-gray-700">Client Name</label>
                    <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        readOnly={isViewMode}
                        className="h-10"
                    />
                </div>

                <div className="flex flex-col space-y-1 md:space-y-2">
                    <label className="text-sm font-medium text-gray-700">Case Type</label>
                    <Input id="caseType" value={formData.caseType} onChange={handleInputChange} readOnly={isViewMode} className="h-10" />
                </div>
                <div className="flex flex-col space-y-1 md:space-y-2">
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    <Select value={formData.priority} onValueChange={(v) => handleSelectChange("priority", v)} disabled={isViewMode}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col space-y-1 md:space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Select value={formData.status} onValueChange={(v) => handleSelectChange("status", v)} disabled={isViewMode}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <label className="text-sm font-medium text-gray-700">Files</label>
                    </div>

                    {isViewMode && (
                        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                            {fileRecords.length === 0 ? (
                                <div className="px-4 py-3 text-sm text-gray-500">No files uploaded yet.</div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {fileRecords.map((f) => (
                                        <div key={f.documentId} className="px-4 py-3 flex items-center justify-between gap-3">
                                            <div className="min-w-0 flex items-start gap-3">
                                                <div className="mt-0.5">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 truncate">{f.fileName}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="gap-2"
                                                disabled={isOpenLoading}
                                                onClick={() => download(f)}
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {!isViewMode && (
                        <>
                            <label className="text-sm font-medium text-gray-700">Upload Files (max 5)</label>

                            <div
                                className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition hover:bg-gray-50 w-full"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={handleClick}
                            >
                                <p className="text-gray-600 text-sm">Drag & drop files here, or tap to select (PDF only)</p>
                                <p className="text-xs text-gray-400 mt-1">{files.length}/5 files selected</p>
                            </div>

                            <input
                                id="fileInput"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                multiple
                                accept="application/pdf,.pdf"
                            />

                            {files.length > 0 && (
                                <div className="flex flex-col w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm overflow-hidden">
                                    {files.map((f, idx) => (
                                        <div
                                            key={idx}
                                            className="flex w-full justify-between items-center px-4 py-2 border-b border-gray-300
                      hover:bg-gray-100 transition-colors last:border-b-0"
                                        >
                                            <span className="text-sm font-medium text-gray-800 truncate">{f.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-500">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                                                <X className="text-red-400 cursor-pointer" onClick={() => removeFile(idx)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <DialogFooter className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Close
                    </Button>

                    {!isViewMode && (
                        <Button disabled={isCreating || !isFormValid} onClick={handleCreateMatter}>
                            {isCreating ? "Creating..." : "Create Matter"}
                        </Button>
                    )}
                </DialogFooter>
            </div>
        </>
    );
}