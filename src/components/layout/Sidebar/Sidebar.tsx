import React, { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  Home,
  FileText,
  Edit3,
  Settings,
  Users,
  BarChart3,
  Folder,
  Search,
  ChevronRight,
  User,
  Languages,
  PenTool,
  Workflow,
  Bookmark,
  MessageSquare,
  History,
  Plus,
  MoreHorizontal,
  SettingsIcon
} from 'lucide-react';
import { useAppSelector } from '../../../store';
import type { SidebarItem } from '../../../types';
import { sidebarItems, toolItems, chatHistory } from '../../../util/common';

const Sidebar = memo(() => {
  const { sidebarCollapsed } = useAppSelector((state) => state.app);
  const { currentUser } = useAppSelector((state) => state.user);

  const getIcon = (iconName: string) => {
    const icons = {
      Home, FileText, Edit3, Settings, Users, BarChart3, Folder,
      Search, User, Languages, PenTool, Bookmark, MessageSquare, History, SettingsIcon, Workflow
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent size={18} /> : null;
  };

  const renderSidebarItem = (item: SidebarItem, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className={clsx({ 'ml-4': isChild })}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            clsx(
              // Base styles for all sidebar items
              'flex items-center px-3 py-2 rounded-lg transition-colors group relative',
              {
                // When collapsed and not a child item, center the content and reduce padding
                'justify-center px-2': sidebarCollapsed && !isChild,
                // Child items get left padding
                'pl-8': isChild && !sidebarCollapsed,
                // Active state styles
                'sidebar-item-active': isActive,
                // Inactive state styles - hover effects
                'sidebar-item-inactive': !isActive,
              }
            )
          }
        >
          <span className={clsx(
            'flex items-center min-w-0',
            {
              'flex-1': !sidebarCollapsed || isChild,
              'justify-center': sidebarCollapsed && !isChild,
            }
          )}>
            {/* Icon with proper color inheritance */}
            <span className="flex-shrink-0">
              {getIcon(item.icon)}
            </span>
            
            {/* Label - only show when not collapsed or is child item */}
            {(!sidebarCollapsed || isChild) && (
              <>
                <span className="ml-3 truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-500 text-white">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </span>
          
          {/* Chevron for items with children */}
          {hasChildren && !sidebarCollapsed && (
            <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-white transition-colors" />
          )}
        </NavLink>

        {/* Render children when not collapsed */}
        {hasChildren && !sidebarCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => renderSidebarItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 h-full border-r transition-all duration-300 z-30 flex flex-col',
        'bg-[var(--color-sidebar-bg)] border-[var(--color-sidebar-hover)]',
        {
          'w-72': !sidebarCollapsed,
          'w-16': sidebarCollapsed,
        }
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-[var(--color-sidebar-hover)] px-4">
        {!sidebarCollapsed ? (
          <div className="flex items-center space-x-2 w-full">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Edit3 size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Vettam.AI</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Edit3 size={18} className="text-white" />
          </div>
        )}
      </div>

      {/* New Chat Button */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3 border-b border-[var(--color-sidebar-hover)]">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
            <Plus size={16} className="mr-2" />
            New Chat
          </button>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Features Section */}
        <div className="bg-light-purple rounded-lg p-3">
          {!sidebarCollapsed && (
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              <span className='rounded bg-primary-900 px-2 py-1 text-xs font-medium text-white'>
                Features
              </span>
            </h3>
          )}
          <nav className="space-y-1">
            {sidebarItems.map((item) => renderSidebarItem(item))}
          </nav>
        </div>

        {/* Tools Section */}
        <div className="bg-light-purple rounded-lg p-3">
          {!sidebarCollapsed && (
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              <span className='rounded bg-primary-900 px-2 py-1 text-xs font-medium text-white'>
                Tools
              </span>
            </h3>
          )}
          <nav className="space-y-1">
            {toolItems.map((item) => renderSidebarItem(item))}
          </nav>
        </div>

        {/* Chat History Section */}
        {!sidebarCollapsed && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-sidebar-text-muted uppercase tracking-wider">Today</h3>
              <History size={14} className="text-sidebar-text-muted" />
            </div>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <div key={chat.id} className="px-3 py-2 rounded-lg hover:bg-sidebar-hover cursor-pointer transition-colors">
                  <div className="text-sm text-sidebar-text truncate">{chat.title}</div>
                  <div className="text-xs text-sidebar-text-muted mt-1">{chat.timestamp}</div>
                </div>
              ))}
            </div>
            <button className="w-full text-left px-3 py-2 mt-2 text-sm text-sidebar-text-muted hover:text-white transition-colors">
              View more
            </button>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="border-t border-[var(--color-sidebar-hover)] p-3">
        <div
          className={clsx(
            'flex items-center p-2 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer',
            {
              'justify-center': sidebarCollapsed,
            }
          )}
        >
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-sidebar-text truncate">
                  {currentUser?.name || 'Michael Smith'}
                </p>
                <p className="text-xs text-sidebar-text-muted truncate">
                  {currentUser?.email || 'michael@vettam.ai'}
                </p>
              </div>
              <MoreHorizontal size={16} className="text-sidebar-text-muted" />
            </>
          )}
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;