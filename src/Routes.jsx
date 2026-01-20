import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RewardScreen from './pages/reward-screen';
import QuestCompletionModal from './pages/quest-completion-modal';
import LandingPage from './pages/landing-page';
import JobChange from './pages/job-change';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';
import QuestCreationModal from './pages/quest-creation-modal';
import Dungeon from './pages/dungeon';
import AuthPage from './pages/auth';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/job-change" element={<JobChange />} />
          <Route path="/reward-screen" element={<RewardScreen />} />
          <Route path="/quest-completion-modal" element={<QuestCompletionModal />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quest-creation-modal" element={<QuestCreationModal />} />
          <Route path="/dungeon/:id" element={<Dungeon />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
