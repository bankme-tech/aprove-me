<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>


## 📋 Sobre

Aplicação para o teste técnico da Bankme.

### Objetivo

Sistema de gestão de recebíveis: A aplicação permite que usuários cadastrem, listem e excluam recebíveis de forma eficiente.

### Funcionalidades

- Cadastro de recebíveis
- Listagem de recebíveis
- Exclusão de recebíveis
- Cadastro de cedentes
- Listagem de cedentes
- Exclusão de cedentes

## 🚀 Tecnologias utilizadas

### Backend

- NodeJS
- NestJS
- Prisma
- Jest
- RabbitMQ

## Executando o projeto

1 - Altere o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente.
```bash
mv ~/.env.example ~/.env
```
> [!NOTE]
> Lembre se que a url do RabbitMQ é baseada no service do docker-compose, então ao invés de ser `localhost` será `rabbitmq`


2 - Executar o container
```bash
docker compose up --build
```

Dentro da pasta`packages/api/http` existem arquivos demonstrando o que as rotas aceitam de parâmetros

## Contato

[E-mail](caiofsr13@gmail.com)
[Linkedin](https://www.linkedin.com/in/caiofsr)
