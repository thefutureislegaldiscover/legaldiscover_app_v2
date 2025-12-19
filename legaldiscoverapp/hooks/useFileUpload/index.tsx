import { useState } from 'react';

type FileUploadState = {
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleClick: () => void;
  removeFile: (index: number) => void;
};

export const UseFileUpload = (isViewMode: boolean): FileUploadState => {
  const [files, setFiles] = useState<File[]>([]);
  const MAX_FILES = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewMode) return;
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    const allowed = selectedFiles.slice(0, Math.max(0, MAX_FILES - files.length));
    if (allowed.length === 0) return;
    setFiles((prev) => [...prev, ...allowed]);
    e.currentTarget.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isViewMode) {
      e.currentTarget.classList.add('bg-gray-100');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isViewMode) {
      e.currentTarget.classList.remove('bg-gray-100');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isViewMode) return;
    e.currentTarget.classList.remove('bg-gray-100');
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    if (droppedFiles.length === 0) return;
    const allowed = droppedFiles.slice(0, Math.max(0, MAX_FILES - files.length));
    if (allowed.length === 0) return;
    setFiles((prev) => [...prev, ...allowed]);
  };

  const handleClick = () => {
    if (isViewMode) return;
    document.getElementById('fileInput')?.click();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    files,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClick,
    removeFile,
  };
};
