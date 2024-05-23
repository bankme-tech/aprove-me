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
- Cadastro de recebíveis por lotes
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

### Frontend

- ReactJS
- Next
- Axios
- shadcnUi
- TailwindCSS

## 🚀 Como executar

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

3 - Verificar o projeto rodando
Acesse `http://localhost:3000` e faça o login com o usuário `aprovame` e a senha `aprovame`

Dentro da pasta`packages/api/http` existem arquivos demonstrando o que as rotas aceitam de parâmetros

## Pontos para melhoria
1 - Criar um github actions para testes unitários juntamente com CI
2 - Melhorar os Dockerfile para ter 2 estágios de build e economizar espaço em produção
3 - Melhorar gerenciamento de estados no frontend com zustand

## Contato

E-mail: [caiofsr13@gmail.com](mailto:caiofsr13@gmail.com) <br>
[Linkedin](https://www.linkedin.com/in/caiofsr)
