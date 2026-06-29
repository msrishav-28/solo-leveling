import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SystemBackground from './cinematic/SystemBackground';

/**
 * Gate for authenticated-only routes. While the session is resolving we show a
 * cinematic loader; once resolved, an unauthenticated visitor is redirected to
 * /auth (remembering where they were headed) and an authenticated one passes
 * through.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void text-mana">
        <SystemBackground />
        <div className="glass scanline relative z-10 px-8 py-6 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
          Verifying System Access...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
