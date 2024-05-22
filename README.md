<p align="center">
  <img src="./frontend/public/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>

[![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-yellow?logo=vitest&logoColor=white)](https://pnpm.io/pt/)
[![react](https://img.shields.io/badge/ReactJs-blue?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-646CFF?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-eb295a?logo=NestJS&logoColor=white)](https://docs.nestjs.com/)
[![prisma](https://img.shields.io/badge/Prisma-646cff?logo=prisma&logoColor=white)](https://www.prisma.io/docs)
[![docker](https://img.shields.io/badge/Docker-646cff?logo=docker&logoColor=white)](https://docs.docker.com/)
[![jest](https://img.shields.io/badge/Jest-red?logo=jest&logoColor=white)](https://jestjs.io/pt-BR/docs/getting-started)

## Sumário

- [Sumário](#sumário)
- [Sobre](#sobre)
- [Pré-requisitos](#pré-requisitos)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Endpoints](#endpoints)

## Sobre

Este projeto é um desafio técnico da empresa Bankme. Neste teste técnico foi desenvolvido uma solução automatizada para o gerenciamento de recebíveis, visando otimizar o processo e reduzir a carga manual sobre o time de operações. A nova funcionalidade permite o cadastramento automático dos recebíveis.

## Pré-requisitos

Para poder rodar este projeto é necessário as seguintes dependências:

- Docker
- Node (versão 21.x)
- PNPM (versão 8.x)

## Como rodar o projeto

1. Clone do repositório

```bash
git clone https://github.com/hxsggsz/aprove-me.git
```

2. Acesse a pasta backend e inicie o projeto com Docker

```bash
cd backend
docker compose up
```

Assim que o comando terminar teremos o backend no ar localmente!

3. Acesse a paste frontend e Instale as dependências e execute o frontend

```bash
cd frontend
pnpm install
pnpm dev
```

4. Acessar a aplicação no navegador:

   Para visualizar a aplicação frontend acesse http://localhost:5173.

   Para ter acesso ao backend acesse http://localhost:3000 no seu aplicativo de testes de requisições favorito. Para ter acesso as rotas da aplicação é necessário um Bearer token disponivel na [rota de login](#endpoints)

## Arquitetura da aplicação

### Backend

O backend segue uma arquitetura baseada em arquitetura limpa para uma melhor separação de responsabilidades e desacoplamento de código.

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="imagem explicando arquitetura limpa" />

### entidades

É o núcleo da arquitetura, é a camada mais agnóstica de tudo. As suas entidades que são os objetos de negócio da sua aplicação, esses objetos são a forma de representar as tabelas do seu banco de uma forma agnóstica dele.

### use cases

Os `use cases` são a `regra de negócio` do projeto, toda a lógica do negócio precisa ser mantida neles. Por isso ele precisa ser o mais desacoplado o possível para ser o mais independente o possível e assim, facilitar uma manuteção no futuro.

### adapters/repositories

Mais acima dos use cases ficam os `adaptadores`, como o nome sugere, ele adapta de forma agnóstica qualquer repositório para os seus use-cases atravez da injeção de dependências. Repositórios também são conhecidos como contratos pois eles estabelecem uma regra para quem implementá-lo de que precisam ter os métodos criados dentro do repositório e garantem ao seu use case que ele irá ter acesso aos metodos listados dentro dele dessa forma você consegue lidar com um banco de dados por exemplo no seu use case sem precisar acoplá-lo diretamente ao seu use case.

### Frameworks e drivers

Essa é a camada mais externa o possível, é a camada onde fazemos a conexão com o nosso banco de dados e implementamos os repositórios ao banco de dados para fazer as operações necessárias, essa camada é a mais externa e é completamente desaclopada do nucleo da nossa arquitetura porque é uma camada que sujeito a muitas mudanças, como ela não está acoplada a nada isso facilita a troca porque só precisaremos mudar em um lugar e tudo continua funcionando perfeitamente.

## frontend

<a href="https://excalidraw.com/#json=k1wDTiFfCpbNXrAhM6GAf,UFX5BHi44BSm7glMQXwDTQ" target="_blank">
<img src="https://i.imgur.com/eCQmUGp.png" alt="fluxograma da arquitetura do frontend" />
</a>

essa arquitetura visa o desacoplamento de chamadas http diretamente em um componente usando um gerenciador de estados global como `entrypoint` principal para as chamadas http.

### services

essa camada fica responsável pela comunicaão com a nossa api fazendo as requisiões usando fetch ou axios, elas ficam separadas por entidades da regra de negócio

```
// organização dos arquivos:

├── ...
├── services/
│   ├── assignorService.ts
│   ├── payableSerivce.ts
│   └── userService.ts
└── ...
```

```ts
export class AssignorService {
    static async getAll() {
    const data = fetch("...")
    ...
    }
}
```

### zustand

Use o gerenciador de estados da sua preferência, neste projeto foi utilizado o zustand.

O zustand tem duas funções muito importantes:

- `middleware`: é a função intermediária que irá chamar os services e salvar o que for necessário na `store`. Esses middlewares também podem salvar informações em algum lugar, nesse projeto é salvo algumas coisas no localStorage mas pode ser salvo nos cookies igualmente.

```ts
export const useAuthStore = create<AuthStoreTypes>()((set) => ({
  login: async (loginData) => {
    // ...
  },
}));
```

- `store`: são as variáveis globais que ficaram armazenadas o retorno das chamadas ao services.

```ts
export const useAuthStore = create<AuthStoreTypes>()((set) => ({
  userToken: "",
  login: async (loginData) => {
    // faz o login e salva em `userToken` o token jwt retornado pelo service de login
  },
}));
```

dessa forma um componente em vez de ter um fetch acoplado dentro dele, ele ira ter uma store zustand com variaveis e funções para manipular essas variáveis.

## Endpoints

Toda a aplicação backend exceto as rotas de usuário (login/signup) está protegida por AuthGuards por meio de JWT com validade de 1 minuto. Para mudar basta alterar a variável de ambiente .env.docker

### usuário

- criação de um usuário

`POST /integrations/user`

```json
// body da requisição
{
  "login": "approve",
  "password": "approve"
}
```

- realizar o login

`POST /integrations/user/login`

```json
// body da requisição
{
  "login": "approve",
  "password": "approve"
}
```

### Cedente

`POST /integrations/assignor`

```json
// body da requisição
{
  "document": "128738921738",
  "email": "vt.hugo.2021@gmail.com",
  "phone": "552198472983",
  "name": "victor hugo"
}
```

`GET /integrations/assignor/:assignorId`

```json
// resposta da requisição
{
  {
	"_id": "115feb90-bb05-4bc4-93b9-362d999bf4ea",
	"props": {
		"id": "115feb90-bb05-4bc4-93b9-362d999bf4ea",
		"document": "128738921738",
        "email": "vt.hugo.2021@gmail.com",
        "phone": "552198472983",
        "name": "victor hugo"
        "createdAt": "2024-05-19T16:50:29.919Z",
		"updatedAt": "2024-05-22T00:47:52.189Z",
		"deletedAt": null
	}
}}
```

`PUT /integrations/assignor/:AssignorId`

```json
// body da requisição
{
  "document": "12389217389",
  "email": "hx@gmail.com",
  "phone": "5521938712",
  "name": "hxsggsz"
}
```

`DELETE /integrations/assignor/:assignorId`

### Pagavéis

`POST /integrations/payable`

```json
// body da requisção
{
  "assignorId": "f17ad472-a5cb-486a-aacc-dbf7e97fbd23",
  "emissionDate": "2024-05-19T17:45:42.763Z",
  "value": 312
}
```

`GET /integrations/payable/:payableId`

```json
// resposta da requisição
{
{
	"_id": "8d11f64d-8741-4974-aae6-71f0d9f4996c",
	"props": {
		"assignorId": "f17ad472-a5cb-486a-aacc-dbf7e97fbd23",
		"emissionDate": "2024-05-19T17:45:42.763Z",
		"value": 312,
		"createdAt": "2024-05-22T14:38:39.875Z",
		"updatedAt": "2024-05-22T14:38:39.875Z"
	}
}
}
```

`PUT /integrations/payable/:payableId`

```json
// body da requisição
{
  "assignorId": "f17ad472-a5cb-486a-aacc-dbf7e97fbd23",
  "emissionDate": "2024-05-19T17:45:42.763Z",
  "value": 52.21
}
```

`DELETE /integrations/payable/:payableId`
