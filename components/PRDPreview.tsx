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
    
    // Config optimized for professional documents
    const opt = {
      margin:       [0.75, 0.75, 0.75, 0.75], // Standard document margins (inches)
      filename:     `PRD-${new Date().toISOString().split('T')[0]}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } // Avoid cutting elements
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
      
      {/* Styles for Professional Document Formatting */}
      <style>{`
        /* Typography & Layout */
        .prose {
          max-width: 100%;
          color: #334155;
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
        }
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e2e8f0;
          line-height: 1.2;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          page-break-after: avoid; /* Keep header with content */
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #334155;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          page-break-after: avoid;
        }
        .prose p, .prose ul, .prose ol {
          margin-bottom: 1rem;
        }
        .prose strong {
          color: #0f172a;
          font-weight: 600;
        }

        /* List Styles with deep indentation support */
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        /* Second level nesting */
        .prose ul ul, .prose ol ul, .prose ul ol {
          list-style-type: circle;
          padding-left: 2rem; /* Clear indentation for FRs */
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        /* Third level nesting (e.g. Acceptance Criteria) */
        .prose ul ul ul {
          list-style-type: square;
          padding-left: 2rem;
        }

        /* Tables - Clean & Professional */
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          margin-bottom: 2rem;
          font-size: 0.875rem;
          page-break-inside: avoid; /* Prevent tables from splitting weirdly */
        }
        .prose th {
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 0.75rem;
          text-align: left;
          font-weight: 700;
          color: #1e293b;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
        .prose td {
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          vertical-align: top;
          color: #475569;
        }
        .prose tr:nth-child(even) {
          background-color: #f8fafc;
        }

        /* Scrollbar aesthetics for the preview container */
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

      {/* Document View Wrapper */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none print:w-full">
        {/* Paper Header Visual */}
        <div className="h-4 bg-indigo-600 w-full"></div>
        
        {/* Content Container */}
        <div className="p-10 md:p-16 overflow-y-auto max-h-[80vh] prd-preview print:max-h-none print:p-0">
          <div ref={contentRef} className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
        
         {/* Paper Footer Visual */}
         <div className="h-4 bg-slate-50 border-t w-full"></div>
      </div>
    </div>
  );
};

export default PRDPreview;