# Willer bank Frontend

## Introdução

Este projeto consiste em uma plataforma de gestão de recebíveis desenvolvida para facilitar o registro e a administração dos recebíveis diários de clientes da 'Willer Bank'. Inclui funcionalidades para cadastrar novos recebíveis, visualizar registros existentes, atualizar detalhes e remover entradas. O objetivo é oferecer uma interface intuitiva e eficiente para que a equipe de operações gerencie as informações de recebíveis de forma organizada.

## Pré-requisitos

Para rodar e dar build do projeto localmente você precisará de algumas ferramentas:

- Instale [Node.js](https://nodejs.org/en/)
- Instale [VS Code](https://code.visualstudio.com/)

## Primeiros passos

Primeiro, para rodar em modo de desenvolvimento execute no terminal:

```bash
npm i
npm run dev
```

Abra [http://localhost:90](http://localhost:90) no seu navagador para visualizar o resultado.

## Estrutura

### Estrutura de pastas

- **services**: Configurações para conectar com a API;
  - **api**: Base de conexão com a API não autenticada;
  - **api.authentication**: Base de conexão com a API autenticada;
  - **service.enum**: Path de cada uma das controllers da api;
  - **pastas**: Cada pasta representa uma controller com que o front consome;
- **components**: Components globais da aplicação, como botões, cards e inputs;
- **context**: Contextos aplicados a dados ou funções compartilhados entre diferentes páginas, por exemplo se há uma notificação para aplicar a parte de notificação e um context para facilitar as chamadas de função por diferentes páginas ou components.;
- **interfaces**: Interfaces globais utilizadas no app;
- **layout**: Telas base de layout;
  - **Authenticated**: Base para telas autenticadas;
  - **Unauthenticated**: Base para telas não autenticadas;
- **pages**: Páginas da aplicação, como por exemplo de login, listagem de recebíveis.
- **utils**: Funções que são muito usadas em um contexto global, mas são funções mais simples do que as funções no contexto e têm uma utilização mais global.

### Dependências do projeto

#### `dependencies`

| Pacote                                                   | Descrição                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| **@emotion/react**                                       | Biblioteca para estilização CSS-in-JS                              |
| **@emotion/styled**                                      | Componentes estilizados.                                           |
| **@fortawesome/free-solid-svg-icons**                    | Coleção de ícones SVG sólidos para integração com FontAwesome.     |
| **@fortawesome/react-fontawesome**                       | Componente React para fácil integração de ícones.                  |
| **@hookform/error-message**                              | Biblioteca para exibição de mensagens de erro com React Hook Form. |
| **@mui/icons-material**, **@mui/lab**, **@mui/material** | Componentes e ícones do Material-UI para aplicações React.         |
| **antd**                                                 | Biblioteca de UI, foi utilizado para tabela.                       |
| **axios**                                                | Cliente HTTP para fazer requisições a APIs.                        |
| **react**, **react-dom**                                 | Bibliotecas principais para construção do React.                   |
| **react-hook-form**                                      | Biblioteca para validação e manipulação eficiente de formulários.  |
| **react-icons**                                          | Biblioteca para inclusão de ícones populares.                      |
| **react-router-dom**                                     | Biblioteca de roteamento para gerenciar navegação em aplicações.   |
| **react-toastify**                                       | Componente para exibição de notificações toast.                    |

#### `devDependencies`

| Pacote                                                              | Descrição                                                                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **@types/react**, **@types/react-dom**                              | Definições de tipos do TypeScript para React e ReactDOM.                                                      |
| **@typescript-eslint/eslint-plugin**, **@typescript-eslint/parser** | Suporte TypeScript para ESLint, permitindo linting de arquivos TypeScript.                                    |
| **@vitejs/plugin-react**                                            | Plugin oficial do Vite para React, permitindo suporte ao React em projetos alimentados pelo Vite.             |
| **autoprefixer**                                                    | Plugin PostCSS para analisar CSS e adicionar prefixos de fornecedores automaticamente.                        |
| **eslint**, **eslint-plugin-react**                                 | Linter JavaScript com regras específicas para React.                                                          |
| **eslint-plugin-storybook**                                         | Plugin ESLint para linting de histórias do Storybook.                                                         |
| **postcss**, **prettier**, **prettier-plugin-tailwindcss**          | PostCSS para transformar estilos, Prettier para formatação de código, e suporte ao TailwindCSS para Prettier. |
| **prop-types**                                                      | Verificação de tipos em tempo de execução para props do React.                                                |
| **tailwindcss**                                                     | Framework CSS utilitário para construção rápida de designs customizados.                                      |
| **typescript**                                                      | Superset tipado do JavaScript que compila para JavaScript puro.                                               |

Para instalar ou atualizar essas dependências, você pode usar `npm install` ou `npm update`.

## Deploy

As etapas para ver uma versão em produção é verificar as etapas de build do projeto, as quais temos as seguintes:

```bash
npm i
npm run build
npm run start
```

Abra [http://localhost:8080](http://localhost:8080) no seu navagador para visualizar o resultado.

Uma forma simples para fazer o deploy do projeto o qual utiliza React com Vite é pelo Amplify, segue [link](https://docs.amplify.aws/gen1/javascript/deploy-and-host/frameworks/deploy-vite-site/) de como fazer deploy do frontend utilizando AWS Amplify.

## Autor

- Nome: Willer Santos
- Local: São Paulo, SP
- Formado: BA Chemical Engineering
