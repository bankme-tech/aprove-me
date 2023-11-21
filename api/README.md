<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Descrição

Esta é uma aplicação para gestão de recebíveis construída com o framework [Nest](https://github.com/nestjs/nest), Prisma e Docker.</br></br>
Nela é possível realizar as principais operações (CRUD) para recebíveis e cedentes, além da gestão de usuários autorizados a realizar as operações.

<details>
<summary><strong>1. Estrutura de um recebível:</strong></summary>

```bash
  id: uuid,
  value: number,
  emissionDate: date (2023-08-30),
  assignor: uuid
```
</details>


<details>
<summary><strong>2. Estrutura de um cedente:</strong></summary>

```bash
  name: string,
  document: string,
  email: string,
  phone: string
```
</details>

<details>
<summary><strong>3. Estrutura de um usuário:</strong></summary>

```bash
  username: string,
  password: string
```
</details>


## Requisitos
- [NodeJS LTS](https://github.com/nodesource/distributions/blob/master/README.md#debinstall) (18 ou mais).
  - O Sistema Operacional [deve suportar o NodeJS](https://github-com.translate.goog/nodejs/build/issues/2168?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=nui).

- Docker e docker-compose

## Instalação

```bash
$ npm install
```

- Adicionar as variáveis de ambiente necessárias no arquivo `.env` na raiz do projeto, como o arquivo `.env.example`, sendo elas:

```
DATABASE_URL="file:./local.db"
JWT_SECRET="secret"
```

## Rodando a aplicação

```bash
# primeira vez
$ docker-compose build
$ docker-compose up -d

# subir
$ docker-compose up -d

# subir em watch mode
$ docker-compose up

# parar
$ docker-compose down
```

## Estrutura do projeto
<details>
<summary><strong>Backend</strong></summary>

```bash
prisma
├── local.db
├── migrations
│   ├── 20231114014638_create_payable_and_assignor_tables
│   │   └── migration.sql
│   ├── 20231115022451_update_assignor_id_to_uuid_type
│   │   └── migration.sql
│   ├── 20231115205611_create_users_table
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── infra
│   └── database
│       └── prisma
│           ├── assignor.repository.ts
│           ├── payable.repository.ts
│           ├── prisma.module.ts
│           ├── prisma.service.ts
│           ├── test
│           │   ├── assignor-repository.spec.ts
│           │   ├── mock
│           │   │   └── prisma-service.mock.ts
│           │   └── payable-repository.spec.ts
│           └── users.repository.ts
├── main.ts
└── modules
    ├── assignor
    │   ├── assignor.controller.ts
    │   ├── assignor.module.ts
    │   ├── assignor.service.ts
    │   ├── dto
    │   │   └── create-assignor.dto.ts
    │   ├── interfaces
    │   │   ├── assignor.interface.ts
    │   │   ├── assignor.repository.interface.ts
    │   │   └── assignor-service.interface.ts
    │   └── test
    │       ├── assignor.controller.spec.ts
    │       ├── assignor.service.spec.ts
    │       └── mock
    │           └── create-assignor.mock.ts
    ├── auth
    │   ├── auth.controller.ts
    │   ├── auth.guard.ts
    │   ├── auth.module.ts
    │   ├── auth.service.ts
    │   ├── dto
    │   │   └── signIn.dto.ts
    │   └── test
    │       ├── auth.controller.spec.ts
    │       └── auth.service.spec.ts
    ├── payable
    │   ├── dto
    │   │   ├── create-payable.dto.ts
    │   │   └── update-payable.dto.ts
    │   ├── interfaces
    │   │   ├── payable.interface.ts
    │   │   ├── payable.repository.interface.ts
    │   │   └── payable.service.interface.ts
    │   ├── payable.controller.ts
    │   ├── payable.module.ts
    │   ├── payable.service.ts
    │   └── test
    │       ├── mock
    │       │   └── create-payable.mock.ts
    │       ├── payable.controller.spec.ts
    │       └── payable.service.spec.ts
    └── users
        ├── interface
        │   ├── user.interface.ts
        │   ├── users-repository.interface.ts
        │   └── users-service.interface.ts
        ├── test
        │   └── users.service.spec.ts
        ├── users.module.ts
        └── users.service.ts
```
</details>

<details>
<summary><strong>Frontend</strong></summary><br>

```bash

```
</details>


## cURLs
Os cURLs abaixo podem ser utilizados em ferramentas como o Postman para testar diretamente o Backend sem necessidade de subir ou ter o Frontend.

<details>
<summary><strong>Autenticação</strong></summary><br>

```bash
curl --location --request POST 'localhost:3001/integrations/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "aprovame",
    "password": "aprovame"
}'
```
</details><br>

<details>
<summary><strong>Recebíveis (Payable)</strong></summary><br>
  <details>
    <summary>Criar recebível</summary>

    ```bash
    curl --location --request POST 'localhost:3001/integrations/payable' \
    --header 'Authorization: Bearer {{token}}' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "id": "312fab91-c0b9-444c-9b46-c6f24e83bdeb",
        "value": 12.93,
        "emissionDate": "2023-08-30",
        "assignor": "ec5c7b91-4ae4-4470-bbc4-d042c16f006d"
    }'
    ```
  </details>

  <details>
    <summary>Consultar recebíveis</summary>

    ```bash
    curl --location --request GET 'localhost:3001/integrations/payable' \
    --header 'Authorization: Bearer {{token}}'
    ```
  </details>
  
  <details>
    <summary>Alterar informações de um recebível</summary>

    ```bash
    curl --location --request PATCH 'localhost:3001/integrations/payable' \
    --header 'Authorization: Bearer {{token}}' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "id": "ca77a4cb-93fd-4f5f-abc2-ab047b76005d",
        "value": 12.93,
        "emissionDate": "2023-08-30",
        "assignor": "ec5c7b91-4ae4-4470-bbc4-d042c16f006d"
    }'
    ```
  </details>

  <details>
    <summary>Excluir um recebível</summary>

    ```bash
    curl --location --request DELETE 'localhost:3001/integrations/payable/ef08f049-4431-4642-85e2-3e44d2f4397e' \
    --header 'Authorization: Bearer {{token}}'
    ```
  </details>

  <details>
    <summary>Criar diversos recevíveis (batch)</summary>

    ```bash
    curl --location --request POST 'localhost:3001/integrations/payable/batch' \
    --header 'Authorization: Bearer {{token}}' \
    --header 'Content-Type: application/json' \
    --data-raw '[
        {
            "id": "dd877394-6860-4115-a386-65cfba0fa58b",
            "value": 193,
            "emissionDate": "2023-08-30",
            "assignor": "808f2acf-c404-4b5e-a70c-708120fb9673"
        },
        {
            "id": "fafb7cf4-bf7a-44ea-a04e-b459ecd8bc6e",
            "value": 18.00,
            "emissionDate": "2023-08-31",
            "assignor": "808f2acf-c404-4b5e-a70c-708120fb9673"
        }
    ]'
    ```
  </details>
</details><br>

<details>
<summary><strong>Cedentes (Assignor)</strong></summary><br>
<details>
  <summary>Criar um cedente</summary>

  ```bash
  curl --location --request POST 'localhost:3001/integrations/assignor' \
  --header 'Authorization: Bearer {{token}}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "name": "Any name",
      "document": "any document",
      "email": "anyemail@email.com",
      "phone": "any phone"
  }'
  ```
</details>

<details>
  <summary>Consultar os cedentes</summary>

  ```bash
  curl --location --request GET 'localhost:3001/integrations/assignor' \
  --header 'Authorization: Bearer {{token}}'
  ```
</details>

<details>
  <summary>Alterar informações de um cedente</summary>

  ```bash
  curl --location --request PATCH 'localhost:3001/integrations/assignor' \
  --header 'Authorization: Bearer {{token}}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "name": "Any name",
      "document": "any document",
      "email": "anyemail@email.com",
      "phone": "any phone"
  }'
  ```
</details>

<details>
  <summary>Excluir um cedente</summary>

  ```bash
  curl --location --request DELETE 'localhost:3001/integrations/assignor/ef08f049-4431-4642-85e2-3e44d2f4397e' \
  --header 'Authorization: Bearer {{token}}'
  ```
</details>
</details><br>

<details>
<summary><strong>Usuários (User)</strong></summary><br>
  <details>
    <summary>Criar usuário</summary>
  </details>
  <details>
    <summary>Consultar usuários</summary>
  </details>
</details><br>

## Testes

<details>
<summary><strong>Backend</strong></summary>

```bash
# testes unitários
$ npm run test

# testes unitários com cobertura
$ npm run test:cov
```
</details>


## Licenças

Nest is [MIT licensed](LICENSE).
