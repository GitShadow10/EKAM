import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { UploadView } from './components/UploadView';
import { ReviewQueueView } from './components/ReviewQueueView';
import { BridgeMapView } from './components/BridgeMapView';
import { MaterialDetailView } from './components/MaterialDetailView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { CLUSTERS_DATA } from './data/mockData';
import { NavigationPath, ClusterCandidate } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavigationPath>('dashboard');
  const [selectedCluster, setSelectedCluster] = useState<ClusterCandidate>(CLUSTERS_DATA[0]);
  const [selectedCpse, setSelectedCpse] = useState('All CPSEs (Consolidated)');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCluster = (cluster: ClusterCandidate) => {
    setSelectedCluster(cluster);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Global Sovereign Header (56px) */}
      <Header
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        selectedCpse={selectedCpse}
        onSelectCpse={setSelectedCpse}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Workspace with Fixed Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          currentPath={currentPath}
          onNavigate={setCurrentPath}
          pendingReviewsCount={14}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full">
          {currentPath === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentPath}
              onSelectCluster={handleSelectCluster}
              selectedCpse={selectedCpse}
            />
          )}

          {currentPath === 'upload' && (
            <UploadView
              onNavigate={setCurrentPath}
              onSelectCluster={handleSelectCluster}
            />
          )}

          {currentPath === 'review' && (
            <ReviewQueueView
              selectedCluster={selectedCluster}
              onSelectCluster={handleSelectCluster}
              onNavigate={setCurrentPath}
            />
          )}

          {currentPath === 'bridge-map' && (
            <BridgeMapView onNavigate={setCurrentPath} />
          )}

          {currentPath === 'material-detail' && (
            <MaterialDetailView onNavigate={setCurrentPath} />
          )}

          {currentPath === 'reports' && (
            <ReportsView onNavigate={setCurrentPath} />
          )}

          {currentPath === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
