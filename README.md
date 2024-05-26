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

# Frontend

<details>
<summary> Documentação Frontend </summary>

</details>