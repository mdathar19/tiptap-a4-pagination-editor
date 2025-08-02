import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { 
  setContent, 
  setCurrentPage, 
  setWordsPerPage,
  setHeaderContent,
  setFooterContent,
  goToNextPage,
  goToPreviousPage,
  markDirty
} from '../../../../store/slices/editorSlice';
import Button from '../../../../components/global/Button/Button';
import RightPanel from './RightPanel';
import PaginationControls from './PaginationControls';
import { formats, tabs } from '../../../../util/common';
import { 
  paginateContent, 
  WORDS_PER_PAGE, 
  countWords,
  getPageContent,
  validatePageNumber
} from '../../../../util/pagination';

// Configure Quill fonts
const Font = Quill.import('formats/font');
Font.whitelist = ['avenir', 'arial', 'georgia', 'times-new-roman', 'helvetica', 'calibri'];
Quill.register(Font, true);

const TabbedEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [isPageViewLoading, setIsPageViewLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const { 
    content, 
    currentPage, 
    wordsPerPage, 
    headerContent, 
    footerContent, 
    showHeaderFooter,
    pageViewMode,
    fontSize,
    fontFamily
  } = useAppSelector(state => state.editor);

  // Generate paginated content with memoization for performance
  const pages = useMemo(() => {
    if (!content) return [];
    return paginateContent(content, wordsPerPage);
  }, [content, wordsPerPage]);

  const totalPages = pages.length;
  
  // Get current page data safely
  const currentPageData = useMemo(() => {
    const validPage = validatePageNumber(currentPage, totalPages);
    return pages[validPage - 1] || { content: '', wordCount: 0, preview: 'Empty page' };
  }, [pages, currentPage, totalPages]);

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, false] }],
      [{ 'font': ['avenir', 'arial', 'georgia', 'times-new-roman', 'helvetica', 'calibri'] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true
    }
  }), []);

  // Handle content changes with debouncing for performance
  const handleContentChange = useCallback((value: string) => {
    dispatch(setContent(value));
    dispatch(markDirty());
  }, [dispatch]);

  // Handle page navigation
  const handlePageNavigation = useCallback((pageNumber: number) => {
    const validPageNumber = validatePageNumber(pageNumber, totalPages);
    dispatch(setCurrentPage(validPageNumber));
  }, [dispatch, totalPages]);

  // Handle words per page change
  const handleWordsPerPageChange = useCallback((newWordsPerPage: number) => {
    dispatch(setWordsPerPage(newWordsPerPage));
  }, [dispatch]);

  // Process footer content with template variables
  const processFooterContent = useCallback((footer: string, pageNum: number, totalPgs: number) => {
    return footer
      .replace('{{pageNumber}}', pageNum.toString())
      .replace('{{totalPages}}', totalPgs.toString())
      .replace('{{date}}', new Date().toLocaleDateString());
  }, []);

  // Effect to handle page changes when content changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(totalPages));
    }
  }, [currentPage, totalPages, dispatch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            if (currentPage > 1) {
              dispatch(goToPreviousPage());
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (currentPage < totalPages) {
              dispatch(goToNextPage());
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "primary":"ghost"}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
          
          {/* Page info in tab bar */}
          <div className="ml-auto flex items-center px-4 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages}</span>
            <span className="mx-2">•</span>
            <span>{countWords(content)} words</span>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'text' && (
            <div className="flex-1 flex flex-col h-100 overflow-hidden">
              {/* Editor Toolbar for pagination settings */}
              <div className="border-b border-gray-200 p-2 bg-gray-50 flex items-center space-x-4">
                <label className="text-sm text-gray-600">
                  Words per page:
                  <select
                    value={wordsPerPage}
                    onChange={(e) => handleWordsPerPageChange(parseInt(e.target.value))}
                    className="ml-2 border rounded px-2 py-1 text-xs"
                  >
                    <option value={150}>150</option>
                    <option value={200}>200</option>
                    <option value={250}>250</option>
                    <option value={300}>300</option>
                    <option value={400}>400</option>
                  </select>
                </label>
                
                <div className="text-sm text-gray-600">
                  Current page: {currentPageData.wordCount} words
                </div>
                
                {currentPageData.wordCount > wordsPerPage && (
                  <div className="text-sm text-amber-600">
                    ⚠ Page exceeds word limit
                  </div>
                )}
              </div>
              
              <div className="flex-1 relative">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  style={{ 
                    height: '70vh',
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily
                  }}
                  className="h-full"
                  placeholder="Start writing your document..."
                />
              </div>
            </div>
          )}
          
          {activeTab === 'page' && (
            <div className="flex-1 flex flex-col h-100 overflow-hidden">
              {/* Page View Header */}
              <div className="border-b border-gray-200 p-2 bg-gray-50 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Page View Mode - {currentPageData.wordCount} words on this page
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={headerContent}
                    onChange={(e) => dispatch(setHeaderContent(e.target.value))}
                    placeholder="Header content"
                    className="text-xs border rounded px-2 py-1 w-32"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-auto bg-gray-100">
                <div className="max-w-4xl mx-auto">
                  <div
                    className="bg-white shadow-lg relative"
                    style={{
                      width: '8.5in',
                      minHeight: '6in',
                      padding: '0.5in',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      fontSize: `${fontSize}px`,
                      fontFamily: fontFamily,
                      lineHeight: '1.6'
                    }}
                  >
                    {/* Page Header */}
                    {showHeaderFooter && (
                      <div className="mb-8 text-center border-b pb-4">
                        <h1 className="text-xl font-bold text-gray-800">
                          {headerContent}
                        </h1>
                        <p className="text-xs text-gray-500 mt-2">
                          Page {currentPage} of {totalPages}
                        </p>
                      </div>
                    )}
                    
                    {/* Page Content */}
                    <div 
                      className="prose max-w-none"
                      style={{ 
                        minHeight: '8in',
                        fontSize: 'inherit',
                        fontFamily: 'inherit'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: currentPageData?.content || '<p>This page is empty.</p>' 
                      }}
                    />
                    
                    {/* Page Footer */}
                    {showHeaderFooter && (
                      <div className="absolute bottom-8 left-8 right-8 text-center text-xs text-gray-400 border-t pt-2">
                        <div className="flex justify-between">
                          <span>{headerContent}</span>
                          <span>
                            {processFooterContent(footerContent, currentPage, totalPages)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Page View Pagination Controls */}
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageNavigation}
                content={content}
                wordsPerPage={wordsPerPage}
                variant="page-view"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Right Panel with Page Thumbnails */}
      <RightPanel 
        activeTab={activeTab} 
        pages={pages}
        currentPage={currentPage}
        onPageSelect={handlePageNavigation}
      />
    </div>
  );
};

export default TabbedEditor;