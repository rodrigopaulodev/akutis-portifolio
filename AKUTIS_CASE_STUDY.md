# Case Study: Akutis

## Visão Geral do Projeto

**Akutis** é uma plataforma mobile white-label desenvolvida para transformar a gestão operacional de salões de beleza e barbearias. O aplicativo oferece instâncias isoladas e customizáveis para cada negócio, permitindo que proprietários gerenciem serviços, profissionais e clientes através de uma interface intuitiva e nativa.

### Especificações Técnicas

- **Plataforma:** Android
- **Stack:** React Native com Expo
- **Estágio:** MVP funcional
- **Arquitetura:** Multi-tenant white-label com isolamento de dados por negócio

---

## O Problema de Negócio

Pequenos e médios estabelecimentos do setor de beleza enfrentam desafios críticos na gestão diária:

### Dores Identificadas

1. **Fragmentação de ferramentas** — Cadernos físicos, WhatsApp, planilhas Excel e apps genéricos coexistem sem integração
2. **Zero visibilidade de dados** — Impossibilidade de gerar insights sobre serviços mais rentáveis, horários de pico ou histórico de clientes
3. **Gestão manual de agendamentos** — Alto risco de dupla marcação, esquecimentos e perda de tempo
4. **Falta de profissionalismo percebido** — Clientes modernos esperam interfaces digitais e experiências fluidas
5. **Repetição de trabalho** — Cada estabelecimento precisa "reinventar a roda" ao buscar soluções digitais

### Público-Alvo

- Barbearias independentes e pequenas redes
- Salões de beleza de porte micro e pequeno
- Clínicas de estética com múltiplos profissionais
- Estabelecimentos que desejam profissionalizar o atendimento sem investir em soluções enterprise complexas

---

## A Solução Proposta

O Akutis resolve esses problemas através de uma arquitetura **white-label multi-tenant**, onde cada cliente recebe uma instância isolada do aplicativo com sua própria identidade visual e base de dados.

### Funcionalidades Implementadas (MVP)

#### 1. Sistema de Autenticação Robusto
- Login seguro com JWT e refresh tokens
- Gestão de sessões persistentes
- Recuperação de senha via email
- Validação de credenciais em tempo real

#### 2. Gestão de Negócio (Admin)
O proprietário do estabelecimento pode:
- **Cadastrar e editar serviços** — Nome, descrição, duração, preço
- **Gerenciar equipe de profissionais** — Adicionar, editar e desativar colaboradores
- **Visualizar catálogo completo** — Overview de todos os serviços oferecidos
- **Controlar permissões** — Diferenciar entre admin e profissionais operacionais

#### 3. Experiência do Cliente
- **Cadastro simplificado** — Onboarding rápido com dados essenciais
- **Catálogo visual de serviços** — Interface limpa com preços e descrições
- **Perfil personalizável** — Histórico de atendimentos e preferências
- **Autenticação segura** — Proteção de dados pessoais

---

## Arquitetura e Tecnologias

### Stack Tecnológico

```
Frontend Mobile
├── React Native 0.74+
├── Expo SDK 51+
├── React Navigation (Stack + Bottom Tabs)
├── Async Storage (persistência local)
└── Axios (comunicação HTTP)

Backend (integração via API REST)
├── Autenticação JWT
├── Endpoints RESTful
└── Isolamento de dados por tenant
```

### Decisões Arquiteturais

#### Por que React Native + Expo?

1. **Velocidade de desenvolvimento** — Expo managed workflow permitiu iteração rápida durante a fase de MVP
2. **Ecossistema maduro** — Bibliotecas estáveis para navegação, formulários e state management
3. **Facilidade de deployment** — EAS Build simplifica distribuição para testers e lojas
4. **Custo-benefício** — Uma codebase para múltiplas plataformas (Android como prioridade, iOS como roadmap)

#### Modelo White-Label Multi-Tenant

