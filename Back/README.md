# Willer bank Backend

## Introdução

Este projeto consiste em uma plataforma de gestão de recebíveis desenvolvida para facilitar o registro e a administração dos recebíveis diários de clientes da 'Willer Bank'. Inclui funcionalidades de CRUD de recebíveis, CRUD de cedentes, registro em lote de recebíveis.

## Pré-requisitos

Para rodar e dar build do projeto localmente você precisará de algumas ferramentas:

-   Instale [Node.js](https://nodejs.org/en/)
-   Instale [VS Code](https://code.visualstudio.com/)

## Primeiros passos

Primeiro, para rodar em modo de desenvolvimento execute no terminal:

```bash
npm i
npm run start:dev
```

Abra [http://localhost:8000/](http://localhost:8000/) ou [http://localhost:8000/healt-check](http://localhost:8000/healt-check) no seu navagador para verificar que a api está rodando.

### Deploy do projeto (Ajustar esse)

### Variáveis de ambiente (Ajustar esse)

## Estrutura

### Estrutura de pastas

-   **test**: Configurações para os testes;
-   **prisma**: Configurações relacionadas ao Prisma:
    -   **data**: Pasta onde fica guardado o arquivo de banco de dados sqlite;
    -   **migrations**: Migrações de banco de dados;
    -   **subschemas**: Entidades de banco de dados;
    -   **schema.prisma**: Centralizador das sub-entidades e conexão do banco de dados.
-   **src**
    -   **app**: Módulos gerais da aplicação:
        -   **XXX.controller**: Camada de controller, camada mais externa em contato com o cliente;
        -   **XXX.module**: Módulo para injetar controllers, services, repository;
        -   **XXX.repository**: Camada de repository, a que usa o ORM para chamar o banco de dados;
        -   **XXX.service**: Camada responsável pelas regras de negócio;
        -   **XXX.service.test**: Testes unitários com JEST;
        -   **dto**: Data transfer Object, classes e interfaces que são utilizadas entre cada camada, utilizando interface normalmente para retornos, class normalmente para request e popular objetos, podendo ter validadores.
        -   **exception**: Conjunto de mensagens de error personalizado que devem ser retornados.
    -   **producer**: Producer da aplicação, relacionado a estrutura de filas;
    -   **consumer**: Consumer da aplicação, relacionado a estrutura de filas;
    -   **authentication**: Módulos relacionados a parte de autenticação:
        -   **auth**: Módulo para autenticação
        -   **token**: Módulo para gerenciamento de token
        -   **user**: Módulo para gerenciamento de usuários
    -   **shared**: Módulos centrais ou configurações do servidor:
        -   **app**: Módulo central, para importar os módulos da aplicação;
        -   **config**: Variáveis do sistema ou configurações do servidor (ex.: segurança);
        -   **prisma**: Módulo do ORM (Prisma);
        -   **utils**: Funções que são muito usadas em um contexto global.

### Arquivos na base (Ajustar esse)

-   **.eslintignore; .eslintrc.js**: Linter (regras de padronização de arquivos);
-   **.prettierrc**: Padronização de arquivos;

### Principais scripts

-   **build**: Build do projeto.
-   **format**: Formata arquivos usando Prettier.
-   **start**: Roda o servidor em modo de produção.
-   **start:dev**: Roda o servidor em modo de desenvolvimento.
-   **start:debug**: Roda o servidor em modo de debug com observação de mudanças.
-   **start:prod**: Roda o servidor após compilar.
-   **lint**: Verifica problemas de lint nos arquivos.
-   **lint:fix**: Corrige os problemas de lint nos arquivos.
-   **generate-schema**: Concatena arquivos `.prisma` em um único arquivo, o `schema.prisma`.
-   **prisma:generate**: Gera migrações do banco dados.
-   **prisma:migrate**: Executa uma migração de banco de dados.
-   **prisma:studio**: Inicia o Prisma Studio para visualizar tabelas e dados.
-   **test**: Executa testes usando Jest.
-   **test:watch**: Executa testes em modo de observação.
-   **test:cov**: Executa testes e gera relatórios de cobertura.
-   **test:debug**: Executa testes em modo de debug.
-   **test:e2e**: Executa testes de ponta a ponta usando Jest.

## Dependências (Ajustar esse)

## `dependencies`

| Package           | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| config            | Universal configurations for your app.                                              |
| cors              | Node.js package for providing a Express middleware that can be used to enable CORS. |
| express           | Node.js web framework.                                                              |
| express-validator | Easy form validation for Express.                                                   |
| http-status-codes | HTTP status codes constants.                                                        |
| mongoose          | MongoDB modeling tool in an async environment.                                      |
| request           | Simplified HTTP client for Node.js.                                                 |
| typescript        | Typed superset of JavaScript.                                                       |

## `devDependencies`

Since TypeScript is used, dependencies should be accompanied by their corresponding DefinitelyTyped @types package.

| Package                          | Description                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| @types/config                    | DefinitelyTyped for config                                               |
| @types/cors                      | DefinitelyTyped for cors                                                 |
| @types/express                   | DefinitelyTyped for express                                              |
| @types/mongoose                  | DefinitelyTyped for mongoose                                             |
| @typescript-eslint/eslint-plugin | TypeScript plugin for ESLint                                             |
| eslint                           | JavaScript linter                                                        |
| eslint-config-prettier           | Turns off all rules that are unnecessary or might conflict with Prettier |
| eslint-plugin-prettier           | Runs Prettier as an ESLint rule                                          |
| prettier                         | Code formatter                                                           |
| ts-node-dev                      | Compiles TypeScript and restarts Node.js on file changes                 |

To install or update these dependencies you can use `npm install` or `npm update`.

## Autor

-   Nome: Willer Santos
-   Local: São Paulo, SP
-   Formado: BA Chemical Engineering
