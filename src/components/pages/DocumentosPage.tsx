import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, FolderPlus, Search, Upload } from "lucide-react";
import DocumentGenerator from "../process/DocumentGenerator";

const DocumentosPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const recentDocuments = [
    {
      id: "doc-001",
      name: "Termo de Referência - Aquisição de Equipamentos",
      type: "termo-referencia",
      date: "12/05/2023",
      process: "PROC-2023-0042",
    },
    {
      id: "doc-002",
      name: "Parecer Jurídico - Dispensa de Licitação",
      type: "parecer-juridico",
      date: "15/05/2023",
      process: "PROC-2023-0038",
    },
    {
      id: "doc-003",
      name: "Estudo Técnico Preliminar - Serviços de TI",
      type: "estudo-tecnico",
      date: "18/05/2023",
      process: "PROC-2023-0044",
    },
    {
      id: "doc-004",
      name: "Minuta de Contrato - Manutenção Predial",
      type: "minuta-contrato",
      date: "20/05/2023",
      process: "PROC-2023-0039",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Documentos"
          onToggleSidebar={toggleSidebar}
          notificationCount={2}
          userName="Ana Silva"
          userRole="Analista de Processos"
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-bold">
                Gerenciamento de Documentos
              </h1>

              <div className="flex gap-2">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Documento
                </Button>
                <Button variant="outline">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Nova Pasta
                </Button>
              </div>
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar documentos..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="font-medium text-sm">{doc.name}</h3>
                          <div className="flex gap-2 text-xs text-gray-500 mt-1">
                            <span>Processo: {doc.process}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <DocumentGenerator
                processId="PROC-2023-0042"
                processType="Dispensa de Licitação"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentosPage;
