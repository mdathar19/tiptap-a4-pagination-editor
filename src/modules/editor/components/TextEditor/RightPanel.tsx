import React from 'react';
import { FileText, Search, Share2, Eye } from 'lucide-react';

interface RightPanelProps {
  activeTab: string;
  pages: Array<{
    id: number;
    content: string;
    wordCount: number;
    preview: string;
  }>;
  currentPage: number;
  onPageSelect: (page: number) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ 
  activeTab, 
  pages, 
  currentPage, 
  onPageSelect 
}) => {
  const totalWords = pages.reduce((sum, page) => sum + page.wordCount, 0);

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">
            {activeTab === 'text' ? 'Page Thumbnails' : 'Document Pages'}
          </h3>
          <div className="flex space-x-2">
            <button 
              className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              title="Document Properties"
            >
              <FileText size={16} />
            </button>
            <button 
              className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              title="Search in Document"
            >
              <Search size={16} />
            </button>
            <button 
              className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              title="Share Document"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Document Stats */}
        <div className="mt-2 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>{pages.length} pages</span>
            <span>{totalWords} words</span>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-3">
          {pages.map((page) => (
            <div 
              key={page.id} 
              className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                currentPage === page.id 
                  ? 'border-blue-300 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => onPageSelect(page.id)}
            >
              {/* Thumbnail Preview */}
              <div className="bg-white rounded shadow-sm h-24 p-2 text-xs overflow-hidden border">
                <div 
                  className="text-gray-600 leading-tight line-clamp-6"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {page.preview}
                </div>
              </div>
              
              {/* Page Info */}
              <div className="mt-2 flex items-center justify-between">
                <p className={`text-xs font-medium ${
                  currentPage === page.id ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  Page {page.id}
                </p>
                
                {currentPage === page.id && (
                  <Eye size={12} className="text-blue-500" />
                )}
              </div>
              
              {/* Word Count */}
              <div className="text-xs text-gray-500 mt-1">
                {page.wordCount} words
              </div>
              
              {/* Progress bar for word density */}
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full ${
                    currentPage === page.id ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ 
                    width: `${Math.min(100, (page.wordCount / 250) * 100)}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Add New Page Button */}
        <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 cursor-pointer transition-colors">
          <div className="text-gray-400 text-xs">
            <span className="text-lg">+</span>
            <div>Continue writing to add more pages</div>
          </div>
        </div>
      </div>

      {/* Panel Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 bg-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Format:</span>
            <span className="font-medium">PDF Ready</span>
          </div>
          <div className="flex justify-between">
            <span>Total Words:</span>
            <span className="font-medium">{totalWords}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Page:</span>
            <span className="font-medium">{currentPage} of {pages.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Modified:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RightPanel);