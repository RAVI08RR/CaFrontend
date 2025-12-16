'use client';

import { Upload } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const FileUpload = ({ label, sublabel, className }) => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className={clsx("flex flex-col items-center gap-2", className)}>
      <label className="text-xs font-semibold text-gray-900 dark:text-gray-100">{label}</label>
      <p className="text-xs text-gray-400 dark:text-gray-500">{sublabel}</p>
      <label className="w-full cursor-pointer">
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-center hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all">
          {fileName ? (
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{fileName}</span>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Upload size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Browse File</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
