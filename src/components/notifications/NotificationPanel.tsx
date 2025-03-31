import React, { useState } from "react";
import {
  Bell,
  Check,
  Clock,
  AlertTriangle,
  X,
  Info,
  FileText,
  MessageSquare,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type NotificationType = "alert" | "warning" | "info" | "success";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
  processId?: string;
  actionRequired?: boolean;
}

interface NotificationPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onViewProcess?: (processId: string) => void;
}

const NotificationPanel = ({
  isOpen = true,
  onClose = () => {},
  notifications = [
    {
      id: "1",
      title: "Prazo de processo expirando",
      message:
        "O processo #2023-0145 tem prazo de análise expirando em 2 dias.",
      type: "warning",
      time: "2 horas atrás",
      read: false,
      processId: "2023-0145",
      actionRequired: true,
    },
    {
      id: "2",
      title: "Processo aprovado",
      message: "O processo #2023-0142 foi aprovado com sucesso.",
      type: "success",
      time: "5 horas atrás",
      read: true,
      processId: "2023-0142",
    },
    {
      id: "3",
      title: "Não conformidade detectada",
      message:
        "O processo #2023-0148 apresenta não conformidade com a Lei 14133/2021, Art. 75.",
      type: "alert",
      time: "1 dia atrás",
      read: false,
      processId: "2023-0148",
      actionRequired: true,
    },
    {
      id: "4",
      title: "Novo processo atribuído",
      message: "Você foi designado para analisar o processo #2023-0150.",
      type: "info",
      time: "1 dia atrás",
      read: false,
      processId: "2023-0150",
    },
    {
      id: "5",
      title: "Atualização de sistema",
      message:
        "O sistema será atualizado hoje às 22h. Salve seu trabalho antes desse horário.",
      type: "info",
      time: "2 dias atrás",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onViewProcess = () => {},
}: NotificationPanelProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  const unreadCount = localNotifications.filter(
    (notification) => !notification.read,
  ).length;

  const filteredNotifications = localNotifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "action") return notification.actionRequired;
    return notification.type === activeFilter;
  });

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <Badge variant="destructive">Urgente</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Atenção</Badge>;
      case "success":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "info":
      default:
        return <Badge variant="secondary">Informação</Badge>;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    onMarkAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
    onMarkAllAsRead();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-16 z-50 w-[400px] rounded-lg border bg-background shadow-lg dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Notificações</h2>
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {unreadCount} não {unreadCount === 1 ? "lida" : "lidas"}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeFilter}
        onValueChange={setActiveFilter}
      >
        <div className="border-b p-2 dark:border-gray-700">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">Não lidas</TabsTrigger>
            <TabsTrigger value="action">Ações</TabsTrigger>
            <TabsTrigger value="alert">Urgentes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeFilter} className="p-0">
          <ScrollArea className="h-[400px]">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y dark:divide-gray-700">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/20 dark:bg-blue-900/10",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {getNotificationBadge(notification.type)}
                          {notification.actionRequired && (
                            <Badge
                              variant="outline"
                              className="border-amber-500 text-amber-500"
                            >
                              Ação necessária
                            </Badge>
                          )}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          {notification.processId && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                onViewProcess(notification.processId!)
                              }
                            >
                              Ver processo
                            </Button>
                          )}
                          {!notification.read && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleMarkAsRead(notification.id)
                                    }
                                  >
                                    Marcar como lida
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Marcar esta notificação como lida</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-muted-foreground">
                  Nenhuma notificação encontrada
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {localNotifications.length > 0 && (
        <div className="border-t p-3 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleMarkAllAsRead}
          >
            Marcar todas como lidas
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
