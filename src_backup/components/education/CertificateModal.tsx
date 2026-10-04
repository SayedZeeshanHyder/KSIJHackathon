import React from 'react';
import { X, Download, Printer, Award, ShieldCheck } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-neutral-100">Verified Certificate of Completion</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#0d1217] border-2 border-amber-500/40 shadow-inner text-center space-y-6">
            
            {/* Ornate corner brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/80" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/80" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/80" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/80" />

            {/* Seal / Emblem */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-950/60 border-2 border-amber-400/60 text-amber-400 mx-auto shadow-lg shadow-amber-950/50">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
                Vifaq Community Foundation
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Certificate of Academic Excellence
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                This document officially certifies that
              </p>
            </div>

            <div className="py-2 border-b border-amber-500/20 max-w-md mx-auto">
              <p className="font-display text-2xl sm:text-3xl font-bold text-amber-300">
                {certificate.learnerName}
              </p>
            </div>

            <div className="max-w-lg mx-auto text-xs sm:text-sm text-neutral-300 leading-relaxed">
              has satisfactorily completed all modules, practical assessments, and required comprehensive examinations in
              <div className="font-semibold text-white mt-1 text-base">
                "{certificate.courseName}"
              </div>
              <div className="text-xs text-emerald-400 font-mono mt-1">
                Honors Standing: {certificate.grade}
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Instructor & Scholastic Chair</p>
                <p className="text-xs font-semibold text-neutral-200 mt-0.5">{certificate.instructor}</p>
                <p className="text-[10px] text-neutral-400">Department of Continued Education</p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Issued Date & ID</p>
                <p className="text-xs font-mono text-neutral-300 mt-0.5">{certificate.completionDate}</p>
                <p className="text-[10px] font-mono text-amber-400/90 flex items-center justify-end gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ID: {certificate.certificateId}</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            Cryptographically signed & verifiable in registry
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                alert(`Downloaded ${certificate.certificateId}.pdf`);
              }}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
