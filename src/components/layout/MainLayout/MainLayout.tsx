import React, { memo, Suspense } from 'react';
import { clsx } from 'clsx';
import { useAppSelector } from '../../../store';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Loader from '../../global/Loader/Loader';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { sidebarCollapsed, loading } = useAppSelector((state) => state.app);

  return (
    <div className="min-h-screen bg-secondary-50">
      <Sidebar />
      <Navbar />
      
      <main
        className={clsx(
          'pt-16 transition-all duration-300 min-h-screen',
          {
            'ml-64': !sidebarCollapsed,
            'ml-16': sidebarCollapsed,
          }
        )}
      >
        <div className="p-6 mx-5">
            {children}
        </div>
      </main>

      {loading && <Loader fullScreen text="Processing..." />}
    </div>
  );
};

MainLayout.displayName = 'MainLayout';

export default MainLayout;