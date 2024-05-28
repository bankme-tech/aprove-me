<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>



Aprove-me é uma aplicação full-stack que utiliza ferramentas como NestJS, NextJS, BullMQ, Redis e Docker Compose. Este documento fornece uma visão geral do projeto, bem como instruções detalhadas sobre como configurá-lo, executá-lo e contribuir para ele.

## Sumário

1. [Visão Geral](#visão-geral)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
    - [Clonando o Repositório](#clonando-o-repositório)
    - [Iniciando o projeto](#iniciando-o-projeto)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Contribuição](#contribuição)
6. [Scripts](#scripts)
    - [Backend](#backend-scripts)
    - [Frontend](#frontend-scripts)


## Visão Geral

Essa é uma aplicação moderna desenvolvida utilizando várias tecnologias de ponta para oferecer uma solução robusta e escalável. Ele é composto por um backend desenvolvido em NestJS e Prisma, um frontend em NextJS, BullMQ para gerenciamento de filas, Redis para armazenamento em memória e Docker Compose para orquestração de contêineres e foi feito como um desafio técnico para a empresa aprove-me.

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
## Rotas

É possível ver as rotas através do http://localhost:3000/api#/.

### Frontend Scripts
Os principais scripts disponíveis no frontend são:
```
dev: Inicia o servidor de desenvolvimento Next.js na porta 3001.
build: Compila o projeto Next.js.
start: Inicia o servidor Next.js em modo de produção.
lint: Executa o lint do código usando ESLint.
```


## Deixe suas sugestões de melhora e sinta-se a vontade para abrir um PR.