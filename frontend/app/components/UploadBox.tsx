"use client";
import { useState } from "react";
import { uploadFile } from "../lib/uploadfile";

const UploadBox = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }
    setFile(selected);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadFile(file, setProgress);
      console.log("Upload success:", res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
      <h1 className="text-2xl text-white font-semibold text-center mb-4">
        Upload Your Resume
      </h1>

      {/* Upload box */}
      <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 transition">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="cursor-pointer text-gray-300">
          📄 Click to upload PDF
        </label>
      </div>

  
      {file && (
        <div className="mt-4 flex items-center gap-3 border border-gray-600 rounded-xl px-4 py-3 bg-white/5">
          <div className="text-3xl">📄</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{file.name}</p>
           <p className="text-gray-400 text-xs mt-0.5">
  {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
</p>
          </div>
          <button
            onClick={() => setFile(null)}
            className="text-gray-500 hover:text-red-400 text-lg transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Progress */}
      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-1">Uploading: {progress}%</p>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg transition"
      >
        {loading ? "Uploading..." : "Analyze Resume"}
      </button>
    </div>
  );
};

export default UploadBox;