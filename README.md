<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me 
</h1>

## Sumário

- [Sumário](#sumário)
- [Requisitos](#requisitos)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Como rodar o projeto](#tecnologias-usadas)

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

```bash
docker compose up
```

3. Instale as dependências e execute o frontend

```bash
cd frontend 
pnpm install
pnpm dev
```

## Arquitetura da aplicação