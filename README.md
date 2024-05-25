<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>

## Sumário

- [Sobre](#sobre)
- [Pré-requisitos](#pré-requisitos)
- [Executando o projeto](#executando-o-projeto)
- [Testes](#testes)
  - [Backend](#backend)
    - [Testes manuais](#testes-manuais)
    - [Testes automatizados](#testes-automatizados)
      - [Executando testes automatizados](#executando-testes-automatizados)

## Sobre

Este projeto foi desenvolvido para o [desafio técnico da Bankme](docs/description.md) e consiste em desenvolver uma aplicação para gerenciar recebíveis e cedentes

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
    - Crie um arquivo `.env` e preencha as variáveis de acordo com o arquivo `.env.example`
    - Para utilizar os valores *default*, presentes no `.env.example`, execute o comando abaixo:

    ```bash
    cp ./backend/.env.example ./backend/.env
    ```

3. Executar o comando para subir os containers

    ```bash
    docker-compose up --build
    ```

4. Acessar a aplicação utilizando
    > A porta padrão é `8080` para o backend <br>
    > Para o **backend**, acesse [`http://localhost:8080`](http://localhost:8080) <br>

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
    npm install
    ```

3. Executar migrations

    > Necessário para os testes de integração

    ```bash
    npm run migrate:dev
    ```

4. Para executar os testes, utilize o comando:

    ```bash
    npm run test
    ```
  
- Para verificar a cobertura de testes, utilize o comando:

    ```bash
    npm run test:cov
    ```
