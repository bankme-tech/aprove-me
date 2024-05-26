# Backend
<details>
<summary> Detalhes </summary>

## Sumário
- [📦 Instalação Local](#instalação-local)
- [🐳 Instalação via Container (Docker)](#instalação-via-container-docker)
- [🚀 Execução](#execução)
- [📚 Documentação da API](#documentação-da-api)
- [🔗 Endpoints Disponíveis](#endpoints-disponíveis)
  - [📄 Recebíveis](#recebíveis)
  - [👥 Cedentes](#cedentes)
  - [👤 Usuários](#usuários)
- [🔒 Autenticação](#autenticação)
- [🛠 Tecnologias Utilizadas](#tecnologias-utilizadas)
- [💻 Linguagens Utilizadas](#linguagens-utilizadas)
- [🧪 Testes](#testes)
  - [📋 Como Testar](#como-testar)

## API de Gerenciamento de Recebíveis e Cedentes

Esta é uma API desenvolvida em NestJS para gerenciamento de recebíveis. Ela permite realizar operações CRUD (Create, Read, Update, Delete) em recebíveis, cedentes e usuários, utilizando um banco de dados SQLite e implementando autenticação com JWT e criptografia de senha com bcrypt.



## Como Usar

### Instalação local
1. Certifique-se de ter o Node.js e o npm instalados.
2. Clone este repositório.
3. Entre na pasta backend ou digite no terminal, `cd aprove-me/backend`, logo apois terminar o clone.
4. Execute `npm install` para instalar as dependências.
5. Execute `npm run start:dev` para iniciar o servidor local.

[🔼](#sumário)
### Instalação via container (Docker)

Caso você prefira rodar via container, o que é mais adequado para evitar conflitos de versões de dependências, siga as instruções a baixo.

1. Certifique-se de ter o docker, Node.js e o npm instalados.
2. Clone este repositório.
3. Entre na pasta backend, ou no terminal, digite `cd aprove-me/backend`, logo apois o clone.
4. Execute `npm install` para instalar as dependências.
5.  Abra o terminal, certifique-se de que esteja na pasta raiz do projeto ou em um de seus subdiretórios, digitando `pwd`. Se o final do endereço for `/aprove-me` ou `/aprove-me/**`, tudo certo.
6. Após confirmar que está no local certo, digite no terminal `docker-compose up --build`. Aguarde o procedimento acabar, se tudo estiver certo, aparecerá no terminal algo tipo: `aprove-me-app-1  | [Nest] 29  - 05/25/2024, 3:25:36 AM     LOG [NestApplication] Nest application successfully started +31ms`.
7. O servidor e o banco de dados estará rodando no container `aprove-me-app-1`. Você pode ter acesso ao terminal interativo do container, digitando ` docker exec -it aprove-me-app-1 /bin/sh`.

[🔼](#sumário)

### Execução
Tanto na execução local quanto na execução via container docker, vocẽ pode ver o resultado no navegador. Ao digitar a URL `http://localhost:3000/` você verá uma mensagem de boas vindas.

[🔼](#sumário)

### Documentação da API

A documentação da API está disponível através do Swagger UI.
Você pode acessá-la e testar as rotas em [http://localhost:3000/api](http://localhost:3000/api).

Opitei por usar o Swagger, pois é a melhor escolha no que disrespeito a documentação de API's. Além de ver todas os endpoints existentes e quais opções de entrada eles recebem, você pode testar cada um deles de forma prática.

[🔼](#sumário)

## Endpoints Disponíveis

### Recebíveis

- `GET /integrations/payable`: Retorna todos os recebíveis.
- `GET /integrations/payable/:id`: Retorna um recebível específico pelo ID.
- `POST /integrations/payable`: Cria um novo recebível.
- `PUT /integrations/payable/:id`: Atualiza um recebível existente pelo ID.
- `DELETE /integrations/payable/:id`: Exclui um recebível pelo ID.

[🔼](#sumário)

### Cedentes

- `GET /integrations/assignor`: Retorna todos os cedentes.
- `GET /integrations/assignor/:id`: Retorna um cedente específico pelo ID.
- `POST /integrations/assignor`: Cria um novo cedente.
- `PUT /integrations/assignor/:id`: Atualiza um cedente existente pelo ID.
- `DELETE /integrations/assignor/:id`: Exclui um cedente pelo ID.

[🔼](#sumário)

### Usuários

- `GET /integrations/user`: Retorna todos os usuários.
- `GET /integrations/user/:id`: Retorna um usuário específico pelo ID.
- `GET /integrations/user/login/search`: Retorna um usuário específico pelo login, passando o email como string via `@Query`. Ex: `/integrations/user/login/search?login=test@test.com`
- `POST /integrations/user`: Cria um novo usuário.
- `PUT /integrations/user/:id`: Atualiza um usuário existente pelo ID.
- `DELETE /integrations/user/:id`: Exclui um usuário pelo ID.

[🔼](#sumário)

## Autenticação

A autenticação é necessária para acessar os endpoints de cedentes, recebíveis e usuários.
A API utiliza tokens JWT para autenticação, que devem ser incluídos no cabeçalho da solicitação.



## Tecnologias Utilizadas

- NestJS
- ORM Prisma
- SQLite
- JWT (JSON Web Tokens)
- bcrypt
- Docker
- Swagger
## Linguagens Utilizadas
- TypeScript

[🔼](#sumário)

## Testes

Os testes estão localizados no diretório `/src/repositories`, acompanhando seus respectivos alvos de testes.

#### Como testar?

Estando no diretório `backend`, execulte no terminal `npm run test:unit`. Isso era rodar todos os testes existente no projeto. 

Para testar a cobertatura, execulte no terminal `npm run test:cover`.

Para rodar apenas um arquivo de test, basta acrescentar no final o nome do arquivo de teste, exemplo `npm run test:unit test.unit.main.spec.ts`

OBS: A cada teste ou coverage execultado, o banco de dados será resetado.

[🔼](#sumário)

</details>

<!-- 

















 -->

# Frontend

<details>
<summary> Documentação Frontend </summary>

## Endpoint: `/api/users`

Este endpoint é responsável por operações CRUD (Create, Read, Update, Delete) relacionadas aos usuários do sistema.

### Listar Usuários

Retorna uma lista de todos os usuários cadastrados no sistema.

- **Método**: GET
- **URL**: `/api/users`
- **Requisição**: Não requer nenhum parâmetro.
- **Necessário token**: SIM
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Lista de objetos JSON representando os usuários. Exemplo:
    ```json
    [
      {
        "id": 1,
        "login": "example_user",
        "password": "user@example.com"
      },
      {
        "id": 2,
        "login": "another_user",
        "password": "another@example.com"
      }
    ]
    ```
- **Resposta de Erro**:  
  - **Código**: 500 Internal Server Error
  - **Corpo**: Detalhes do erro em JSON.

### Criar Usuário

Cria um novo usuário no sistema.

- **Método**: POST
- **URL**: `/api/users`
- **Requisição**: Deve incluir os seguintes campos no corpo da requisição:
  - `login` (string): Nome de usuário do novo usuário.
  - `password` (string): Senha do novo usuário.
- **Resposta de Sucesso**:
  - **Código**: 201 Created
  - **Corpo**: Objeto JSON representando o novo usuário criado, senha não inclusa. Exemplo:
    ```json
    {
      "id": 3,
      "login": "new_user",
    }
    ```
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Corpo**: Detalhes do erro em JSON.

  ### Listar Usuários por Login

Retorna as informações de um usuário com base no nome de usuário (login).

- **Método**: GET
- **URL**: `/api/users/{username}`
- **Parâmetros de URL**: `username` (string) - Nome de usuário do usuário a ser buscado.
- **Requisição**: Requer autenticação por token.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Objeto JSON representando o usuário encontrado. Exemplo:
    ```json
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "example_user",
      "email": "user@example.com"
    }
    ```
- **Resposta de Erro**:  
  - **Código**: 404 Not Found
  - **Corpo**: Mensagem de erro em JSON.

### Listar Usuário por ID

Retorna as informações de um usuário com base em seu ID.

- **Método**: GET
- **URL**: `/api/users/id/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do usuário a ser buscado.
- **Requisição**: Requer autenticação por token.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Objeto JSON representando o usuário encontrado. Exemplo:
    ```json
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "example_user",
      "email": "user@example.com"
    }
    ```
- **Resposta de Erro**:  
  - **Código**: 404 Not Found
  - **Corpo**: Mensagem de erro em JSON.

### Atualizar Usuário

Atualiza as informações de um usuário existente no sistema.

- **Método**: PUT
- **URL**: `/api/users/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do usuário a ser atualizado.
- **Requisição**: Requer autenticação por token e o usuário só pode atualizar suas próprias informações.
- **Corpo da Requisição**: Objeto JSON contendo os campos a serem atualizados. Exemplo:
  ```json
  {
    "email": "new_email@example.com"
  }

- **Resposta de Sucesso**:
    Código: 200 OK
    Corpo: Objeto JSON representando o usuário atualizado.
- **Resposta de Erro**:
    Código: 400 Bad Request
    Corpo: Mensagem de erro em JSON.

### Deletar Usuário

Remove um usuário do sistema.

- **Método**: DELETE
- **URL**: `/api/users/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do usuário a ser removido.
- **Requisição**: Requer autenticação por token e o usuário só pode excluir a si próprio.
- **Resposta de Sucesso**:
  - **Código**: 204 No Content
  - **Corpo**: Não há corpo de resposta.
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Corpo**: Mensagem de erro em JSON.

## Endpoint: `/api/receivables`

Este endpoint é responsável por operações CRUD relacionadas aos recebíveis do sistema.

### Listar Recebíveis

Retorna uma lista de todos os recebíveis cadastrados no sistema.

- **Método**: GET
- **URL**: `/api/receivables`
- **Requisição**: Não requer nenhum parâmetro.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Lista de objetos JSON representando os recebíveis. Exemplo:
    ```json
    [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "value": 1000.0,
        "emissionDate": "2024-05-25",
        "assignor": "456e789a-12bc-34d5-6789-012345678900"
      },
      {
        "id": "234e567b-cdef-12a3-b456-789012345678",
        "value": 1500.0,
        "emissionDate": "2024-05-26",
        "assignor": "567f890c-defa-23b4-c567-890123456789"
      }
    ]
    ```
- **Resposta de Erro**:  
  - **Código**: 500 Internal Server Error
  - **Corpo**: Detalhes do erro em JSON.

### Criar Recebível

Cria um novo recebível no sistema.

- **Método**: POST
- **URL**: `/api/receivables`
- **Requisição**: Deve incluir os seguintes campos no corpo da requisição:
  - `value` (float): Valor do recebível.
  - `emissionDate` (date): Data de emissão do recebível (formato YYYY-MM-DD).
  - `assignor` (uuid): ID do cedente associado ao recebível.
- **Resposta de Sucesso**:
  - **Código**: 201 Created
  - **Corpo**: Objeto JSON representando o novo recebível criado. Exemplo:
    ```json
    {
      "id": "345e678d-fabc-34e5-d678-901234567890",
      "value": 2000.0,
      "emissionDate": "2024-05-27",
      "assignor": "678g901d-efbc-45f6-g789-012345678901"
    }
    ```
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Corpo**: Detalhes do erro em JSON.

### Atualizar Recebível

Atualiza um recebível existente no sistema.

- **Método**: PUT
- **URL**: `/api/receivables/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do recebível a ser atualizado.
- **Requisição**: Deve incluir os campos a serem atualizados no corpo da requisição.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Objeto JSON representando o recebível atualizado.
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Corpo**: Detalhes do erro em JSON.

### Deletar Recebível

Remove um recebível do sistema.

- **Método**: DELETE
- **URL**: `/api/receivables/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do recebível a ser removido.
- **Resposta de Sucesso**:
  - **Código**: 204 No Content
  - **Corpo**: Não há corpo de resposta.
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Corpo**: Detalhes do erro em JSON.

## Endpoint: `/api/assignors`

Este endpoint é responsável por operações CRUD relacionadas aos cedentes do sistema.

### Listar Cedentes

Retorna uma lista de todos os cedentes cadastrados no sistema.

- **Método**: GET
- **URL**: `/api/assignors`
- **Requisição**: Requer autenticação por token.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Lista de objetos JSON representando os cedentes. Exemplo:
    ```json
    [
      {
        "id": "456e789a-12bc-34d5-6789-012345678900",
        "document": "123456789012345678901234567890",
        "email": "cedent1@example.com",
        "phone": "1234567890",
        "name": "Cedente 1"
      },
      {
        "id": "567f890c-defa-23b4-c567-890123456789",
        "document": "098765432109876543210987654321",
        "email": "cedent2@example.com",
        "phone": "9876543210",
        "name": "Cedente 2"
      }
    ]
    ```
- **Resposta de Erro**:  
  - **Código**: 500 Internal Server Error
  - **Corpo**: Detalhes do erro em JSON.

### Buscar Cedente por ID

Retorna as informações de um cedente com base em seu ID.

- **Método**: GET
- **URL**: `/api/assignors/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do cedente a ser buscado.
- **Requisição**: Requer autenticação por token.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Objeto JSON representando o cedente encontrado. Exemplo:
    ```json
    {
      "id": "456e789a-12bc-34d5-6789-012345678900",
      "document": "123456789012345678901234567890",
      "email": "cedent1@example.com",
      "phone": "1234567890",
      "name": "Cedente 1"
    }
    ```
- **Resposta de Erro**:  
  - **Código**: 404 Not Found
  - **Corpo**: Mensagem de erro em JSON.

### Criar Cedente

Cria um novo cedente no sistema.

- **Método**: POST
- **URL**: `/api/assignors`
- **Requisição**: Deve incluir os seguintes campos no corpo da requisição:
  - `document` (string): Documento do cedente.
  - `email` (string): Endereço de e-mail do cedente.
  - `phone` (string): Número de telefone do cedente.
  - `name` (string): Nome do cedente.
- **Resposta de Sucesso**:
  - **Código**: 201 Created
  - **Corpo**: Objeto JSON representando o novo cedente criado. Exemplo:
    ```json
    {
      "id": "678g901d-efbc-45f6-g789-012345678901",
      "document": "987654321098765432109876543210",
      "email": "cedent3@example.com",
      "phone": "5432109876",
      "name": "Cedente 3"
    }
    ```
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Corpo**: Detalhes do erro em JSON.

### Atualizar Cedente

Atualiza as informações de um cedente existente no sistema com base em seu ID.

- **Método**: PUT
- **URL**: `/api/assignors/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do cedente a ser atualizado.
- **Requisição**: Requer autenticação por token. Deve incluir os campos a serem atualizados no corpo da requisição.
  - `document` (string, opcional): Novo documento do cedente.
  - `email` (string, opcional): Novo endereço de e-mail do cedente.
  - `phone` (string, opcional): Novo número de telefone do cedente.
  - `name` (string, opcional): Novo nome do cedente.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Corpo**: Objeto JSON representando o cedente atualizado. Exemplo:
    ```json
    {
      "id": "456e789a-12bc-34d5-6789-012345678900",
      "document": "123456789012345678901234567890",
      "email": "cedent1_updated@example.com",
      "phone": "1234567890",
      "name": "Cedente 1 Atualizado"
    }
    ```
- **Resposta de Erro**:  
  - **Código**: 400 Bad Request
  - **Corpo**: Detalhes do erro em JSON.

### Excluir Cedente

Remove um cedente do sistema com base em seu ID.

- **Método**: DELETE
- **URL**: `/api/assignors/{id}`
- **Parâmetros de URL**: `id` (uuid) - ID do cedente a ser excluído.
- **Requisição**: Requer autenticação por token.
- **Resposta de Sucesso**:
  - **Código**: 204 No Content
  - **Corpo**: Não há corpo na resposta.
- **Resposta de Erro**:
  - **Código**: 404 Not Found
  - **Corpo**: Mensagem de erro em JSON.

</details>