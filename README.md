<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me 
</h1>

## Sumário

- [Sumário](#sumário)
- [Sobre](#sobre)
- [Pré-requisitos](#pré-requisitos)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Como rodar o projeto](#tecnologias-usadas)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Endpoints](#endpoints)

## Sobre

Este projeto é um desafio técnico proposto pela empresa Bankme. O objetivo é desenvolver uma nova funcionalidade
relacionada a recebíveis para facilitar o cadastro automático desses documentos que representam dívidas a serem
recebidas pelo cliente.

## Pré-requisitos

Certifique-se de que seu ambiente atenda aos seguintes requisitos:

- Node.js (versão 20.1.x)
- Docker
- Outras dependências específicas do projeto (consulte o arquivo package.json em ambas pastas backend e frontend)

## Tecnologias Usadas

### Frontend

- React com Vite
- React Router Dom
- Tailwind CSS com Shadcn
- Zod (para validação de esquemas)
- React Query e Axios (para gerenciamento de estados e requisições HTTP)

### Backend

- Nest.js (framework para desenvolvimento de APIs em Node.js)
- Prisma com SQLite (ORM para banco de dados)
- ClassValidator (para validação de dados)
- Redis e BullMQ (para gerenciamento de filas e processamento de tarefas assíncronas)

## Como rodar o projeto

1. Clone do repositório

```bash
git clone https://github.com/k1nha/aprove-me.git
```

2. Utilize docker para executar a aplicação backend

   O docker é responsável por criar uma por criar um contêiner para a nossa aplicação backend.
   Isso iniciará todos os serviços definidos no arquivo docker-compose.yml. Uma vez que os serviços estejam em execução,
   você poderá acessar a aplicação através do navegador ou de outra ferramenta de cliente de API.

```bash
docker compose up
```

3. Instale as dependências e execute o frontend

```bash
cd frontend 
pnpm install
pnpm dev
```

4. Acessar a aplicação no navegador:

   Acesse http://localhost:5173 para visualizar o frontend e utilize as funcionalidades desenvolvidas.

   Acesse http://localhost:5173 para ter o acesso ao backend


5. Crie um usuário

`POST /integrations/auth/create`

```json
{
  "username": "approve",
  "password": "approve"
}
```

## Arquitetura da aplicação

O backend segue uma arquitetura em módulos para organizar e separar responsabilidades. Cada módulo representa uma parte
da aplicação e contém seus próprios controladores, serviços, modelos de dados e rotas. Isso facilita a manutenção e
escalabilidade do sistema

## Filas e email

Foi utilizado um fake smtp [Ethereal](https://ethereal.email/), as credenciais foram fornecidas no `.env`
ou `env.example` e para acessar basta fazer o login na plataforma.

## Endpoints

Toda a aplicação backend está protegida por AuthGuards por meio de JWT com validade de 1 minuto. Caso queira mudar, pode
diretamente no .env.example ou .env.docker

### Cedente

`POST /integrations/assignor - 201 CREATED`

```json
//BODY
{
  "document": "11111111111",
  "email": "teste@teste.com",
  "phone": "71999999999",
  "name": "teste"
}
```

`GET /integrations/assignor/:id - 200 OK`

```json
//RESPONSE
{
  "assignor": {
    "id": "57292dcc-2982-485a-adcd-a15219b90824",
    "document": "11111111111",
    "email": "teste@teste.com",
    "phone": "71999999999",
    "name": "teste",
    "created_at": "2024-02-15T23:22:01.266Z",
    "updated_at": "2024-02-15T23:22:01.266Z",
    "deleted_at": null
  }
}
```

`PATCH /integrations/assignor/:id - 200 OK`

```json
//PARTIAL BODY
{
  "phone": "71999999999",
  "name": "teste"
}
```

`DELETE /integrations/assignor/:id - 200 OK`

### Pagavéis

`POST /integrations/payable - 201 CREATED`

```json
// Body
{
  "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
  "emission_date": "2024-02-15T23:43:21.768Z",
  "value": 45.6
}
```

`GET /integrations/payable/:id - 200 OK`

```json
// Response
{
  "receivable": {
    "id": "06145b8f-c314-43dd-b24b-1a4ef54935eb",
    "value": 45.6,
    "emission_date": "2024-02-15T23:43:21.768Z",
    "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
    "created_at": "2024-02-15T23:44:06.880Z",
    "updated_at": "2024-02-15T23:44:06.880Z",
    "deleted_at": null
  }
}
```

`PATCH /integrations/payable/:id - 200 OK`

```json
//Partial body
{
  "value": 23
}
```

`DELETE /integrations/payable/:id - 200 OK`

`POST /integrations/payable/batch - 201 CREATED`

```json
// Body
{
  "receivable_batch": [
    {
      "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
      "emission_date": "2024-02-15T23:43:21.768Z",
      "value": 223
    },
    {
      "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
      "emission_date": "2024-02-15T23:43:21.768Z",
      "value": 213
    },
    {
      "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
      "emission_date": "2024-02-15T23:43:21.768Z",
      "value": 213
    },
    {
      "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
      "emission_date": "2024-02-15T23:43:21.768Z",
      "value": 123
    },
    {
      "assignor_id": "57292dcc-2982-485a-adcd-a15219b90824",
      "emission_date": "2024-02-15T23:43:21.768Z",
      "value": 723
    }
  ],
  "email": "teste@teste.com"
}
```

### User

`POST /integrations/auth/create - 201 CREATED`

```json
// Body
{
  "username": "approve",
  "password": "approve"
}
```

`POST /integrations/auth - 201 CREATED`

```json
// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmY5NDFiMy1kM2ZmLTQ5N2YtYTViZC00MmFjN2JjZTczOTYiLCJpYXQiOjE3MDgzNzU3OTIsImV4cCI6MTcwODQzNTc5Mn0.pmDdpH_6MkTTeJxIf4HRjLI0wThThwuVdjNDSUyqzOc"
}
```