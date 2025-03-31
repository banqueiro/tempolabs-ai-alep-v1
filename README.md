# Fluxo do Sistema

```mermaid
graph TD
    A[Início - Acesso ao Sistema] --> B[Dashboard Principal]
    
    subgraph "Dashboard e Visualização"
        B --> C[Visualizar Status dos Processos]
        C --> D{Aplicar Filtros?}
        D -->|Sim| E[Filtrar por Tipo/Urgência/Departamento]
        E --> C
        D -->|Não| F{Selecionar Processo?}
    end
    
    subgraph "Gestão de Processos"
        F -->|Sim| G[Visualizar Detalhes do Processo]
        F -->|Não| B
        G --> H{Ação Necessária?}
        H -->|Editar| I[Editar Informações do Processo]
        H -->|Analisar| J[Verificar Conformidade Legal]
        H -->|Gerar Documento| K[Gerar Documentos/Relatórios]
        H -->|Não| B
        
        J --> J1[Análise Automática - Lei 14133/2021]
        J1 --> J2{Conforme?}
        J2 -->|Sim| J3[Marcar como Aprovado]
        J2 -->|Não| J4[Registrar Não-Conformidades]
        J4 --> J5[Gerar Recomendações]
        
        I --> L[Salvar Alterações]
        J3 --> L
        J5 --> L
        K --> L
        L --> B
    end
    
    subgraph "Sistema de Notificações"
        M[Sistema de Monitoramento] -->|Verifica Continuamente| N{Evento Detectado?}
        N -->|Prazo Próximo| O[Enviar Alerta de Prazo]
        N -->|Pendência| P[Notificar Pendência]
        N -->|Aprovação Necessária| Q[Solicitar Aprovação]
        N -->|Não| M
        
        O --> R[Notificar Usuários Responsáveis]
        P --> R
        Q --> R
        R --> S{Ação Tomada?}
        S -->|Sim| T[Atualizar Status do Processo]
        S -->|Não| U[Escalar Notificação]
        T --> M
        U --> M
    end
    
    subgraph "Análise de Dados"
        V[Acessar Painel Analítico] --> W[Visualizar Métricas de Processos]
        W --> X{Selecionar Tipo de Análise}
        X -->|Gargalos| Y[Identificar Pontos de Atraso]
        X -->|Eficiência| Z[Analisar Tempo de Processamento]
        X -->|Conformidade| AA[Verificar Taxa de Conformidade Legal]
        
        Y --> AB[Gerar Relatório de Otimização]
        Z --> AB
        AA --> AB
        AB --> AC[Implementar Recomendações]
        AC --> B
    end




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
