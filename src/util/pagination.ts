// pagination.ts - Utility functions for content pagination

export const WORDS_PER_PAGE = 200;
export const CHARACTERS_PER_LINE = 80;
export const LINES_PER_PAGE = 35;

/**
 * Count words in HTML content
 */
export const countWords = (htmlContent: string): number => {
  if (!htmlContent) return 0;
  const textContent = htmlContent
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return textContent ? textContent.split(' ').length : 0;
};

/**
 * Strip HTML tags from content
 */
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Generate a preview text for a page
 */
export const generatePreview = (content: string): string => {
  const plainText = stripHtml(content);
  const maxLength = 150;
  return plainText.length <= maxLength ? plainText : plainText.substring(0, maxLength) + '...';
};

/**
 * Page object interface
 */
export interface Page {
  id: number;
  content: string;
  wordCount: number;
  preview: string;
}

/**
 * Split content into pages based on word count
 */
export const paginateContent = (
  content: string,
  wordsPerPage: number = WORDS_PER_PAGE
): Page[] => {
  if (!content) {
    return [
      {
        id: 1,
        content: '',
        wordCount: 0,
        preview: 'Empty document',
      },
    ];
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');
    const container = doc.body.firstChild as HTMLElement;

    if (!container || !container.children || container.children.length === 0) {
      const wordCount = countWords(content);
      return [
        {
          id: 1,
          content,
          wordCount,
          preview: generatePreview(content),
        },
      ];
    }

    const elements = Array.from(container.children);
    const pages: Page[] = [];
    let currentPageContent = '';
    let currentWordCount = 0;
    let pageNumber = 1;

    elements.forEach((element, index) => {
      const html = (element as HTMLElement).outerHTML;
      const elementText = stripHtml(html);
      const elementWordCount = elementText.split(' ').filter(Boolean).length;

      if (currentWordCount + elementWordCount > wordsPerPage && currentPageContent) {
        pages.push({
          id: pageNumber++,
          content: currentPageContent,
          wordCount: currentWordCount,
          preview: generatePreview(currentPageContent),
        });

        currentPageContent = html;
        currentWordCount = elementWordCount;
      } else {
        currentPageContent += html;
        currentWordCount += elementWordCount;
      }

      if (index === elements.length - 1 && currentPageContent) {
        pages.push({
          id: pageNumber,
          content: currentPageContent,
          wordCount: currentWordCount,
          preview: generatePreview(currentPageContent),
        });
      }
    });

    return pages.length > 0
      ? pages
      : [
          {
            id: 1,
            content,
            wordCount: countWords(content),
            preview: generatePreview(content),
          },
        ];
  } catch (error) {
    console.error('Error parsing content for pagination:', error);
    return [
      {
        id: 1,
        content,
        wordCount: countWords(content),
        preview: generatePreview(content),
      },
    ];
  }
};

/**
 * Calculate reading time for content
 */
export const calculateReadingTime = (
  content: string,
  wordsPerMinute: number = 200
): number => {
  const wordCount = countWords(content);
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Get page content by page number
 */
export const getPageContent = (
  content: string,
  pageNumber: number,
  wordsPerPage: number = WORDS_PER_PAGE
): Page | null => {
  const pages = paginateContent(content, wordsPerPage);
  return pages.find((page) => page.id === pageNumber) || null;
};

/**
 * Validate page number
 */
export const validatePageNumber = (
  pageNumber: number,
  totalPages: number
): number => {
  return Math.max(1, Math.min(pageNumber, totalPages));
};

/**
 * Navigation info interface
 */
export interface NavigationInfo {
  hasPrevious: boolean;
  hasNext: boolean;
  isFirst: boolean;
  isLast: boolean;
  previousPage: number | null;
  nextPage: number | null;
}

/**
 * Generate page navigation info
 */
export const getNavigationInfo = (
  currentPage: number,
  totalPages: number
): NavigationInfo => {
  return {
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
    isFirst: currentPage === 1,
    isLast: currentPage === totalPages,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };
};