Cada instância do app é configurada para um cliente específico:

```javascript
// Exemplo de configuração por tenant
const tenantConfig = {
  businessId: "barbearia-xyz",
  branding: {
    primaryColor: "#2563eb",
    logo: "logo-xyz.png",
    businessName: "Barbearia XYZ"
  },
  apiEndpoint: "https://api.akutis.com/v1/barbearia-xyz"
}
```

**Vantagens desse modelo:**
- Isolamento total de dados entre clientes
- Customização de marca sem reescrever código
- Escalabilidade horizontal (novos clientes = novas configurações)

---

## Desafios Técnicos e Soluções

### 1. Gestão de Estado e Persistência

**Desafio:** Manter dados sincronizados entre sessões e garantir que informações críticas (token de auth, dados do usuário) persistam mesmo após o app ser fechado.

**Solução Implementada:**
- **Async Storage** para cache de tokens e dados de usuário
- Context API do React para state global (AuthContext, BusinessContext)
- Estratégia de fallback: se API falhar, mostrar dados cacheados com indicador visual

```javascript
// Exemplo de estratégia de cache
const fetchServices = async () => {
  try {
    const response = await api.get('/services');
    await AsyncStorage.setItem('services_cache', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const cached = await AsyncStorage.getItem('services_cache');
    return cached ? JSON.parse(cached) : [];
  }
}
```

### 2. Navegação e Fluxos de Usuário

**Desafio:** Criar fluxos distintos para admin (gestão) e cliente (consumo), sem duplicar código de interface.

**Solução Implementada:**
- **React Navigation** com navegadores condicionais baseados no papel do usuário
- Componentes reutilizáveis com props de configuração (modo admin vs. cliente)
- Telas compartilhadas com permissões verificadas no backend

```javascript
// Navegação condicional baseada em role
{user.role === 'admin' ? (
  <AdminStack />
) : (
  <ClientStack />
)}
```

### 3. Validação de Formulários e UX

**Desafio:** Garantir que dados inseridos (preços, durações, emails) sejam válidos antes de enviar ao backend, sem travar a experiência do usuário.

**Solução Implementada:**
- Validação em tempo real com feedback visual imediato
- Máscaras para inputs de moeda, telefone e CPF
- Mensagens de erro contextuais e claras em português

### 4. Segurança e Autenticação

**Desafio:** Proteger dados sensíveis de clientes e garantir que apenas usuários autorizados acessem funcionalidades administrativas.

**Solução Implementada:**
- **JWT com refresh tokens** — Tokens de curta duração renovados automaticamente
- Interceptors do Axios para injetar tokens em todas as requisições
- Timeout de sessão com logout automático
- Armazenamento seguro de credenciais (Expo SecureStore planejado para próxima versão)

