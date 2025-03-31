import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

interface ComplianceRequirement {
  id: string;
  description: string;
  status: "compliant" | "non-compliant" | "pending" | "not-applicable";
  reference: string;
  details?: string;
}

interface ComplianceAnalysisProps {
  processId?: string;
  requirements?: ComplianceRequirement[];
  overallCompliance?: number;
  recommendations?: string[];
}

const ComplianceAnalysis = ({
  processId = "PROC-2023-0001",
  requirements = [
    {
      id: "req-001",
      description: "Termo de Referência adequadamente detalhado",
      status: "compliant",
      reference: "Art. 6º, XXIII, Lei 14133/2021",
      details:
        "Documento contém todos os elementos necessários conforme a legislação.",
    },
    {
      id: "req-002",
      description: "Pesquisa de preços conforme normativa",
      status: "non-compliant",
      reference: "Art. 23, Lei 14133/2021",
      details: "Necessário incluir mais fontes de pesquisa de preços.",
    },
    {
      id: "req-003",
      description: "Dotação orçamentária",
      status: "pending",
      reference: "Art. 150, Lei 14133/2021",
      details: "Aguardando confirmação do setor financeiro.",
    },
    {
      id: "req-004",
      description: "Aprovação da autoridade competente",
      status: "pending",
      reference: "Art. 72, Lei 14133/2021",
      details: "Documento enviado para aprovação em 15/05/2023.",
    },
    {
      id: "req-005",
      description: "Publicação em meio eletrônico oficial",
      status: "not-applicable",
      reference: "Art. 54, Lei 14133/2021",
      details: "Não aplicável nesta fase do processo.",
    },
  ],
  overallCompliance = 65,
  recommendations = [
    "Complementar a pesquisa de preços com pelo menos mais duas fontes conforme Art. 23",
    "Solicitar urgência na aprovação da dotação orçamentária",
    "Preparar minuta do contrato conforme Art. 89 para agilizar próximas etapas",
  ],
}: ComplianceAnalysisProps) => {
  const getStatusIcon = (status: ComplianceRequirement["status"]) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "non-compliant":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "not-applicable":
        return <Info className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: ComplianceRequirement["status"]) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="default" className="bg-green-500">
            Conforme
          </Badge>
        );
      case "non-compliant":
        return <Badge variant="destructive">Não Conforme</Badge>;
      case "pending":
        return (
          <Badge variant="secondary" className="bg-amber-500 text-white">
            Pendente
          </Badge>
        );
      case "not-applicable":
        return (
          <Badge variant="outline" className="text-gray-500">
            Não Aplicável
          </Badge>
        );
      default:
        return null;
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  const statusCounts = requirements.reduce<
    Record<ComplianceRequirement["status"], number>
  >(
    (acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    },
    {
      compliant: 0,
      "non-compliant": 0,
      pending: 0,
      "not-applicable": 0,
    },
  );

  return (
    <div className="bg-white w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Análise de Conformidade - Lei 14133/2021</span>
            <Badge variant="outline" className="text-sm font-normal">
              Processo: {processId}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Compliance Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Conformidade Geral</h3>
              <span className="text-sm font-medium">{overallCompliance}%</span>
            </div>
            <Progress
              value={overallCompliance}
              className="h-2"
              indicatorClassName={cn(getProgressColor(overallCompliance))}
            />
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex justify-center mb-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-xl font-bold text-green-700">
                {statusCounts.compliant || 0}
              </div>
              <div className="text-xs text-green-700">Conforme</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex justify-center mb-1">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-xl font-bold text-red-700">
                {statusCounts["non-compliant"] || 0}
              </div>
              <div className="text-xs text-red-700">Não Conforme</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <div className="flex justify-center mb-1">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-xl font-bold text-amber-700">
                {statusCounts.pending || 0}
              </div>
              <div className="text-xs text-amber-700">Pendente</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center mb-1">
                <Info className="h-5 w-5 text-gray-500" />
              </div>
              <div className="text-xl font-bold text-gray-700">
                {statusCounts["not-applicable"] || 0}
              </div>
              <div className="text-xs text-gray-700">Não Aplicável</div>
            </div>
          </div>

          {/* Requirements List */}
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Requisito
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Referência
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requirements.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    title={req.details}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {req.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {req.reference}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(req.status)}
                        {getStatusBadge(req.status)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Recomendações:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-700">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-4">
          <div className="text-xs text-gray-500">
            Análise gerada automaticamente com base na Lei 14133/2021
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplianceAnalysis;
