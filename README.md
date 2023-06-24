## API de Validação de Recebíveis e Cedentes

Esta API foi desenvolvida utilizando o framework NestJS e tem como objetivo receber dados, realizando a validação desses dados.

Estrutura de acordo com o que foi definido.

REST API:

```bash
GET /integrations/payable/:id
GET /integrations/assignor/:id
PATCH /integrations/payable/:id
PATCH /integrations/assignor/:id
DELETE /integrations/payable/:id
DELETE /integrations/assignor/:id
```

## Teste Rest API

Exemplo de teste para o payable:

Utilize o verção 4 do UUID

```bash
{
  "id": "2ad5424a-7554-44f5-ab22-d38e6585b857",
  "value": 1000,
  "emissionDate": "2023-06-22T00:00:00Z",
  "assignor": 1
}
```

Exemplo de teste para o assignor:

```bash
{
  "document": "123456789",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "name": "John Doe"
}
```

## Testes Unitários

Os testes unitários foram feitos para validar todo o processo de rotas da aplicação.

Arquivos:

```bash
assignor.controller.spec.ts

payable.controller.spec.ts

auth.controller.spec.ts

user.controller.spec.ts
```

Executanto teste:

```bash
{
  npm test
}
```

## Autenticação

Inclua um sistema de autenticação em todas as rotas.

```bash
POST /integrations/auth
```

Com:

```bash
{
  "login": "aprovame",
  "password": "aprovame"
}

```

Duração da validação é 1m depois é necessario fazer de novo.

Para fazer a validação é necessario passar no Header:

```bash
Authorization: Bearer <token>
```

Token deve ser substituido pelo token gerado, exemplo:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFwcm92YW1lIiwiaWF0IjoxNjg3NTMyMDQ2LCJleHAiOjE2ODc1MzIxMDZ9.MjTn-kmiOygd7HkfKPnZnylh_swuImeoDCUoIvpK7lo
```

## Gerenciamento de permissões

Utilize a rota para criar o cadastro :

```bash
POST integrations/register
```

Exemplo de cadastro:

```bash
{
  "login": "login123",
  "senha": "senha123"
}
```

Agora, utilize a rota:

```bash
POST integrations/auth
```

Agora teste o cadastro:

```bash
{
  "login": "login123",
  "password": "senha123"
}
```

## Infra e Doc

Itens criados:

```bash
{
  .dockerignore
  Dockerfile
  docker-compose.yaml
}
```

Utilização do Docker:
Dentro de /aprove-me

```bash
/aprove-me
```

Build e compose:

```bash
$ docker build --pull --rm -f "receivables-api\Dockerfile" -t aproveme:latest "receivables-api"


$ docker compose -f "receivables-api\docker-compose.yml" up -d --build
```

A API estará disponível localmente em http://localhost:3000.

## Front-end de Recebíveis e Cedentes

Iniciar projeto:

```bash
$ npm install

$ npm run dev

```

## Cadastro

Interface na qual é possível cadastrar os pagáveis em Next.js e previne o cadastro de campos vazios, ou que não estejam nas regras definidas na API.

Os campos do componete Payable são valiados, permitindo o envio do formulario atendendo todos os requisitos do escopo do projeto.
