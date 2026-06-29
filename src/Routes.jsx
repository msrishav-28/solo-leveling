import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import RewardScreen from './pages/reward-screen';
import QuestCompletionModal from './pages/quest-completion-modal';
import LandingPage from './pages/landing-page';
import JobChange from './pages/job-change';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';
import QuestCreationModal from './pages/quest-creation-modal';
import Dungeon from './pages/dungeon';
import DungeonsList from './pages/dungeons';
import Shop from './pages/shop';
import AuthPage from './pages/auth';

const Routes = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public marketing + auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Authenticated product surfaces */}
          <Route path="/job-change" element={<ProtectedRoute><JobChange /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/dungeons" element={<ProtectedRoute><DungeonsList /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/quest-creation-modal" element={<ProtectedRoute><QuestCreationModal /></ProtectedRoute>} />
          <Route path="/quest-completion-modal" element={<ProtectedRoute><QuestCompletionModal /></ProtectedRoute>} />
          <Route path="/reward-screen" element={<ProtectedRoute><RewardScreen /></ProtectedRoute>} />
          <Route path="/dungeon/:id" element={<ProtectedRoute><Dungeon /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
