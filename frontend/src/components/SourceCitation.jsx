import React from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';

export default function SourceCitation({ source, onOpenDocument }) {
  if (!source) return null;

  return (
    <button
      className="source-citation-pill"
      onClick={() => onOpenDocument(source.document_id, source.page, source.clause)}
      title={`Open ${source.document_name} at ${source.clause || ''} (Page ${source.page})`}
    >
      <FileText size={15} color="#0284C7" />
      <span>
        {source.document_name || source.standard_number}
        {source.clause ? ` · ${source.clause}` : ''}
        {source.page ? ` · Page ${source.page}` : ''}
      </span>
      <ArrowUpRight size={13} color="#64748B" />
    </button>
  );
}
