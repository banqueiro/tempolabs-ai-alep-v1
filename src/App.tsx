import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProcessosPage from "./components/pages/ProcessosPage";
import DocumentosPage from "./components/pages/DocumentosPage";
import ConformidadePage from "./components/pages/ConformidadePage";
import AnalisePage from "./components/pages/AnalisePage";
import ConfiguracoesPage from "./components/pages/ConfiguracoesPage";
import AIAssistant from "./components/ai/AIAssistant";
import routes from "tempo-routes";
import { Bot } from "lucide-react";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

function App() {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check for dark mode preference in localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Carregando...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/processos" element={<ProcessosPage />} />
          <Route path="/documentos" element={<DocumentosPage />} />
          <Route path="/conformidade" element={<ConformidadePage />} />
          <Route path="/analise" element={<AnalisePage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        {/* AI Assistant Button */}
        {!aiAssistantOpen && (
          <Button
            className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg z-50 flex items-center justify-center"
            onClick={() => setAiAssistantOpen(true)}
          >
            <Bot className="h-6 w-6" />
          </Button>
        )}

        {/* AI Assistant Panel */}
        <AIAssistant
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
        />

        {/* Toast notifications */}
        <Toaster />
      </>
    </Suspense>
  );
}

export default App;
