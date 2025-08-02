export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: SidebarItem[];
  badge?: string | number;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  isShared: boolean;
}

export interface EditorState {
  content: string;
  isEditing: boolean;
  isDirty: boolean;
  selectedDocument?: Document;
}

export interface AppState {
  user: User | null;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  editor: EditorState;
}

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  index?: boolean;
}