import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import ComplianceAnalysis from "../process/ComplianceAnalysis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ConformidadePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const processList = [
    {
      id: "PROC-2023-0042",
      name: "Dispensa de Licitação - Equipamentos de Informática",
    },
    { id: "PROC-2023-0038", name: "Pregão Eletrônico - Serviços de Limpeza" },
    {
      id: "PROC-2023-0044",
      name: "Inexigibilidade - Consultoria Especializada",
    },
    { id: "PROC-2023-0039", name: "Dispensa - Material de Escritório" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Análise de Conformidade"
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
                Análise de Conformidade Legal
              </h1>

              <div className="flex gap-2">
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Nova Análise
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Selecionar Processo para Análise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar processo por número ou descrição..."
                      className="pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Select
                    value={selectedProcess || ""}
                    onValueChange={setSelectedProcess}
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Selecione um processo" />
                    </SelectTrigger>
                    <SelectContent>
                      {processList.map((process) => (
                        <SelectItem key={process.id} value={process.id}>
                          {process.id} - {process.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {selectedProcess ? (
              <ComplianceAnalysis processId={selectedProcess} />
            ) : (
              <div className="bg-white p-12 rounded-lg border text-center">
                <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Nenhum processo selecionado
                </h2>
                <p className="text-gray-500 mb-6">
                  Selecione um processo para visualizar sua análise de
                  conformidade com a Lei 14133/2021
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedProcess("PROC-2023-0042")}
                >
                  Ver exemplo de análise
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConformidadePage;
