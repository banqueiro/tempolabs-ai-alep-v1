import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  FileOutput,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: FileText, label: "Processos", path: "/processos" },
    {
      icon: CheckSquare,
      label: "Análise de Conformidade",
      path: "/conformidade",
    },
    { icon: FileOutput, label: "Documentos", path: "/documentos" },
    { icon: BarChart2, label: "Análise de Dados", path: "/analise" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ];

  return (
    <aside
      className={cn(
        "h-full bg-slate-900 text-white flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-[280px]",
      )}
    >
      <div className="p-4 flex items-center justify-center border-b border-slate-700">
        {collapsed ? (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
            A
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="text-xl font-semibold">DAT-ALEP</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              {collapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center justify-center p-3 rounded-md transition-colors",
                            isActive
                              ? "bg-blue-700 text-white"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white",
                          )
                        }
                      >
                        <item.icon size={20} />
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 p-3 rounded-md transition-colors",
                      isActive
                        ? "bg-blue-700 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    )
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-slate-700 p-4">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-full flex items-center justify-center p-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <LogOut size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sair</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <button className="w-full flex items-center gap-3 p-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
