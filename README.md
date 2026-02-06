# Starsoft Frontend Challenge - NFT Marketplace

Bem-vindo ao repositório do Marketplace de NFTs desenvolvido como parte do desafio técnico da Starsoft. Esta aplicação foi construída utilizando **Next.js**, **Redux Toolkit**, **React Query** e **SASS**, seguindo as melhores práticas de desenvolvimento e Clean Code.

## 🚀 Funcionalidades

*   **Listagem de Produtos:** Exibição de NFTs consumidos de uma API externa com paginação infinita ("Carregar mais").
*   **Detalhes do Produto:** Página dinâmica para visualizar informações detalhadas de cada NFT.
*   **Carrinho de Compras:**
    *   Adicionar e remover itens.
    *   Alterar quantidade.
    *   Persistência de estado global com Redux.
    *   Cálculo automático de total.
*   **Design Responsivo:** Layout adaptável para desktop, tablet e mobile.
*   **Animações:** Transições suaves e feedback visual utilizando Framer Motion.

## 🛠️ Tecnologias Utilizadas

*   **Framework:** Next.js 16 (App Router)
*   **Linguagem:** TypeScript
*   **Estilização:** SASS (Modules, Mixins, Variables)
*   **Gerenciamento de Estado:** Redux Toolkit
*   **Data Fetching:** React Query (TanStack Query) + Axios
*   **Animações:** Framer Motion
*   **Testes:** Jest + React Testing Library
*   **Qualidade de Código:** ESLint + Prettier
*   **Ambiente:** Docker + Docker Compose

## 📦 Como Executar

### Pré-requisitos

*   Docker e Docker Compose instalados.
*   OU Node.js (v18+) instalado localmente.

### Opção 1: Usando Docker (Recomendado)

1.  Clone o repositório e acesse a pasta:
    ```bash
    git clone https://github.com/leccorside/starsoft-frontend-challenge.git
    cd starsoft-frontend-challenge
    ```

2.  Inicie a aplicação:
    ```bash
    docker-compose up --build
    ```

3.  Acesse `http://localhost:3000` no seu navegador.

### Opção 2: Executando Localmente

1.  Instale as dependências:
    ```bash
    npm install
    ```

2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

3.  Para build de produção:
    ```bash
    npm run build
    npm start
    ```

## 🧪 Executando Testes

Para rodar os testes unitários:

```bash
npm test
# ou para modo watch
npm run test:watch
```

## 📐 Decisões Técnicas

*   **Next.js App Router:** Escolhido pela performance, suporte a Server Components e facilidade de roteamento.
*   **Redux Toolkit:** Utilizado para gerenciar o estado do carrinho de compras de forma previsível e escalável.
*   **React Query:** Implementado para cacheamento, estados de loading/erro e paginação infinita da API, separando o estado do servidor do estado da UI.
*   **API Fallback:** A API fornecida não possui um endpoint público documentado para busca de produto único (`/products/:id`). Foi implementada uma lógica de fallback que busca uma lista maior e filtra pelo ID no lado do cliente para garantir o funcionamento da página de detalhes.
*   **SASS Modules:** Permite estilos escopados por componente, evitando conflitos de nomes, mantendo a organização e aproveitando o poder do SASS (variáveis, mixins).
*   **Dockerfile Multi-stage:** Configurado para otimizar o tamanho da imagem final e separar as dependências de build das de produção.

## 📝 Licença

Este projeto é um desafio técnico e está disponível para fins de avaliação.
