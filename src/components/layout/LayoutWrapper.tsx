import { memo, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store';
import Loader from '../global/Loader/Loader';
import MainLayout from './MainLayout/MainLayout';

export const ProtectedLayoutWrapper = memo(() => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
});

export const AdminLayoutWrapper = memo(() => {
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser?.role !== 'admin') {
    return <Navigate to="/app/workspace" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
});

export const PublicLayoutWrapper = memo(() => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/app/workspace" replace />;
  }

  return (
    <Suspense fallback={<Loader fullScreen text="Loading application..." />}>
      <Outlet />
    </Suspense>
  );
});

ProtectedLayoutWrapper.displayName = 'ProtectedLayoutWrapper';
AdminLayoutWrapper.displayName = 'AdminLayoutWrapper';
PublicLayoutWrapper.displayName = 'PublicLayoutWrapper';