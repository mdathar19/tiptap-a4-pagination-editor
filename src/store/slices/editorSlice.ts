import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Document } from '../../types';

interface EditorState {
  content: string;
  isEditing: boolean;
  isDirty: boolean;
  selectedDocument: Document | null;
  documents: Document[];
  fontSize: number;
  fontFamily: string;
  // Pagination-related state
  currentPage: number;
  wordsPerPage: number;
  showPageBreaks: boolean;
  pageViewMode: 'single' | 'continuous';
  headerContent: string;
  footerContent: string;
  showHeaderFooter: boolean;
}

const initialState: EditorState = {
  content: `<h1>Do Androids Dream of Electric Sheep?</h1>
    <p>Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco, the story unfolds after a devastating nuclear war.</p>
    
    <ol>
      <li><strong>Androids and Humans:</strong> The novel explores the uneasy coexistence of humans and androids. Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.</li>
      <li><strong>Empathy and Identity:</strong> To distinguish androids from humans, the Voigt-Kampff Test measures emotional responses. Androids lack empathy, making them vulnerable to detection.</li>
    </ol>
    
    <p>The story follows Rick Deckard, a bounty hunter tasked with "retiring" escaped androids. These androids are nearly indistinguishable from humans, possessing advanced artificial intelligence and emotional responses.</p>
    
    <p>Philip K. Dick masterfully weaves together themes of technology, humanity, and consciousness in this seminal work of science fiction. The novel raises profound questions about the nature of consciousness and what it truly means to be human.</p>
    
    <h2>Key Themes</h2>
    <p>The book introduces the concept of Mercerism, a religion centered around empathy and shared suffering. Humans connect through "empathy boxes," experiencing collective emotions and pain.</p>
    
    <p>The story also explores environmental themes, as Earth's ecosystem has been devastated by nuclear fallout. Real animals have become extremely rare and valuable, leading to a market for artificial animals.</p>`,
  isEditing: false,
  isDirty: false,
  selectedDocument: null,
  documents: [],
  fontSize: 14,
  fontFamily: 'Inter',
  // Pagination state
  currentPage: 1,
  wordsPerPage: 200,
  showPageBreaks: true,
  pageViewMode: 'single',
  headerContent: 'Document Title',
  footerContent: 'Page {{pageNumber}} of {{totalPages}} • {{date}}',
  showHeaderFooter: true,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.isDirty = true;
      // Reset to first page when content changes significantly
      if (state.currentPage > 1) {
        state.currentPage = 1;
      }
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
      if (action.payload) {
        state.content = action.payload.content;
        state.isDirty = false;
        state.currentPage = 1; // Reset to first page
      }
    },
    saveDocument: (state) => {
      if (state.selectedDocument) {
        state.selectedDocument.content = state.content;
        state.selectedDocument.updatedAt = new Date();
        state.isDirty = false;
      }
    },
    updateDocumentTitle: (state, action: PayloadAction<string>) => {
      if (state.selectedDocument) {
        state.selectedDocument.title = action.payload;
        state.selectedDocument.updatedAt = new Date();
        state.headerContent = action.payload;
        
        // Also update in documents array
        const index = state.documents.findIndex(doc => doc.id === state.selectedDocument?.id);
        if (index !== -1) {
          state.documents[index].title = action.payload;
          state.documents[index].updatedAt = new Date();
        }
      }
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
      if (state.selectedDocument?.id === action.payload) {
        state.selectedDocument = null;
        state.content = '';
        state.isDirty = false;
        state.currentPage = 1;
      }
    },
    // Pagination actions
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Math.max(1, action.payload);
    },
    setWordsPerPage: (state, action: PayloadAction<number>) => {
      state.wordsPerPage = Math.max(50, Math.min(500, action.payload));
      // Reset to first page when words per page changes
      state.currentPage = 1;
    },
    setPageViewMode: (state, action: PayloadAction<'single' | 'continuous'>) => {
      state.pageViewMode = action.payload;
    },
    setShowPageBreaks: (state, action: PayloadAction<boolean>) => {
      state.showPageBreaks = action.payload;
    },
    setHeaderContent: (state, action: PayloadAction<string>) => {
      state.headerContent = action.payload;
    },
    setFooterContent: (state, action: PayloadAction<string>) => {
      state.footerContent = action.payload;
    },
    setShowHeaderFooter: (state, action: PayloadAction<boolean>) => {
      state.showHeaderFooter = action.payload;
    },
    // Navigation actions
    goToNextPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    goToPreviousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage = state.currentPage - 1;
      }
    },
    goToFirstPage: (state) => {
      state.currentPage = 1;
    },
    goToLastPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload; // totalPages
    },
    // Font and styling actions
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = Math.max(8, Math.min(72, action.payload));
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    // Utility actions
    resetEditor: (state) => {
      state.content = '';
      state.currentPage = 1;
      state.isDirty = false;
      state.isEditing = false;
    },
    markDirty: (state) => {
      state.isDirty = true;
    },
    markClean: (state) => {
      state.isDirty = false;
    }
  },
});

// Export actions
export const {
  setContent,
  setIsEditing,
  setSelectedDocument,
  saveDocument,
  updateDocumentTitle,
  addDocument,
  removeDocument,
  setCurrentPage,
  setWordsPerPage,
  setPageViewMode,
  setShowPageBreaks,
  setHeaderContent,
  setFooterContent,
  setShowHeaderFooter,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  setFontSize,
  setFontFamily,
  resetEditor,
  markDirty,
  markClean
} = editorSlice.actions;

// Export reducer
export default editorSlice.reducer;

// Selectors
export const selectEditorState = (state: { editor: EditorState }) => state.editor;
export const selectCurrentPageContent = (state: { editor: EditorState }) => {
  // This would be used with pagination utility to get current page content
  return state.editor.content;
};
export const selectPaginationSettings = (state: { editor: EditorState }) => ({
  currentPage: state.editor.currentPage,
  wordsPerPage: state.editor.wordsPerPage,
  showPageBreaks: state.editor.showPageBreaks,
  pageViewMode: state.editor.pageViewMode,
  headerContent: state.editor.headerContent,
  footerContent: state.editor.footerContent,
  showHeaderFooter: state.editor.showHeaderFooter
});