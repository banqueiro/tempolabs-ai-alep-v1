import React, { useState } from "react";
import {
  Bell,
  Search,
  Settings,
  User,
  Menu,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import NotificationPanel from "../notifications/NotificationPanel";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
  notificationCount?: number;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const Header = ({
  title = "Dashboard",
  onToggleSidebar = () => {},
  notificationCount = 5,
  userName = "Usuário ALEP",
  userRole = "Diretoria de Apoio Técnico",
  userAvatar = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Pesquisa realizada",
        description: `Resultados para: "${searchQuery}"`,
      });
    }
  };

  const handleViewProcess = (processId: string) => {
    setNotificationPanelOpen(false);
    navigate("/processos");
    toast({
      title: "Processo selecionado",
      description: `Visualizando processo ${processId}`,
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 h-[72px] w-full flex items-center justify-between px-4 shadow-sm dark:bg-gray-900 dark:border-gray-800 dark:text-white">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="ALEP Logo" className="h-8 w-auto" />
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Assembleia Legislativa do Paraná
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar processos, documentos..."
            className="pl-10 w-full bg-gray-50 dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setNotificationPanelOpen(true)}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/configuracoes")}
        >
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-1 md:p-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {userName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/configuracoes")}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/configuracoes")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast({
                  title: "Ajuda",
                  description: "O sistema de ajuda está sendo carregado...",
                });
              }}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ajuda</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toast({
                  title: "Logout",
                  description: "Você foi desconectado do sistema.",
                });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notification Panel */}
      {notificationPanelOpen && (
        <NotificationPanel
          isOpen={notificationPanelOpen}
          onClose={() => setNotificationPanelOpen(false)}
          onViewProcess={handleViewProcess}
          onMarkAsRead={(id) => {
            toast({
              title: "Notificação marcada como lida",
              description: "A notificação foi marcada como lida com sucesso.",
            });
          }}
          onMarkAllAsRead={() => {
            toast({
              title: "Notificações marcadas como lidas",
              description: "Todas as notificações foram marcadas como lidas.",
            });
          }}
        />
      )}
    </header>
  );
};

export default Header;
