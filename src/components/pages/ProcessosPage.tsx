import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProcessFilters from "../dashboard/ProcessFilters";
import ProcessTable from "../dashboard/ProcessTable";
import ProcessDetailsModal from "../process/ProcessDetailsModal";
import NotificationPanel from "../notifications/NotificationPanel";

const ProcessosPage = () => {
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
          title="Processos"
          onToggleSidebar={toggleSidebar}
          notificationCount={3}
          userName="Ana Silva"
          userRole="Analista de Processos"
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold mb-6">
              Gerenciamento de Processos
            </h1>

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
    </div>
  );
};

export default ProcessosPage;
