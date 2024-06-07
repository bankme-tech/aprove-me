# Willer bank Backend

## Introdução

Este projeto consiste em uma plataforma de gestão de recebíveis desenvolvida para facilitar o registro e a administração dos recebíveis diários de clientes da 'Willer Bank'. Inclui funcionalidades de CRUD de recebíveis, CRUD de cedentes, registro em lote de recebíveis.

## Pré-requisitos

Para rodar e dar build do projeto localmente você precisará de algumas ferramentas:

-   Instale [Node.js](https://nodejs.org/en/)
-   Instale [VS Code](https://code.visualstudio.com/)

## Primeiros passos

### Rodando em modo de desenvolvimento

Primeiro, para rodar em modo de desenvolvimento execute no terminal:

```bash
npm i
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

Abra [http://localhost:8000/](http://localhost:8000/) ou [http://localhost:8000/healt-check](http://localhost:8000/healt-check) no seu navagador para verificar que a api está rodando.

### Build do projeto

Primeiro, para rodar em modo de desenvolvimento execute no terminal:

```bash
npm i
npm run prisma:generate
npm run prisma:migrate
npm run build
npm run start:prod
```

Abra [http://localhost:8000/](http://localhost:8000/) ou [http://localhost:8000/healt-check](http://localhost:8000/healt-check) no seu navagador para verificar que a api está rodando.

### Variáveis de ambiente

-   PORT = # porta que roda o servidor (8000)
-   NODE_ENV = # identificação de ambiente (development)
-   FRONTEND_URL = # caso seja aplicado o CORS em produção para segurança e limitação de consumidores é possível colocar a URL do frontend
-   DATABASE_URL = # endereço do arquivo que representa o banco de dados (file:./data/dev.db)
-   ACCESS_TOKEN_EXPIRATION_MINUTES = # tempo de expiração do token (1)
-   JWT_SECRET = # secredo que hasheia o token (lylVsWQiBvxWaSAPQ0Fv24ow9YuR9arA0heDclO5u1XbAvSWbA6VeCHJGq4mcayY)
-   EXCHANGE_URL = # url utilizada para a instância que roda o Rabbit (amqps://gedxicsq:GOlDkOTUm-7RBQqDXse-pjyBHyZzACol@jackal.rmq.cloudamqp.com/gedxicsq)
-   SES_SMTP_USERNAME = # usuário do SMTP no AWS SES (AKIAUKA64ZWWXHOAHHWL)
-   SES_SMTP_PASSWORD = # senha do SMTP no AWS SES (BJxxSnoWPbAkIbRY/22AqjKAIvLi4j6DpTz9tUuV8BYS)
-   SES_FROM_MAIL = # email de origem (willer.poveda.santos@usp.br)
-   SES_HOST = # host da AWS para envio do email (email-smtp.us-east-1.amazonaws.com)
-   SES_PORT = # porta para envio de email (465)

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

## Dependências do projeto

### `dependencies`

| Pacote                       | Descrição                                                    |
| ---------------------------- | ------------------------------------------------------------ |
| **@nestjs/common**           | Módulos e utilitários comuns para o NestJS.                  |
| **@nestjs/config**           | Módulo de configuração para o NestJS.                        |
| **@nestjs/schematics**       | Schematics para geração de código e arquivos no NestJS.      |
| **@nestjs/cli**              | CLI para gerenciamento de projetos NestJS.                   |
| **@nestjs/core**             | Núcleo do NestJS.                                            |
| **@nestjs/platform-express** | Plataforma Express para aplicações NestJS.                   |
| **@prisma/client**           | Cliente Prisma para interação com o banco de dados.          |
| **bcrypt**                   | Biblioteca para hashing de senhas.                           |
| **body-parser**              | Middleware para parsing de corpo de requisições.             |
| **class-transformer**        | Biblioteca para transformar objetos em classes e vice-versa. |
| **class-validator**          | Biblioteca para validação de objetos com decorators.         |
| **helmet**                   | Middleware para segurança de aplicações Express.             |
| **prisma**                   | Ferramenta de ORM para bancos de dados.                      |
| **jsonwebtoken**             | Biblioteca para manipulação de JSON Web Tokens.              |
| **prisma-multischema**       | Ferramenta para trabalhar com múltiplos schemas no Prisma.   |
| **reflect-metadata**         | Biblioteca para adicionar suporte a metadados no TypeScript. |
| **rxjs**                     | Biblioteca para programação reativa com Observables.         |

### `devDependencies`

| Pacote                                | Descrição                                                                |
| ------------------------------------- | ------------------------------------------------------------------------ |
| **@babel/core**                       | Utilizado para os testes.                                                |
| **@babel/plugin-proposal-decorators** | Utilizado para os testes.                                                |
| **@babel/preset-env**                 | Utilizado para os testes.                                                |
| **@babel/preset-typescript**          | Utilizado para os testes.                                                |
| **@nestjs/testing**                   | Utilitários para testes no NestJS.                                       |
| **@types/bcrypt**                     | Definições de tipos do TypeScript para o pacote `bcrypt`.                |
| **@types/body-parser**                | Definições de tipos do TypeScript para o pacote `body-parser`.           |
| **@types/express**                    | Definições de tipos do TypeScript para o pacote `express`.               |
| **@types/jest**                       | Definições de tipos do TypeScript para o Jest.                           |
| **@types/jsonwebtoken**               | Definições de tipos do TypeScript para o pacote `jsonwebtoken`.          |
| **@types/node**                       | Definições de tipos do TypeScript para o Node.js.                        |
| **@types/passport-local**             | Definições de tipos do TypeScript para o pacote `passport-local`.        |
| **@types/supertest**                  | Definições de tipos do TypeScript para o Supertest.                      |
| **@typescript-eslint/eslint-plugin**  | Suporte TypeScript para ESLint                                           |
| **@typescript-eslint/parser**         | Parser TypeScript para o ESLint.                                         |
| **babel-jest**                        | Preprocessador para usar Babel com o Jest.                               |
| **eslint**                            | Linter padronizar código.                                                |
| **eslint-config-prettier**            | Configuração do ESLint que desativa regras que conflitam com o Prettier. |
| **eslint-import-resolver-typescript** | Resolver de importações para ESLint com suporte a TypeScript.            |
| **eslint-plugin-import**              | Plugin do ESLint para validação de importações.                          |
| **eslint-plugin-prettier**            | Plugin do ESLint para integrar o Prettier ao ESLint.                     |
| **jest**                              | Framework de testes JavaScript.                                          |
| **prettier**                          | Formatador de código.                                                    |
| **supertest**                         | Biblioteca para testes de integração em aplicações web.                  |
| **ts-jest**                           | Preprocessador para usar TypeScript com o Jest.                          |
| **ts-node**                           | Compilador de arquivos TS diretamente no Node.                           |
| **tsconfig-paths**                    | Suporte a paths no TypeScript.                                           |
| **typescript**                        | Bliblioteca de tipos no JS.                                              |

Para instalar ou atualizar essas dependências, você pode usar `npm install` ou `npm update`.

## Filas

## Deploy e recursos necessários

## Autor

-   Nome: Willer Santos
-   Local: São Paulo, SP
-   Formado: Engenheiro Químico, Escola Politécnica da USP
