"use client";

import { useState, useCallback } from "react";
import { UploadCloud, FileType, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
        setStatus("idle");
      } else {
        setStatus("error");
        setMessage("Please upload a valid CSV file.");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setStatus("idle");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Assuming FastAPI runs on 8000
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      setStatus("success");
      setMessage(`Successfully processed ${res.data.total_records} records!`);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.detail || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-50 dark:bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UploadCloud className="w-8 h-8 text-brand-600 dark:text-brand-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Upload Dataset</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Upload your latest customer telecom data in CSV format to run the ETL pipeline and predict churn.
        </p>
      </div>

      <div 
        className={`glass-panel border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${isDragging ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-500/10' : 'border-slate-300 dark:border-slate-700'}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <FileType className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
              Drag & drop your CSV file here
            </p>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              or click below to browse your files
            </p>
            <label className="cursor-pointer bg-brand-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/30">
              Select File
              <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <FileType className="w-8 h-8 text-brand-500" />
            </div>
            <p className="text-lg font-medium text-slate-900 dark:text-white">{file.name}</p>
            <p className="text-sm text-slate-500 mt-1 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setFile(null)}
                className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                disabled={uploading}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="px-6 py-2.5 rounded-xl font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Upload & Process"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {status !== "idle" && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2 ${status === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20'}`}>
          {status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
