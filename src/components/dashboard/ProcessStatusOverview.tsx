import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  HourglassIcon,
} from "lucide-react";

interface ProcessStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const ProcessStatusCard = ({
  title = "Processos",
  count = 0,
  icon = <FileText className="h-8 w-8" />,
  color = "text-blue-500",
  bgColor = "bg-blue-50",
}: ProcessStatusCardProps) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{count}</h3>
          </div>
          <div className={cn("p-3 rounded-full", bgColor)}>
            <div className={cn(color)}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProcessStatusOverviewProps {
  totalProcesses?: number;
  awaitingAnalysis?: number;
  approved?: number;
  pending?: number;
  delayed?: number;
}

const ProcessStatusOverview = ({
  totalProcesses = 124,
  awaitingAnalysis = 45,
  approved = 32,
  pending = 28,
  delayed = 19,
}: ProcessStatusOverviewProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Visão Geral dos Processos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProcessStatusCard
          title="Total em Andamento"
          count={totalProcesses}
          icon={<FileText className="h-8 w-8" />}
          color="text-blue-500"
          bgColor="bg-blue-50"
        />
        <ProcessStatusCard
          title="Aguardando Análise"
          count={awaitingAnalysis}
          icon={<HourglassIcon className="h-8 w-8" />}
          color="text-amber-500"
          bgColor="bg-amber-50"
        />
        <ProcessStatusCard
          title="Aprovados"
          count={approved}
          icon={<CheckCircle className="h-8 w-8" />}
          color="text-green-500"
          bgColor="bg-green-50"
        />
        <ProcessStatusCard
          title="Com Pendências"
          count={pending}
          icon={<AlertCircle className="h-8 w-8" />}
          color="text-orange-500"
          bgColor="bg-orange-50"
        />
        <ProcessStatusCard
          title="Atrasados"
          count={delayed}
          icon={<Clock className="h-8 w-8" />}
          color="text-red-500"
          bgColor="bg-red-50"
        />
      </div>
    </div>
  );
};

export default ProcessStatusOverview;
