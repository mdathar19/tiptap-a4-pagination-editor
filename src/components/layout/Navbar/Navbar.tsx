import React, { memo, useCallback } from 'react';
import { clsx } from 'clsx';
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Maximize2,
  Save,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { toggleSidebar, setTheme } from '../../../store/slices/appSlice';
import { saveDocument } from '../../../store/slices/editorSlice';
import Button from '../../global/Button/Button';

const Navbar = memo(() => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, theme } = useAppSelector((state) => state.app);
  const { currentUser } = useAppSelector((state) => state.user);
  const { isDirty, selectedDocument } = useAppSelector((state) => state.editor);

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const handleToggleTheme = useCallback(() => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  }, [dispatch, theme]);

  const handleSaveDocument = useCallback(() => {
    if (isDirty && selectedDocument) {
      dispatch(saveDocument());
    }
  }, [dispatch, isDirty, selectedDocument]);

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 h-16 bg-white border-b border-secondary-200 z-20 transition-all duration-300',
        {
          'left-70': !sidebarCollapsed,
          'left-16': sidebarCollapsed,
        }
      )}
    >
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleSidebar}
            className="p-2"
          >
            <Menu size={20} />
          </Button>

          {/* Search */}
          <div className="hidden md:flex items-center bg-secondary-50 rounded-lg px-3 py-2 w-96">
            <Search size={16} className="text-secondary-400 mr-2" />
            <input
              type="text"
              placeholder="Search documents, files, and more..."
              className="bg-transparent border-none outline-none flex-1 text-sm placeholder-secondary-400"
            />
            <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-mono text-secondary-500 border border-secondary-200 rounded">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Center section - Document actions */}
        <div className="flex items-center space-x-2">
          {selectedDocument && (
            <>
              <span className="text-sm text-secondary-600 font-medium">
                {selectedDocument.title}
              </span>
              {isDirty && (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveDocument}
                    leftIcon={<Save size={14} />}
                  >
                    Save
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleTheme}
            className="p-2"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hidden lg:flex"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
          >
            <Maximize2 size={18} />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="p-2 relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="p-2">
            <Settings size={18} />
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-3 pl-3 border-l border-secondary-200">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-secondary-900">
                {currentUser?.name || 'John Doe'}
              </p>
              <p className="text-xs text-secondary-500">
                {currentUser?.role || 'User'}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;