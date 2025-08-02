import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { countWords } from '../../../../util//pagination';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  content: string;
  wordsPerPage: number;
  variant?: 'editor' | 'page-view';
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  content,
  wordsPerPage,
  variant = 'editor'
}) => {
  const totalWords = countWords(content);

  if (variant === 'page-view') {
    return (
      <div className="border-t bg-white p-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
              let pageNum;
              if (totalPages <= 10) {
                pageNum = i + 1;
              } else {
                // Show pages around current page
                const start = Math.max(1, currentPage - 4);
                const end = Math.min(totalPages, start + 9);
                pageNum = start + i;
                if (pageNum > end) return null;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-10 h-10 rounded text-sm ${
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 10 && currentPage < totalPages - 5 && (
              <>
                <span className="px-2 text-gray-400">...</span>
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="w-10 h-10 rounded text-sm bg-white border hover:bg-gray-50 text-gray-700"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Editor variant - compact bottom bar
  return (
    <div className="border-t bg-gray-50 p-3 flex items-center justify-between">
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span>Words: {totalWords}</span>
        <span>•</span>
        <span>Pages: {totalPages}</span>
        <span>•</span>
        <span>Words per page: {wordsPerPage}</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 text-gray-600 hover:text-gray-800 disabled:text-gray-300 rounded hover:bg-gray-200"
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>
    
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 text-gray-600 hover:text-gray-800 disabled:text-gray-300 rounded hover:bg-gray-200"
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;