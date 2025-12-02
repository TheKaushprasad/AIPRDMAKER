import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, ArrowLeft, Edit3, Copy, Check } from 'lucide-react';
import remarkGfm from 'remark-gfm';

interface PRDPreviewProps {
  content: string;
  onEdit: () => void;
  onNew: () => void;
}

const PRDPreview: React.FC<PRDPreviewProps> = ({ content, onEdit, onNew }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleDownloadPDF = () => {
    if (!contentRef.current) return;
    
    const element = contentRef.current;
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5], 
      filename:     `PRD-${new Date().toISOString().split('T')[0]}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (window.html2pdf) {
        window.html2pdf().from(element).set(opt).save();
    } else {
        alert("PDF generator library not loaded. Please try printing using browser (Ctrl+P).");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4 sm:px-6">
      
      {/* Styles for Tables and Printing */}
      <style>{`
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }
        .prose th {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #1e293b;
        }
        .prose td {
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          vertical-align: top;
          color: #334155;
        }
        .prose tr:nth-child(even) {
          background-color: #fcfcfc;
        }
        .prose h1 {
            font-size: 2.25rem;
            margin-bottom: 2rem;
            color: #0f172a;
        }
        .prose h2 {
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
          font-size: 1.5rem;
          color: #1e293b;
        }
        .prose h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          color: #334155;
        }
        /* Hide scrollbar for clean UI but keep scroll functionality */
        .prd-preview::-webkit-scrollbar {
          width: 8px;
        }
        .prd-preview::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .prd-preview::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
      `}</style>

      {/* Toolbar */}
      <div className="w-full max-w-5xl flex flex-wrap justify-between items-center mb-6 gap-4">
         <button 
          onClick={onNew}
          className="flex items-center text-slate-600 hover:text-indigo-600 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Create New
        </button>

        <div className="flex gap-3">
          <button 
            onClick={onEdit}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition shadow-sm font-medium text-sm"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Inputs
          </button>
          
           <button 
            onClick={handleCopy}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition shadow-sm font-medium text-sm"
          >
            {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>

          <button 
            onClick={handleDownloadPDF}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm font-medium text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Document View */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none print:w-full">
        {/* Paper Header */}
        <div className="h-4 bg-indigo-600 w-full"></div>
        
        <div className="p-10 md:p-16 overflow-y-auto max-h-[80vh] prd-preview print:max-h-none print:p-0">
          <div ref={contentRef} className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
         {/* Paper Footer */}
         <div className="h-4 bg-slate-50 border-t w-full"></div>
      </div>
    </div>
  );
};

export default PRDPreview;