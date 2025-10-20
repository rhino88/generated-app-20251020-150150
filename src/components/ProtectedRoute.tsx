import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import AppHeader from './AppHeader';
const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream dark:bg-brand-navy">
      <AppHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
        Disclaimer: Video generation is handled by a third-party AI model and has usage limits.
      </footer>
    </div>
  );
};
export default ProtectedRoute;