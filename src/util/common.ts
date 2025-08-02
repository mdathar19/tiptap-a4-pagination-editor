import type { SidebarItem } from "../types";


export const generateThumbnails = (content:string) => {
        const pages = [];
        const wordsPerPage = 250;
        const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(word => word.length > 0);

        for (let i = 0; i < Math.ceil(words.length / wordsPerPage); i++) {
            const pageWords = words.slice(i * wordsPerPage, (i + 1) * wordsPerPage);
            const pageContent = pageWords.join(' ');
            pages.push({
            id: i + 1,
            content: pageContent,
            preview: pageContent.substring(0, 100) + '...'
            });
    }
    return pages.length > 0 ? pages : [{ id: 1, content: 'Empty page', preview: 'Start writing...' }];
    
};


export const formats = [
  'header', 'font', 'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'align', 'list', 'bullet',
  'link', 'image', 'blockquote', 'code-block', 'indent'
];


export const tabs = [
    { id: 'text', label: 'Text', icon: '📝' },
    { id: 'page', label: 'Page', icon: '📄' },
  ];

  
export const sidebarItems: SidebarItem[] = [
      { id: 'workspace', label: 'Workspace', icon: 'Home', path: '/app/workspace' },
      { id: 'research', label: 'Research', icon: 'Search', path: '/app/research' },
      { id: 'translate', label: 'Translate', icon: 'Languages', path: '/app/translate' },
      { id: 'write', label: 'Write', icon: 'PenTool', path: '/app/write' },
    ];
    
export const toolItems: SidebarItem[] = [
      { id: 'editor', label: 'Editor', icon: 'Edit3', path: '/app/editor' },
      { id: 'bookmarks', label: 'Bookmarks', icon: 'Bookmark', path: '/app/bookmarks' },
      { id: 'documents', label: 'Documents', icon: 'Workflow', path: '/app/documents' },
      { id: 'settings', label: 'Settings', icon: 'SettingsIcon', path: '/app/settings' },
    ];
  
export const chatHistory = [
      { id: '1', title: 'Lorem ipsum dolor sit amet consectetur', timestamp: '2h ago' },
      { id: '2', title: 'Lorem ipsum dolor sit amet consectetur', timestamp: '1d ago' },
      { id: '3', title: 'Lorem ipsum dolor sit amet consectetur', timestamp: '2d ago' },
    ];
  