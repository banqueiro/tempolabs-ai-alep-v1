import React, { useState } from "react";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";

interface ProcessFiltersProps {
  onFilterChange?: (filters: ProcessFilters) => void;
}

interface ProcessFilters {
  search: string;
  type: string;
  urgency: string;
  department: string;
  status: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const ProcessFilters = ({ onFilterChange }: ProcessFiltersProps = {}) => {
  const [filters, setFilters] = useState<ProcessFilters>({
    search: "",
    type: "all",
    urgency: "all",
    department: "all",
    status: "all",
    startDate: undefined,
    endDate: undefined,
  });

  const handleFilterChange = (key: keyof ProcessFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("search", e.target.value);
  };

  const handleDateRangeSelect = (date: Date | undefined) => {
    if (!filters.startDate) {
      handleFilterChange("startDate", date);
    } else if (!filters.endDate && date && date > filters.startDate) {
      handleFilterChange("endDate", date);
    } else {
      handleFilterChange("startDate", date);
      handleFilterChange("endDate", undefined);
    }
  };

  const clearFilters = () => {
    const resetFilters = {
      search: "",
      type: "all",
      urgency: "all",
      department: "all",
      status: "all",
      startDate: undefined,
      endDate: undefined,
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar processos..."
            className="pl-10 w-full"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="compra-direta">Compra Direta</SelectItem>
              <SelectItem value="licitacao">Licitação</SelectItem>
              <SelectItem value="dispensa">Dispensa</SelectItem>
              <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.urgency}
            onValueChange={(value) => handleFilterChange("urgency", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Urgência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="critica">Crítica</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.department}
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="compras">Compras</SelectItem>
              <SelectItem value="juridico">Jurídico</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="administrativo">Administrativo</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="em-analise">Em Análise</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[160px] justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{filters.startDate ? "Período" : "Selecionar data"}</span>
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <DayPicker
                  mode="single"
                  selected={filters.startDate}
                  onSelect={handleDateRangeSelect}
                  initialFocus
                  footer={
                    <div className="p-2 border-t border-gray-200 text-xs text-center text-gray-500">
                      {filters.startDate && !filters.endDate
                        ? "Selecione a data final"
                        : filters.startDate && filters.endDate
                          ? `${filters.startDate.toLocaleDateString()} - ${filters.endDate.toLocaleDateString()}`
                          : "Selecione a data inicial"}
                    </div>
                  }
                />
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Limpar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessFilters;
