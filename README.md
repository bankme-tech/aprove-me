


    
# Aprove-me 


O projeto é um desafio técnico da BankMe que pedr a criação de uma RESTful API e uma aplicação NextJS (frontend). 




## Funcionalidades

- Cadastro de Cedentes e Pagantes
- Endpoints autenticados com Tokens JWT que expiram após 60s, relacionados ao Id do User que fez a requisição
- Interface de Cadastro de Pagáveis, Cedentes e Visualizar as informações
- Sistema de Cadastro de Usuários para o Sistema


## Instruções para Inicializar o Projeto

## Pré-requisitos:

- Prisma
- Instale o Docker 

## Instalação das Dependências:

Abra o arquivo .env.
Altere o parâmetro DATABASE_URL para refletir suas credenciais de banco de dados PostgreSQL:
```bash
DATABASE_URL="postgresql://aproveme:aproveme@api-db-1:5432/aproveme?schema=public"
```


Inicie os containers do Docker com o comando:
```bash
docker-compose up
```

Caso não tenha o ```yarn  ``` instalado ao rodar o comando acima o mesmo irá instalar via pacote ```npm . ```

## Funcionalidades da API


#### Cria um usuário 

```http
  POST /users

  ```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Nome`      | `string` | **Obrigatório**. O nome do usuário |
| `Email`      | `string` | **Obrigatório**. O email do usuário |
| `Senha`      | `string` | **Obrigatório**. A senha do usuário |

#### Faz o login de um usuário 

```http
  POST /integrations/auth

  ```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Email`      | `string` | **Obrigatório**. O email do usuário |
| `Senha`      | `string` | **Obrigatório**. A senha do usuário |


#### Cria um Recebível de um Cedente 

```http
  POST /Integrations/payable
```

| Parâmetro     | Tipo       | Descrição                               |
|--------------|---------------|-------------------------------------------|
| id           | `string (UUID)` | É a identificação de um recebível.        |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |
| value        | `float`         | **Obrigatório**. É o valor do recebível.                   |
| emissionDate | `date`          | **Obrigatório**. É a data de emissão do recebível.         |
| assignor     | `string (UUID) `| Representa a identificação de um cedente. |
| id       | `string (UUID)` | É a identificação de um cedente.      |
| document | `string(30)`    | **Obrigatório**. É o documento CPF ou CNPJ do cedente. |
| email    | `string(140)`   | **Obrigatório**. É o email do cedente.                 |
| phone    | `string(20)`    | **Obrigatório**. É o telefone do cedente.              |
| name     | `string(140)`   | **Obrigatório**. É a nome ou razão social do cedente.  |



#### Retorna um Recebível

```http
  GET /integrations/payable/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |

#### Retorna um Cedente

```http
  GET /integrations/assignor/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |

#### Deleta um Recebível

```http
  DELETE /integrations/payable/{id}

  ```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |

#### Deleta um Cedente

```http
  DELETE /integrations/assignor/{id}

  ```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |

#### Edita um Recebível

```http
  PATCH /integrations/payable/{id}

  ```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |

#### Edita um  Cedente

```http
  PATCH /integrations/assignor/{id}

  ```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| accessToken          | `string (JWT)` | **Obrigatório**. É o token bearer gerado ao logar.        |

