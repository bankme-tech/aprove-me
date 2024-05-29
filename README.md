<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>

## Sumário

- [Sobre](#sobre)
- [Observações](#observações)
  - [Envio de Email](#envio-de-email)
- [Pré-requisitos](#pré-requisitos)
- [Executando o projeto](#executando-o-projeto)
- [Testes](#testes)
  - [Backend](#backend)
    - [Testes manuais](#testes-manuais)
    - [Testes automatizados](#testes-automatizados)
      - [Executando testes automatizados](#executando-testes-automatizados)

## Sobre

Este projeto foi desenvolvido para o [desafio técnico da Bankme](docs/description.md) e consiste em desenvolver uma aplicação para gerenciar recebíveis e cedentes

## Observações

### Envio de Email

Foi utilizado o [Ethereal Email](https://ethereal.email). Para visualizar os emails enviados, acesse o [link](https://ethereal.email) e faça o login com as credenciais presentes no arquivo `.env` do backend.

> É possível que o serviço de email expire, caso isso ocorra, basta criar uma nova conta no [Ethereal Email](https://ethereal.email) e alterar as variáveis de ambiente no arquivo `.env` do backend.

Caso deseje utilizar um serviço de email real, basta alterar as variáveis de ambiente no arquivo `.env` do backend.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados na sua máquina:

- Docker
- docker-compose

## Executando o projeto

1. Acessar pasta do projeto

    ```bash
    cd aprove-me
    ```

2. Configurar variáveis de ambiente
    - Crie um arquivo `.env` (para o backend) e `.env.local` (para o frontend) e preencha as variáveis de acordo com o arquivo `.env.example`
    - Para utilizar os valores *default*, presentes no `.env.example`, execute o comando abaixo:

    ```bash
    cp ./backend/.env.example ./backend/.env && cp ./frontend/.env.example ./frontend/.env.local
    ```

3. Executar o comando para subir os containers

    ```bash
    docker-compose up --build
    ```

4. Acessar a aplicação utilizando

    > Para o **backend**, acesse [`http://localhost:8080`](http://localhost:8080) <br>
    > Para o **backend**, acesse [`http://localhost:3000`](http://localhost:3000) <br>

## Testes

### Backend

#### Testes manuais

> Para testes manuais da API, é possível utilizar os arquivos na pasta `./backend/api`. Nessa pasta, estão presentes todas as requisições para a API. É possível executar as requisições utilizando a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VS Code.

#### Testes automatizados

Foram criados testes unitários e testes de integração.

- Arquivos com final `*.spec.ts` são testes unitários.
- Arquivos com final `*.test.ts` são testes de integração.

##### Executando testes automatizados

1. Acessar pasta do projeto backend

    ```bash
    cd aprove-me/backend
    ```

2. Instalar as dependências

    ```bash
    pnpm install
    # ou
    npm install
    ```

3. Executar migrations

    > Necessário para os testes de integração

    ```bash
    pnpm migrate:dev
    # ou
    npm run migrate:dev
    ```

4. Para executar os testes, utilize o comando:

    ```bash
    pnpm test
    # ou
    npm run test
    ```
  
- Para verificar a cobertura de testes, utilize o comando:

    ```bash
    pnpm test:cov
    # ou
    npm run test:cov
    ```
