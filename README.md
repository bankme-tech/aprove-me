<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>

<video src="./assets/demo-aproveme-app.webm"></video>

Aprove-me é uma aplicação full-stack que utiliza ferramentas como NestJS, NextJS, BullMQ, Redis e Docker Compose. Este documento fornece uma visão geral do projeto, bem como instruções detalhadas sobre como configurá-lo, executá-lo e contribuir para ele.

## Sumário

1. [Visão Geral](#visão-geral)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
    - [Clonando o Repositório](#clonando-o-repositório)
    - [Iniciando o projeto](#iniciando-o-projeto)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Contribuição](#contribuição)
6. [Rotas da API](#rotas-da-api)
7. [Scripts](#scripts)
    - [Backend](#backend-scripts)
    - [Frontend](#frontend-scripts)


## Visão Geral

Essa é uma aplicação moderna desenvolvida utilizando várias tecnologias de ponta para oferecer uma solução robusta e escalável. Ele é composto por um backend desenvolvido em NestJS e Prisma, um frontend em NextJS, BullMQ para gerenciamento de filas, Redis para armazenamento em memória e Docker Compose para orquestração de contêineres, algumas bibliotecas interessantes foram usadas no frontend, sendo elas a useHookForm, tansteck query, shadcn e tailwind como as mais importantes e foi feito como um desafio técnico para a empresa aprove-me.

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- Node.js (versão 20 ou superior)
- Docker
- Docker Compose


## Instalação

### Clonando o Repositório

```sh
git clone https://github.com/danrlleimiranda/aprove-me.git
cd aprove-me
```


### Iniciando o projeto

```sh
npm run compose:up
```

A partir da primeira inicialização, você pode iniciar apenas com o docker-compose up.

Obs: Caso você queira iniciar sem o docker, precisará ter o Redis instalado em sua máquina, para que funcione da forma correta o sistema de filas.

### Parando execução

```sh
npm run compose:down
```

### Estrutura do Projeto

```
aprove-me/
│
├── backend/               # Código do backend NestJS
|   ├── prisma/
│   ├── src/
│   │   ├── assignor/
│   │   ├── auth/
│   │   ├── exceptions/
│   │   ├── middlewares/
│   │   ├── payable/
│   │   ├── queue/
│   │   ├── scripts/
│   │   ├── send-email/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   ├── test/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/              # Código do frontend NextJS
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml     # Configuração do Docker Compose
└── README.md              # Documentação do projeto
```


## Contribuição
Se você deseja contribuir para o projeto, siga os passos abaixo:

```
Faça um fork do repositório.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas alterações (git commit -m 'Adiciona nova feature').
Envie para o repositório remoto (git push origin feature/nova-feature).
Abra um Pull Request.
```

## Rotas da API
#### Payable
`GET /integrations/payable`
##### Retorna todos os payables.

Exemplo de Resposta:

```
[
  {
    "id": 1,
    "amount": 100.00,
    "status": "paid",
    "created_at": "2023-05-27T12:34:56.789Z"
  },
  ...
]
```

`GET /integrations/payable/:id`
 ##### Retorna um payable específico.

Parâmetros:

id (string): ID do payable
Exemplo de Resposta:

```
{
  "id": UUID,
  "value": 0,
  "emissionDate": "2024-05-28T16:31:07.768Z",
  "assignorId": "string"
}
```

`POST /integrations/payable`
##### Cria um novo payable.

Corpo da Requisição:

```
{
  "value": 0,
  "emissionDate": "2024-05-28T16:31:07.768Z",
  "assignorId": "string"
}
```
Exemplo de Resposta:

```
{
  "id": UUID,
  "value": 0,
  "emissionDate": "2024-05-28T16:31:07.768Z",
  "assignorId": "string"
}

```
`
PUT /integrations/payable/:id
`
##### Atualiza um payable existente.

Parâmetros:

id (string): ID do payable
Corpo da Requisição:

```
{
    "emissionDate": "2024-05-28T16:31:07.768Z",
}
```
Exemplo de Resposta:

```
{
  "id": 1,
  "value": 0,
  "emissionDate": "2024-05-28T16:31:07.768Z",
}
```

`
DELETE /integrations/payable/
`
##### Deleta um payable.

Exemplo de resposta:

Apenas status 204

Parâmetros:

id (string): ID do pagamento


#### Assignor
`GET /integrations/assignor`
##### Retorna todos os assignors.

Exemplo de Resposta:

```
[
  {
    "id": 1,
    "document": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "name": "string"
  },
  ...
]
```
`GET /integrations/assignor/`
#### Retorna um assignor específico.

Parâmetros:

id (string): ID do assignor
Exemplo de Resposta:

```
{
  "id": 1,
  "document": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "name": "string"
}
```
`POST /integrations/assignor`
Cria um novo assignor e funciona como o registro de um novo usuário.

Corpo da Requisição:

```
{
  "document": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "name": "string"
}
```
Exemplo de Resposta:

```
{
  "id": 2,
  "document": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "name": "string"
}
```
`PUT /integrations/assignor/`
#### Atualiza um assignor existente.

Parâmetros:

id (string): ID do cedente
Corpo da Requisição:

```
{
  "name": "Company A Updated"
}
```
Exemplo de Resposta:

```
{
  "id": 1,
  "document": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "name": "Company A Updated"
}
```

`DELETE /integrations/assignor/`
#### Deleta um assignor.

Parâmetros:

id (string): ID do cedente

Exemplo de Resposta:

Apenas status 204
#### Auth

`POST /integrations/auth/`
#### Autentica um usuário e retorna um token JWT.

Corpo da Requisição:

```
{
  "login": "user@email.com",
  "password": "password"
}
```
Exemplo de Resposta:

```
{
  "token": "jwt-token"
}
```

É possível ver as rotas através do http://localhost:3000/api#/.

## Scripts
### Backend Scripts

Os principais scripts disponíveis no backend são:

```
 build: Compila o projeto NestJS.
 format: Formata o código usando Prettier.
 start: Inicia o servidor NestJS.
 start:dev: Inicia o servidor NestJS em modo de desenvolvimento com hot-reload.
 start:debug: Inicia o servidor NestJS em modo de depuração com hot-reload.
 start:prod: Inicia o servidor NestJS em modo de produção.
 lint: Executa o lint do código usando ESLint.
 test: Executa os testes unitários usando Jest.
 test:watch: Executa os testes unitários em modo de observação.
 test:cov: Executa os testes e gera o relatório de cobertura.
 test:debug: Inicia os testes em modo de depuração.
 test:e2e: Executa os testes end-to-end.
 seed: Executa o script de seed para popular o banco de dados.
```


### Frontend Scripts
Os principais scripts disponíveis no frontend são:
```
dev: Inicia o servidor de desenvolvimento Next.js na porta 3001.
build: Compila o projeto Next.js.
start: Inicia o servidor Next.js em modo de produção.
lint: Executa o lint do código usando ESLint.
```


## Deixe suas sugestões de melhora e sinta-se a vontade para abrir um PR.
