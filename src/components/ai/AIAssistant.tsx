import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bot, Send, User, Loader2, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AIAssistant = ({
  isOpen = true,
  onClose = () => {},
}: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou o assistente virtual da DAT-ALEP. Como posso ajudar você hoje?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        "o que é a alep":
          "A ALEP (Assembleia Legislativa do Paraná) é o órgão de representação do Poder Legislativo do Estado do Paraná. Ela é composta por 54 deputados estaduais eleitos pelo povo paranaense para mandatos de 4 anos. A ALEP tem como principais funções legislar, fiscalizar o Poder Executivo e representar os interesses da população.",
        "o que é a dat":
          "A DAT (Diretoria de Apoio Técnico) é um departamento da Assembleia Legislativa do Paraná responsável por fornecer suporte técnico especializado aos processos administrativos, especialmente nas áreas de compras, licitações e contratos. A DAT trabalha para garantir a conformidade legal e a eficiência nos processos de contratação pública.",
        "diretorias da alep":
          "A Assembleia Legislativa do Paraná possui diversas diretorias administrativas, incluindo: Diretoria-Geral, Diretoria de Apoio Técnico (DAT), Diretoria Legislativa, Diretoria de Assistência ao Plenário, Diretoria de Comunicação, Diretoria de Recursos Humanos, Diretoria Administrativa, entre outras. Cada uma tem funções específicas para garantir o funcionamento adequado da instituição.",
        "lei 14133":
          "A Lei 14.133/2021 é a Nova Lei de Licitações e Contratos Administrativos que substituiu a Lei 8.666/93. Ela trouxe diversas inovações para os processos de compras públicas, como novos procedimentos licitatórios, critérios de julgamento, governança, gestão de riscos e compliance. A DAT-ALEP trabalha para garantir que todos os processos estejam em conformidade com esta legislação.",
        "processo de compras":
          "O processo de compras na ALEP, gerenciado pela DAT, segue estas etapas principais: 1) Identificação da necessidade, 2) Elaboração do Termo de Referência, 3) Pesquisa de preços, 4) Análise de conformidade legal, 5) Escolha da modalidade de licitação, 6) Elaboração do edital, 7) Publicação, 8) Realização do certame, 9) Homologação, 10) Contratação. Todo o processo é regido pela Lei 14.133/2021 e busca garantir a melhor proposta para a administração pública.",
        "tipos de licitação":
          "De acordo com a Lei 14.133/2021, as modalidades de licitação são: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo. Além disso, há casos de contratação direta por Dispensa de Licitação ou Inexigibilidade, quando atendidos os requisitos legais específicos.",
        contratos:
          "A ALEP gerencia diversos contratos administrativos para aquisição de bens e serviços. Todos os contratos seguem as diretrizes da Lei 14.133/2021, com processos transparentes e fiscalização rigorosa. Os contratos são publicados no Portal da Transparência e podem ser consultados por qualquer cidadão.",
        licitações:
          "As licitações na ALEP são processos administrativos formais que visam garantir a seleção da proposta mais vantajosa para a administração pública, observando os princípios da legalidade, impessoalidade, moralidade, publicidade e eficiência. A DAT é responsável por conduzir esses processos conforme a Lei 14.133/2021.",
        "dispensa de licitação":
          "A dispensa de licitação é uma exceção prevista na Lei 14.133/2021 que permite a contratação direta em situações específicas, como em casos de emergência, valores abaixo do limite legal, ou quando a competição é inviável. Mesmo nesses casos, a DAT-ALEP segue procedimentos rigorosos para garantir a transparência e economicidade.",
        inexigibilidade:
          "A inexigibilidade de licitação ocorre quando há inviabilidade de competição, como na contratação de serviços técnicos com profissionais de notória especialização ou para aquisição de materiais fornecidos por produtor ou representante comercial exclusivo. A DAT-ALEP documenta cuidadosamente essas situações conforme exigido pela Lei 14.133/2021.",
        "termo de referência":
          "O Termo de Referência é um documento técnico que contém a descrição detalhada do objeto a ser contratado, incluindo especificações, quantidades, prazos e condições de execução. É uma peça fundamental no processo de compras da ALEP, elaborado com precisão para garantir a qualidade da contratação e o atendimento às necessidades da instituição.",
      };

      // Check if the user's question matches any predefined responses
      const userQuestion = inputValue.toLowerCase().trim();
      let responseContent =
        "Não tenho informações específicas sobre isso. Como posso ajudar com questões relacionadas à ALEP, DAT, processos de compras ou a Lei 14.133/2021?";

      // Check for partial matches in the keys
      for (const key in aiResponses) {
        if (userQuestion.includes(key) || key.includes(userQuestion)) {
          responseContent = aiResponses[key];
          break;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] h-[500px] shadow-lg flex flex-col z-50">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg flex items-center">
          <Bot className="h-5 w-5 mr-2 text-blue-500" />
          Assistente DAT-ALEP
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={onClose}
          >
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar
                  className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}
                >
                  {message.sender === "user" ? (
                    <>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 text-sm ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <CardFooter className="p-3 border-t">
        {messages.length > 1 &&
          messages[messages.length - 1].sender === "assistant" && (
            <div className="flex items-center space-x-2 mb-2">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Útil
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsDown className="h-4 w-4 mr-1" />
                Não útil
              </Button>
            </div>
          )}
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Digite sua pergunta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
