
# Bankme - desafio técnico

Aplicação para processamento de recebíveis
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar das seguintes variáveis de ambiente no arquivo .env dentro do diretório "bankme-backend"

`DATABASE_URL`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`EMAIL_PASS_KEY`

- Para fins de praticidade, apenas renomeie o arquivo ".env.example" para ".env" que será suficiente.




## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/jjribeiro1/aprove-me.git
```
### - Backend
Entre no diretório do backend

```bash
  cd bankme-backend
```

- Substitua o nome do arquivo ".env.example" para apenas ".env"


Faça build do container
```bash
  docker compose up --build
```

### - Frontend

Entre no diretório do Frontend

```bash
  cd bankme-frontend
```

Instale as dependências

```bash
  pnpm install
```

Execute o script para inicializar

```bash
pnpm run dev
```


## Funcionalidades

- CRUD da entidade `Assignor`
- CRUD da entidade `Payable`
- Autenticação
- Gerenciamento de permissões
- Processamento assíncrono de lotes de até 10.000 pagáveis utilizando RabbitMQ
- Notificação por e-mail após processamento de lote informando o número de sucessos e falhas.


## Stack utilizada

**Front-end:** React, NextJS, React Query, TailwindCSS e Shadcn-ui

**Back-end:** NestJS, SQLite, Prisma e RabbitMQ
