import React, { memo, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { privateRoutes, publicRoutes, adminRoutes } from '../../routes';
import MainLayout from '../layout/MainLayout/MainLayout';
import {ProtectedLayoutWrapper,AdminLayoutWrapper, PublicLayoutWrapper } from '../layout/LayoutWrapper';
import NotFound from '../global/NotFound';
import Loader from '../global/Loader/Loader';

const AppRouter = memo(() => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/app/workspace" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes - without MainLayout */}
        <Route path="/" element={<PublicLayoutWrapper />}>
          {publicRoutes.map((route) => {
            const Component = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component />}
              />
            );
          })}
        </Route>

        {/* Protected Routes with persistent MainLayout */}
        <Route 
          path="/app/*" 
          element={<ProtectedLayoutWrapper />}
        >
          <Route 
            path="*" 
            element={
              <Routes>
                {privateRoutes.map((route) => {
                  const Component = route.component;
                  if (route.index) {
                    return (
                      <Route
                        key={"index" + route.path}
                        index
                        element={
                          <Suspense fallback={<Loader text="Loading..." />}>
                            <Component />
                          </Suspense>
                        }
                      />
                    );
                  }
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <Suspense fallback={<Loader text="Loading..." />}>
                          <Component />
                        </Suspense>
                      }
                    />
                  );
                })}
                <Route path="*" element={<NotFound />} />
              </Routes>
            } 
          />
        </Route>

        {/* Admin Routes with persistent MainLayout */}
        {adminRoutes.length > 0 && (
          <Route 
            path="/admin/*" 
            element={<AdminLayoutWrapper />}
          >
            <Route 
              path="*" 
              element={
                <Routes>
                  {adminRoutes.map((route) => {
                    const Component = route.component;
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <Suspense fallback={<Loader text="Loading..." />}>
                            <Component />
                          </Suspense>
                        }
                      />
                    );
                  })}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              } 
            />
          </Route>
        )}

        {/* Global 404 with layout */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;