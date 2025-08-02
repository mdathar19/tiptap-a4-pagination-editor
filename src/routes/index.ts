import { lazy } from 'react';
import type { RouteConfig } from '../types';

export const publicRoutes: RouteConfig[] = [
  {
    path: 'login',
    component: lazy(() => import('../modules/auth/pages/Login')),
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    path: '',
    component: lazy(() => import('../modules/dashboard/pages/Dashboard')),
    index: true,
  },
  {
    path: 'workspace',
    component: lazy(() => import('../modules/dashboard/pages/Dashboard')),
  },
  {
    path: 'editor',
    component: lazy(() => import('../modules/editor/pages/EditorPage')),
  },
  {
    path: 'write',
    component: lazy(() => import('../modules/editor/pages/EditorPage')),
  },
  {
    path: 'documents',
    component: lazy(() => import('../modules/documents/pages/Documents')),
  },
  {
    path: 'settings',
    component: lazy(() => import('../modules/settings/pages/Settings')),
  },
];

export const adminRoutes: RouteConfig[] = [
  // Uncomment and add your admin routes here
  // {
  //   path: 'dashboard',
  //   component: lazy(() => import('../modules/admin/pages/AdminDashboard')),
  // },
  // {
  //   path: 'users',
  //   component: lazy(() => import('../modules/admin/pages/UserManagement')),
  // },
];

export const allRoutes = [...publicRoutes, ...privateRoutes, ...adminRoutes];