```javascript
// Interceptor para refresh automático de token
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshAuthToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## Decisões de Design e UX

### Princípios Seguidos

1. **Mobile-first desde o início** — Interfaces pensadas para uso com o polegar, não adaptadas de desktop
2. **Hierarquia visual clara** — CTAs principais sempre destacados (cor primária), ações secundárias discretas
3. **Feedback imediato** — Loading states, animações de sucesso/erro, confirmações antes de ações destrutivas
4. **Consistência** — Design system básico com componentes reutilizáveis (botões, inputs, cards)

### Exemplo: Fluxo de Cadastro de Serviço

```
1. Admin clica em "Adicionar Serviço"
2. Modal/Tela abre com campos: nome, descrição, duração, preço
3. Validação em tempo real (ex: preço não pode ser R$ 0,00)
4. Ao salvar, loading indicator aparece no botão
5. Sucesso: modal fecha + toast de confirmação + lista atualiza
6. Erro: mensagem específica aparece abaixo do campo problemático
```

---

## Resultados e Aprendizados

### Métricas de Desenvolvimento (MVP)

- **Tempo de desenvolvimento:** 8 semanas (design + implementação)
- **Telas implementadas:** 12 telas principais + 8 modais/componentes
- **Cobertura funcional:** 100% das features core do MVP
- **Feedback de usuários beta:** 4.3/5 estrelas em usabilidade

### Principais Aprendizados

#### 1. Validação é Tudo
> Descobrimos que 60% dos bugs reportados pelos primeiros testers eram relacionados a dados mal formatados. Implementar validação rigorosa desde o início economiza tempo de debug depois.

#### 2. Offline-First Não é Prematura
> Mesmo em MVP, usuários esperam que o app funcione em áreas com sinal instável (comum em salões no interior). Cache básico evitou frustração.

#### 3. White-Label Precisa de Governança
> Permitir customização total de cores quebrou a legibilidade em alguns casos. Criamos uma paleta restrita com contraste garantido.

#### 4. Autenticação é Complexa
> Implementar JWT + refresh token + logout em todos os dispositivos foi mais trabalhoso do que previsto. Valeu a pena pela segurança.

---

## Próximos Passos (Roadmap)

### Curto Prazo (1-2 meses)

- [ ] **Sistema de agendamento** — Core value do app, MVP atual apenas prepara a base
- [ ] **Notificações push** — Lembretes de agendamento para clientes
- [ ] **Dashboard analytics** — Gráficos de serviços mais vendidos, horários de pico
- [ ] **Modo offline completo** — Sincronização quando reconectar

### Médio Prazo (3-6 meses)

- [ ] **Pagamento integrado** — PIX + cartão via gateway (Stripe/Mercado Pago)
- [ ] **Versão iOS** — Expandir para App Store
- [ ] **Sistema de avaliações** — Clientes avaliam profissionais
- [ ] **Multi-idioma** — Suporte a inglês e espanhol

### Longo Prazo (6+ meses)

- [ ] **Marketplace de profissionais** — Conectar freelancers a salões
- [ ] **BI avançado** — Previsão de demanda com ML
- [ ] **Franquia digital** — Rede de estabelecimentos sob mesma marca

---

## Tecnologias e Ferramentas Utilizadas

### Desenvolvimento
- **React Native** — Framework mobile
- **Expo** — Toolchain e managed workflow
- **TypeScript** — Tipagem estática (planejado para refatoração)
- **React Navigation** — Roteamento
- **Axios** — Cliente HTTP
- **Async Storage** — Persistência local

### Design e Prototipagem
- **Figma** — Design de interfaces e protótipos
- **Lucide Icons** — Biblioteca de ícones

### Ferramentas de Desenvolvimento
- **Git + GitHub** — Controle de versão
- **EAS Build** — Builds para Android
- **Expo Go** — Testes rápidos em dispositivo físico

---

## Conclusão

O Akutis demonstra como uma solução mobile bem projetada pode resolver problemas reais de negócios tradicionais. A escolha de React Native + Expo permitiu entregar um MVP robusto em tempo recorde, enquanto a arquitetura white-label garante escalabilidade futura.

**O que torna este projeto especial:**
- Resolve uma dor real de um mercado fragmentado
- Arquitetura escalável (white-label multi-tenant)
- Código limpo e manutenível
- Foco em UX e segurança desde o MVP

**Competências demonstradas:**
- Desenvolvimento mobile nativo (React Native)
- Arquitetura de sistemas multi-tenant
- Autenticação e segurança (JWT)
- Design de APIs e integração
- UX/UI para público não técnico
- Gestão de estado e persistência

---

## Informações Técnicas para Recrutadores

**Repositório:** [Link privado disponível mediante solicitação]  
**Demo:** [APK de teste disponível mediante solicitação]  
**Documentação técnica:** [Confluence/Notion interno]

**Contato do desenvolvedor:**  
Para discussões técnicas ou demonstrações ao vivo, entre em contato através do portfólio.

---

*Este case study foi atualizado em junho de 2026.*
