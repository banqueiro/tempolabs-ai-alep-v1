import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  Save,
  User,
  Bell,
  Shield,
  Database,
  Key,
  Plus,
  UserPlus,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

// Definição de tipos
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar?: string;
}

const ConfiguracoesPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@alep.pr.gov.br",
    department: "Diretoria de Apoio Técnico",
    role: "Analista de Processos",
  });
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@alep.pr.gov.br",
      department: "Diretoria de Apoio Técnico",
      role: "Analista de Processos",
    },
    {
      id: "2",
      name: "Carlos Mendes",
      email: "carlos.mendes@alep.pr.gov.br",
      department: "Diretoria de Apoio Técnico",
      role: "Diretor",
    },
    {
      id: "3",
      name: "Mariana Costa",
      email: "mariana.costa@alep.pr.gov.br",
      department: "Diretoria Legislativa",
      role: "Assessora Jurídica",
    },
  ]);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    department: "",
    role: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);

  // Efeito para aplicar o modo escuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveUserChanges = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === currentUser.id ? currentUser : user)),
    );
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const addNewUser = () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.department ||
      !newUser.role
    ) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar usuário",
        description: "Todos os campos são obrigatórios.",
      });
      return;
    }

    const newId = (
      Math.max(...users.map((u) => parseInt(u.id))) + 1
    ).toString();
    const userToAdd = { ...newUser, id: newId };

    setUsers((prev) => [...prev, userToAdd]);
    setNewUser({ name: "", email: "", department: "", role: "" });
    setShowNewUserDialog(false);

    toast({
      title: "Usuário adicionado",
      description: `${newUser.name} foi adicionado com sucesso.`,
    });
  };

  const deleteUser = (id: string) => {
    if (id === "1") {
      toast({
        variant: "destructive",
        title: "Operação não permitida",
        description: "Não é possível excluir o usuário principal.",
      });
      return;
    }

    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Configurações"
          onToggleSidebar={toggleSidebar}
          notificationCount={2}
          userName="Ana Silva"
          userRole="Analista de Processos"
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Configurações do Sistema</h1>

            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
                <TabsTrigger value="system">Sistema</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Informações do Perfil
                    </CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais e profissionais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={currentUser.name}
                          onChange={handleUserChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={currentUser.email}
                          onChange={handleUserChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input
                          id="department"
                          name="department"
                          value={currentUser.department}
                          onChange={handleUserChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Input
                          id="role"
                          name="role"
                          value={currentUser.role}
                          onChange={handleUserChange}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                      <Button onClick={saveUserChanges}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Gerenciar Usuários
                      </div>
                      <Dialog
                        open={showNewUserDialog}
                        onOpenChange={setShowNewUserDialog}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Usuário
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-name">Nome Completo</Label>
                              <Input
                                id="new-name"
                                name="name"
                                value={newUser.name}
                                onChange={handleNewUserChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-email">Email</Label>
                              <Input
                                id="new-email"
                                name="email"
                                value={newUser.email}
                                onChange={handleNewUserChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-department">
                                Departamento
                              </Label>
                              <Input
                                id="new-department"
                                name="department"
                                value={newUser.department}
                                onChange={handleNewUserChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-role">Cargo</Label>
                              <Input
                                id="new-role"
                                name="role"
                                value={newUser.role}
                                onChange={handleNewUserChange}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setShowNewUserDialog(false)}
                            >
                              Cancelar
                            </Button>
                            <Button onClick={addNewUser}>Adicionar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                    <CardDescription>
                      Gerencie os usuários do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Departamento</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteUser(user.id)}
                                disabled={user.id === "1"}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Preferências de Notificação
                    </CardTitle>
                    <CardDescription>
                      Configure como e quando deseja receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba atualizações por email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações no Sistema</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações no sistema
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Alertas de Prazo</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba alertas quando um prazo estiver próximo
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Resumo Diário</Label>
                          <p className="text-sm text-muted-foreground">
                            Receba um resumo diário das atividades
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Preferências
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Segurança da Conta
                    </CardTitle>
                    <CardDescription>
                      Gerencie a segurança da sua conta e altere sua senha
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirmar Nova Senha
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Autenticação de Dois Fatores</Label>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma camada extra de segurança
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>
                        <Key className="mr-2 h-4 w-4" />
                        Atualizar Senha
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="mr-2 h-5 w-5" />
                      Configurações do Sistema
                    </CardTitle>
                    <CardDescription>
                      Configure parâmetros gerais do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Modo Escuro</Label>
                          <p className="text-sm text-muted-foreground">
                            Ativar tema escuro na interface
                          </p>
                        </div>
                        <Switch
                          checked={darkMode}
                          onCheckedChange={setDarkMode}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Análise Automática de Conformidade</Label>
                          <p className="text-sm text-muted-foreground">
                            Analisar automaticamente novos processos
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Assistente de IA</Label>
                          <p className="text-sm text-muted-foreground">
                            Ativar assistente de IA para sugestões
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Backup Automático</Label>
                          <p className="text-sm text-muted-foreground">
                            Realizar backup diário dos dados
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar notificações por email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => {
                          toast({
                            title: "Configurações salvas",
                            description:
                              "As configurações do sistema foram atualizadas com sucesso.",
                          });
                        }}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Configurações
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Informações do Sistema
                    </CardTitle>
                    <CardDescription>
                      Detalhes técnicos e versão do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">
                            Versão do Sistema
                          </p>
                          <p className="text-sm text-muted-foreground">1.2.0</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Última Atualização
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Banco de Dados</p>
                          <p className="text-sm text-muted-foreground">
                            PostgreSQL 14.5
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Servidor</p>
                          <p className="text-sm text-muted-foreground">
                            Node.js 18.12.1
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Verificação iniciada",
                          description: "Verificando atualizações do sistema...",
                        });

                        setTimeout(() => {
                          toast({
                            title: "Sistema atualizado",
                            description:
                              "O sistema já está na versão mais recente.",
                          });
                        }, 2000);
                      }}
                    >
                      Verificar Atualizações
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        toast({
                          variant: "destructive",
                          title: "Atenção",
                          description:
                            "Esta operação requer permissões de administrador.",
                          action: (
                            <ToastAction altText="Solicitar acesso">
                              Solicitar acesso
                            </ToastAction>
                          ),
                        });
                      }}
                    >
                      Reiniciar Sistema
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
