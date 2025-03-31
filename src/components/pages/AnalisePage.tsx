import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart2,
  PieChart,
  LineChart,
  Download,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Dados simulados para os gráficos
const processTypeData = [
  { type: "Dispensa", count: 45 },
  { type: "Pregão", count: 32 },
  { type: "Inexigibilidade", count: 18 },
  { type: "Concorrência", count: 12 },
  { type: "Outros", count: 17 },
];

const processTimeData = [
  { stage: "Planejamento", time: 5 },
  { stage: "Elaboração TR", time: 8 },
  { stage: "Cotação", time: 12 },
  { stage: "Análise Jurídica", time: 7 },
  { stage: "Licitação", time: 15 },
  { stage: "Contratação", time: 6 },
];

const complianceData = [
  { article: "Art. 6", rate: 92 },
  { article: "Art. 18", rate: 78 },
  { article: "Art. 23", rate: 85 },
  { article: "Art. 40", rate: 65 },
  { article: "Art. 72", rate: 88 },
  { article: "Art. 89", rate: 76 },
];

const completedProcessData = {
  week: [12, 15, 10, 18, 14, 20, 16],
  month: [45, 52, 48, 60, 55, 70, 65, 72, 68, 75, 80, 78],
  quarter: [140, 165, 180, 210, 195, 230],
  year: [450, 520, 580, 610, 650, 720, 780, 810, 850, 920, 980, 1050],
};

const AnalisePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [period, setPeriod] = useState("month");
  const [chartData, setChartData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setIsLoading(true);
    setTimeout(() => {
      setChartData(
        completedProcessData[period as keyof typeof completedProcessData],
      );
      setIsLoading(false);
    }, 800);
  }, [period]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderChart = (data: any[], type: string) => {
    const maxValue = Math.max(
      ...data.map((item) =>
        type === "processType"
          ? item.count
          : type === "processTime"
            ? item.time
            : type === "compliance"
              ? item.rate
              : 0,
      ),
    );

    return (
      <div className="flex flex-col space-y-2">
        {data.map((item, index) => {
          const value =
            type === "processType"
              ? item.count
              : type === "processTime"
                ? item.time
                : type === "compliance"
                  ? item.rate
                  : 0;
          const label =
            type === "processType"
              ? item.type
              : type === "processTime"
                ? item.stage
                : type === "compliance"
                  ? item.article
                  : "";
          const percentage = (value / maxValue) * 100;

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-medium">
                  {value}
                  {type === "processTime"
                    ? " dias"
                    : type === "compliance"
                      ? "%"
                      : ""}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${type === "compliance" ? "bg-blue-600" : "bg-primary"}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLineChart = (data: number[]) => {
    const maxValue = Math.max(...data);
    const labels =
      period === "week"
        ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
        : period === "month"
          ? [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
            ].slice(0, data.length)
          : period === "quarter"
            ? ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"].slice(0, data.length)
            : [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
              ].slice(0, data.length);

    return (
      <div className="pt-6">
        <div className="flex items-end space-x-2 h-[200px]">
          {data.map((value, index) => {
            const height = (value / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-primary rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs mt-1">{labels[index]}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm font-medium">Total no período</p>
            <p className="text-2xl font-bold">
              {data.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Média por período</p>
            <p className="text-2xl font-bold">
              {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Crescimento</p>
            <p className="text-2xl font-bold text-green-600">
              +{Math.round(((data[data.length - 1] - data[0]) / data[0]) * 100)}
              %
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Análise de Dados"
          onToggleSidebar={toggleSidebar}
          notificationCount={2}
          userName="Ana Silva"
          userRole="Analista de Processos"
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-bold">Análise de Dados</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                      <SelectItem value="quarter">Último trimestre</SelectItem>
                      <SelectItem value="year">Último ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="performance">Desempenho</TabsTrigger>
                <TabsTrigger value="compliance">Conformidade</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de Processos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">124</div>
                      <p className="text-xs text-muted-foreground">
                        +12% em relação ao período anterior
                      </p>
                      <div className="h-[120px] mt-4 rounded-md">
                        {renderChart(
                          processTypeData.slice(0, 3),
                          "processType",
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Tempo Médio de Processamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18 dias</div>
                      <p className="text-xs text-muted-foreground">
                        -5% em relação ao período anterior
                      </p>
                      <div className="h-[120px] mt-4 rounded-md">
                        {renderChart(
                          processTimeData.slice(0, 3),
                          "processTime",
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taxa de Conformidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78%</div>
                      <p className="text-xs text-muted-foreground">
                        +3% em relação ao período anterior
                      </p>
                      <div className="h-[120px] mt-4 rounded-md">
                        {renderChart(complianceData.slice(0, 3), "compliance")}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Processos por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md">
                      {renderChart(processTypeData, "processType")}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tempo Médio por Etapa do Processo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md">
                      {renderChart(processTimeData, "processTime")}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Processos Concluídos por Período</span>
                      {isLoading && (
                        <span className="text-sm text-muted-foreground">
                          Carregando...
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                              </div>
                              <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md">
                        {renderLineChart(chartData)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Conformidade por Artigo da Lei 14133/2021
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md">
                      {renderChart(complianceData, "compliance")}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Evolução da Taxa de Conformidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="pt-4">
                      <div className="flex items-end space-x-2 h-[200px]">
                        {[65, 68, 72, 75, 78, 82].map((value, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center flex-1"
                            >
                              <div
                                className="w-full bg-blue-600 rounded-t"
                                style={{ height: `${value}%` }}
                              ></div>
                              <span className="text-xs mt-1">
                                {
                                  ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][
                                    index
                                  ]
                                }
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-6">
                        <div>
                          <p className="text-sm font-medium">Taxa Inicial</p>
                          <p className="text-2xl font-bold">65%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Taxa Atual</p>
                          <p className="text-2xl font-bold">82%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Crescimento</p>
                          <p className="text-2xl font-bold text-green-600">
                            +17%
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Principais Não Conformidades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Pesquisa de preços insuficiente
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Art. 23, Lei 14133/2021
                          </p>
                        </div>
                        <div className="text-red-500 font-medium">32%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Termo de Referência incompleto
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Art. 6º, XXIII, Lei 14133/2021
                          </p>
                        </div>
                        <div className="text-red-500 font-medium">28%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Ausência de estudo técnico preliminar
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Art. 18, Lei 14133/2021
                          </p>
                        </div>
                        <div className="text-red-500 font-medium">24%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Publicidade inadequada</p>
                          <p className="text-sm text-muted-foreground">
                            Art. 54, Lei 14133/2021
                          </p>
                        </div>
                        <div className="text-red-500 font-medium">16%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalisePage;
