import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  ChevronRight,
  Users,
  Calendar,
} from "lucide-react";
import ComplianceAnalysis from "./ComplianceAnalysis";
import DocumentGenerator from "./DocumentGenerator";

interface ProcessHistory {
  id: string;
  date: string;
  action: string;
  user: string;
  details?: string;
}

interface ProcessDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "approved" | "pending" | "rejected";
  url?: string;
}

interface ProcessDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  processId?: string;
  processNumber?: string;
  processType?: string;
  department?: string;
  startDate?: string;
  deadline?: string;
  status?: "em-andamento" | "aprovado" | "pendente" | "atrasado" | "concluido";
  description?: string;
  priority?: "baixa" | "media" | "alta" | "urgente";
  assignedTo?: string;
  history?: ProcessHistory[];
  documents?: ProcessDocument[];
}

const ProcessDetailsModal = ({
  open = true,
  onOpenChange = () => {},
  processId = "PROC-2023-0042",
  processNumber = "42/2023",
  processType = "Dispensa de Licitação",
  department = "Diretoria de Apoio Técnico",
  startDate = "10/05/2023",
  deadline = "10/06/2023",
  status = "em-andamento",
  description = "Aquisição de equipamentos de informática para substituição de itens obsoletos no setor administrativo.",
  priority = "media",
  assignedTo = "Maria Silva",
  history = [
    {
      id: "hist-001",
      date: "10/05/2023 09:15",
      action: "Processo iniciado",
      user: "João Oliveira",
      details:
        "Abertura do processo de dispensa de licitação conforme solicitação do departamento.",
    },
    {
      id: "hist-002",
      date: "12/05/2023 14:30",
      action: "Termo de Referência anexado",
      user: "Maria Silva",
      details:
        "Documento elaborado com especificações técnicas dos equipamentos.",
    },
    {
      id: "hist-003",
      date: "15/05/2023 11:20",
      action: "Pesquisa de preços realizada",
      user: "Carlos Santos",
      details:
        "Foram consultados 3 fornecedores e realizada pesquisa no Painel de Preços.",
    },
    {
      id: "hist-004",
      date: "18/05/2023 16:45",
      action: "Análise de conformidade",
      user: "Ana Ferreira",
      details: "Verificação dos requisitos legais conforme Lei 14133/2021.",
    },
    {
      id: "hist-005",
      date: "20/05/2023 10:00",
      action: "Parecer jurídico solicitado",
      user: "Maria Silva",
      details: "Encaminhamento para análise jurídica.",
    },
  ],
  documents = [
    {
      id: "doc-001",
      name: "Termo de Referência",
      type: "termo-referencia",
      date: "12/05/2023",
      status: "approved",
    },
    {
      id: "doc-002",
      name: "Pesquisa de Preços",
      type: "pesquisa-precos",
      date: "15/05/2023",
      status: "approved",
    },
    {
      id: "doc-003",
      name: "Dotação Orçamentária",
      type: "dotacao-orcamentaria",
      date: "17/05/2023",
      status: "pending",
    },
    {
      id: "doc-004",
      name: "Parecer Jurídico",
      type: "parecer-juridico",
      date: "20/05/2023",
      status: "pending",
    },
  ],
}: ProcessDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: ProcessDetailsModalProps["status"]) => {
    switch (status) {
      case "em-andamento":
        return <Badge className="bg-blue-500">Em Andamento</Badge>;
      case "aprovado":
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "atrasado":
        return <Badge className="bg-red-500">Atrasado</Badge>;
      case "concluido":
        return <Badge className="bg-gray-500">Concluído</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: ProcessDetailsModalProps["priority"]) => {
    switch (priority) {
      case "baixa":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Baixa
          </Badge>
        );
      case "media":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            Média
          </Badge>
        );
      case "alta":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-700"
          >
            Alta
          </Badge>
        );
      case "urgente":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Urgente
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDocumentStatusIcon = (status: ProcessDocument["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col bg-white">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              Processo {processNumber} - {processType}
            </DialogTitle>
            {getStatusBadge(status)}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <span>{processId}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{department}</span>
            <Separator orientation="vertical" className="h-4" />
            {getPriorityBadge(priority)}
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="compliance">Conformidade</TabsTrigger>
            <TabsTrigger value="generator">Gerar Documentos</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="overview" className="space-y-6 p-1">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Tipo de Processo
                      </p>
                      <p>{processType}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Departamento
                      </p>
                      <p>{department}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Data de Início
                      </p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{startDate}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">Prazo</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{deadline}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Responsável
                      </p>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{assignedTo}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">
                        Prioridade
                      </p>
                      <p>{getPriorityBadge(priority)}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">
                      Descrição
                    </p>
                    <p className="text-sm">{description}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Histórico do Processo</h3>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-medium">{item.action}</div>
                          <div className="text-sm text-gray-500">
                            {item.details}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{item.user}</div>
                          <div className="text-xs text-gray-500">
                            {item.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 p-1">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documentos do Processo</h3>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Adicionado em {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {getDocumentStatusIcon(doc.status)}
                          <span className="text-sm">
                            {doc.status === "approved"
                              ? "Aprovado"
                              : doc.status === "pending"
                                ? "Pendente"
                                : "Rejeitado"}
                          </span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Adicionar Documento
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="p-1">
              <ComplianceAnalysis processId={processId} />
            </TabsContent>

            <TabsContent value="generator" className="p-1">
              <DocumentGenerator
                processId={processId}
                processType={processType}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="border-t pt-4 mt-4">
          <div className="flex justify-between w-full">
            <Button variant="outline">Fechar</Button>
            <div className="space-x-2">
              <Button variant="outline">Editar Processo</Button>
              <Button>
                Avançar Etapa
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDetailsModal;
