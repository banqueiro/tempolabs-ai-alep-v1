import React, { useState } from "react";
import { Bell } from "lucide-react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import ProcessStatusOverview from "./dashboard/ProcessStatusOverview";
import ProcessFilters from "./dashboard/ProcessFilters";
import ProcessTable from "./dashboard/ProcessTable";
import NotificationPanel from "./notifications/NotificationPanel";
import ProcessDetailsModal from "./process/ProcessDetailsModal";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [processDetailsOpen, setProcessDetailsOpen] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(
    null,
  );

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
  };

  const handleViewProcess = (processId: string) => {
    setSelectedProcessId(processId);
    setProcessDetailsOpen(true);
  };

  const handleEditProcess = (processId: string) => {
    setSelectedProcessId(processId);
    setProcessDetailsOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Dashboard"
          onToggleSidebar={toggleSidebar}
          notificationCount={5}
          userName="Ana Silva"
          userRole="Analista de Processos"
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Process Status Overview */}
            <ProcessStatusOverview
              totalProcesses={124}
              awaitingAnalysis={45}
              approved={32}
              pending={28}
              delayed={19}
            />

            {/* Process Filters */}
            <ProcessFilters
              onFilterChange={(filters) =>
                console.log("Filters changed:", filters)
              }
            />

            {/* Process Table */}
            <ProcessTable
              onViewProcess={handleViewProcess}
              onEditProcess={handleEditProcess}
            />
          </div>
        </main>
      </div>

      {/* Notification Panel */}
      {notificationPanelOpen && (
        <NotificationPanel
          isOpen={notificationPanelOpen}
          onClose={toggleNotificationPanel}
          onViewProcess={handleViewProcess}
        />
      )}

      {/* Process Details Modal */}
      <ProcessDetailsModal
        open={processDetailsOpen}
        onOpenChange={setProcessDetailsOpen}
        processId={selectedProcessId || undefined}
      />

      {/* Floating Notification Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button
          onClick={toggleNotificationPanel}
          className="bg-primary text-white p-3 rounded-full shadow-lg flex items-center justify-center relative"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            5
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
