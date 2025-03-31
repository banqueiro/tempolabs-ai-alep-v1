import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileEdit,
  AlertTriangle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";

interface Process {
  id: string;
  number: string;
  type: string;
  department: string;
  startDate: string;
  deadline: string;
  status: "pending" | "approved" | "in_analysis" | "delayed" | "with_issues";
}

interface ProcessTableProps {
  processes?: Process[];
  onViewProcess?: (id: string) => void;
  onEditProcess?: (id: string) => void;
}

const getStatusBadge = (status: Process["status"]) => {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200"
        >
          <Clock className="w-3 h-3 mr-1" /> Pendente
        </Badge>
      );
    case "approved":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <CheckCircle2 className="w-3 h-3 mr-1" /> Aprovado
        </Badge>
      );
    case "in_analysis":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          <Search className="w-3 h-3 mr-1" /> Em Análise
        </Badge>
      );
    case "delayed":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          <AlertCircle className="w-3 h-3 mr-1" /> Atrasado
        </Badge>
      );
    case "with_issues":
      return (
        <Badge
          variant="outline"
          className="bg-orange-50 text-orange-700 border-orange-200"
        >
          <AlertTriangle className="w-3 h-3 mr-1" /> Com Pendências
        </Badge>
      );
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const ProcessTable = ({
  processes = mockProcesses,
  onViewProcess = (id) => console.log(`View process ${id}`),
  onEditProcess = (id) => console.log(`Edit process ${id}`),
}: ProcessTableProps) => {
  const [sortField, setSortField] = useState<keyof Process | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: keyof Process) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProcesses = [...processes].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedProcesses = sortedProcesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(processes.length / itemsPerPage);

  const renderSortIcon = (field: keyof Process) => {
    if (sortField !== field)
      return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="w-full bg-white rounded-md shadow-sm border">
      <Table>
        <TableCaption>Lista de processos da DAT-ALEP</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer w-32"
              onClick={() => handleSort("number")}
            >
              <div className="flex items-center">
                Número {renderSortIcon("number")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("type")}
            >
              <div className="flex items-center">
                Tipo {renderSortIcon("type")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("department")}
            >
              <div className="flex items-center">
                Departamento {renderSortIcon("department")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer w-32"
              onClick={() => handleSort("startDate")}
            >
              <div className="flex items-center">
                Data Início {renderSortIcon("startDate")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer w-32"
              onClick={() => handleSort("deadline")}
            >
              <div className="flex items-center">
                Prazo {renderSortIcon("deadline")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status {renderSortIcon("status")}
              </div>
            </TableHead>
            <TableHead className="text-right w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProcesses.length > 0 ? (
            paginatedProcesses.map((process) => (
              <TableRow key={process.id}>
                <TableCell className="font-medium">{process.number}</TableCell>
                <TableCell>{process.type}</TableCell>
                <TableCell>{process.department}</TableCell>
                <TableCell>{process.startDate}</TableCell>
                <TableCell>{process.deadline}</TableCell>
                <TableCell>{getStatusBadge(process.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProcess(process.id)}
                      title="Visualizar processo"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditProcess(process.id)}
                      title="Editar processo"
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-muted-foreground"
              >
                Nenhum processo encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {processes.length > itemsPerPage && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
            {Math.min(currentPage * itemsPerPage, processes.length)} de{" "}
            {processes.length} processos
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Página {currentPage} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data for default display
const mockProcesses: Process[] = [
  {
    id: "1",
    number: "2023/001",
    type: "Compra Direta",
    department: "Informática",
    startDate: "10/01/2023",
    deadline: "25/01/2023",
    status: "approved",
  },
  {
    id: "2",
    number: "2023/002",
    type: "Licitação",
    department: "Administrativo",
    startDate: "15/01/2023",
    deadline: "15/03/2023",
    status: "in_analysis",
  },
  {
    id: "3",
    number: "2023/003",
    type: "Dispensa",
    department: "Financeiro",
    startDate: "20/01/2023",
    deadline: "05/02/2023",
    status: "with_issues",
  },
  {
    id: "4",
    number: "2023/004",
    type: "Pregão",
    department: "Recursos Humanos",
    startDate: "25/01/2023",
    deadline: "25/03/2023",
    status: "pending",
  },
  {
    id: "5",
    number: "2023/005",
    type: "Compra Direta",
    department: "Manutenção",
    startDate: "01/02/2023",
    deadline: "15/02/2023",
    status: "delayed",
  },
  {
    id: "6",
    number: "2023/006",
    type: "Licitação",
    department: "Informática",
    startDate: "05/02/2023",
    deadline: "05/04/2023",
    status: "in_analysis",
  },
  {
    id: "7",
    number: "2023/007",
    type: "Dispensa",
    department: "Administrativo",
    startDate: "10/02/2023",
    deadline: "25/02/2023",
    status: "approved",
  },
  {
    id: "8",
    number: "2023/008",
    type: "Pregão",
    department: "Financeiro",
    startDate: "15/02/2023",
    deadline: "15/04/2023",
    status: "pending",
  },
  {
    id: "9",
    number: "2023/009",
    type: "Compra Direta",
    department: "Recursos Humanos",
    startDate: "20/02/2023",
    deadline: "05/03/2023",
    status: "with_issues",
  },
  {
    id: "10",
    number: "2023/010",
    type: "Licitação",
    department: "Manutenção",
    startDate: "25/02/2023",
    deadline: "25/04/2023",
    status: "delayed",
  },
  {
    id: "11",
    number: "2023/011",
    type: "Dispensa",
    department: "Informática",
    startDate: "01/03/2023",
    deadline: "15/03/2023",
    status: "in_analysis",
  },
  {
    id: "12",
    number: "2023/012",
    type: "Pregão",
    department: "Administrativo",
    startDate: "05/03/2023",
    deadline: "05/05/2023",
    status: "approved",
  },
];

export default ProcessTable;
