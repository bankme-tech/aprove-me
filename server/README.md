<p align="center">
  <a href=""><img src="./assets/logo-bankme.png" width="200" alt="Nest Logo" /></a>
  <h1 align="center">Teste Aprova-me</h1>
</p>

## Description

Teste para FullStack developer pleno.

## Preparação do ambiente

Os passos necessários antes de seguirmos com a etapa de instalação das dependências são:

- Criar um arquivo .env
- Dentro desse arquivo, copiar as informações do arquivo .env.example
- Atribuir um valor a essa variável com fins de se trabalhar com autenticação no repositório.

## Instalando dependências

A instalação das dependências é simples, podemos executar o script:

```bash
$ npm install
```

## Iniciando a aplicação

```bash
# Ambiente de desenvolvimento
$ npm run start

# Ambiente de desenvolvimento com watch mode
$ npm run start:dev

# Ambiente de produção
$ npm run start:prod
```

## Endpoints

```
- Health
GET /

- Autenticação
POST /auth

- Busca por informações do usuário
GET auth/profile

- Criação de um Pagável
POST /integrations/payable

- Busca por pagável
GET /integrations/payable/:id

- Busca por um cedente
GET /integrations/assignor/:id

- Update de um pagável
PATCH /integrations/payable/:id

- Update de um cedente
PATCH /integrations/assignor/:id

- Exclusão de um pagável
DELETE /integrations/payable/:id

- Exclusão de um cedente
DELETE /integrations/assignor/:id

```
