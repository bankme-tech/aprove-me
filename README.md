[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/YPZgRfNrTESCRbaE1hRY6Q/S4nZ66nwubjtx3SVXTfT65/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/YPZgRfNrTESCRbaE1hRY6Q/S4nZ66nwubjtx3SVXTfT65/tree/main)

[![CircleCI](https://dl.circleci.com/insights-snapshot/circleci/YPZgRfNrTESCRbaE1hRY6Q/S4nZ66nwubjtx3SVXTfT65/main/generate-config/badge.svg?window=30d)](https://app.circleci.com/insights/circleci/YPZgRfNrTESCRbaE1hRY6Q/S4nZ66nwubjtx3SVXTfT65/workflows/generate-config/overview?branch=main&reporting-window=last-30-days&insights-snapshot=true)

<div id="top"></div>

<br />
<div align="center">
  <h1 align="center">bankme-api</h1>

  <h3 align="center">
    API Repository Github
    <br />
  </h3>

[![NodeJS][NodeJS]][NodeJS]
[![NestJS][NestJS]][NestJS]
[![Postgres][Postgres]][Postgres]
[![Prisma][Prisma]][Prisma]
</div>

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Ambiente de produção](#ambiente-de-produção)
- [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)
  - [Configuração](#configuração)
  - [Docker](#docker)
- [Testando API](#testando-a-api)



<!-- ABOUT -->
## Sobre o Projeto

É uma API construída com o framework NestJS.



<p align="right">(<a href="#top">back to top</a>)</p>

## Ambiente de produção

Endereço do ambiente de produção da API: [API-bankme](https://bankme-api.onrender.com).


<p align="right">(<a href="#top">back to top</a>)</p>



## Ambiente de desenvolvimento

### Plugins e dependências

- [Node](https://nodejs.org/)
- [NestJs](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

Para facilitar a instalacao de dependencias recomendo fortemente a ferramenta: [ASDF](https://asdf-vm.com).


<p align="right">(<a href="#top">back to top</a>)</p>


### Configuração

1.  Se você  está usando uma os Debian/Ubuntu based básica talvez precise instalar a biblioteca `base-devel` para instalar as dependências básicas para instalar o ruby e `libpq` e\ou `libpq-dev` que a gem [pg](https://github.com/ged/ruby-pg/) precisa como pré-requisito. Para Debian ou Ubuntu:
```sh
asdf plugin-add nodejs
```

```sh
asdf install nodejs latest
asdf global nodejs
```
3. Uma vez instalada as dependencias, voce pode executar o servidor.

4. Rode o comando `npm run start:dev` para iniciar o serviço


<p align="right">(<a href="#top">back to top</a>)</p>

### Docker

1.  Use os comendos para subir o server local com docker:
```sh
docker-compose up -d 
```

```sh
docker-compose down -v
```
2. Para facilitar o desenvolvimento, é recomendável usar o vscode com a extensão do docker.

3. Assim que levantar os serviços com docker-compose, irá parecer a lista dos containers no vscode.
4. Clique com o botão direito em 'Atach bash'
5. Pronto!


<p align="right">(<a href="#top">back to top</a>)</p>

## Testando a API

### POST: /integrations/auth

#### Autenticando

##### Parametros


> | name   |  type      | data type      | 
> |--------|------------|----------------|
> | `name` |  required  | string         | 
> | `password` |  required  | string     |


### POST: /integrations/assignor

#### Criando Assignor


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

##### Parametros


> | name   |  type      | data type      | 
> |--------|------------|----------------|
> | `document` |  required  | string        | 
> | `email` |  required  | string     | 
> | `phone` |  required  | string     | 
> | `name` |  required  | string     | 


### GET: /integrations/assignor/:id

#### Visualizar Assignor


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

### DELETE: /integrations/assignor/:id

#### Deletar Assignor


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

### PUT: /integrations/assignor/:id

#### Atualizar Assignor


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

##### Parametros


> | name   |  type      | data type      | 
> |--------|------------|----------------|
> | `document` |  optional  | string        | 
> | `email` |  optional  | string     | 
> | `phone` |  optional  | string     | 
> | `name` |  optional  | string     | 


### POST: /integrations/payable

#### Criar Payable

##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

##### Parametros


> | name   |  type      | data type      | 
> |--------|------------|----------------|
> | `value` |  required  | float  |
> | `emissionDate` |  required  | string  |
> | `assignor` |  required  | string  |



### PUT: /integrations/payable/:id

#### Atualizar Payable


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

##### Parametros


> | name   |  type      | data type      | 
> |--------|------------|----------------|
> | `value` |  optional  | float  |
> | `emissionDate` |  optional  | string  |
> | `assignor` |  optional  | string  |


### DELETE: /integrations/payable/:id

#### Deletar Payable


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

### GET: /integrations/payable/:id

#### Viazualizar Payable


##### Header
Use o token gerado no retorno da rota de autenticação:
```sh
 Authorization: Bearer <token-aqui>
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- How to make badge shields https://shields.io/ -->
[NodeJS]:https://img.shields.io/badge/nodejs-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NestJS]:https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[Postgres]:https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Prisma]:https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=Prisma&logoColor=white
