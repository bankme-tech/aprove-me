<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Receivable Hub
</h1>

## Visão Geral

Este projeto consiste em duas partes: um backend e um frontend, que se integram para resolver o problema de gerenciamento de recebíveis para um cliente da Bankme. Os recebíveis são representações digitais de documentos que simulam dívidas a serem recebidas. A finalidade deste projeto é automatizar o cadastro e o gerenciamento desses recebíveis, tornando o processo mais eficiente para o time de operações da Bankme.

## Tecnologias Utilizadas

- **Backend**: [Node.js](https://nodejs.org/), [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [SQLite](https://www.sqlite.org/docs.html)
- **Frontend**: [React.js](https://reactjs.org/)
- **Banco de Dados**: [Redis](https://redis.io/)
- **Infra**: [Docker](https://docs.docker.com/)

## Como Rodar o Projeto

Para executar este projeto, é necessário ter o Docker e o Docker Compose instalados no seu sistema. Certifique-se de também ter o Node.js instalado para executar os comandos npm.

1. Clone este repositório para o seu sistema:

```shell
git clone https://github.com/elvesbd/aprove-me.git
```

2. Navegue até a pasta do projeto clonado:

```shell
cd aprove-me
```

3. Execute o Docker Compose para iniciar os serviços:

```shell
docker-compose up
```

Isso iniciará os containers para o backend, frontend, Redis e SQLite, conforme configurado no arquivo docker-compose.yml. O backend estará disponível em http://localhost:3001 e o frontend estará disponível em http://localhost:3000.

4. Para parar os serviços, use o comando:

```shell
docker-compose down
```

Isso encerrará todos os containers associados ao projeto.

## Changelog

- [Changelog do Backend](./backend/CHANGELOG.md)
- [Changelog do Frontend](./frontend/CHANGELOG.md)

## Contato

Para mais informações ou sugestões, entre em contato com a equipe de desenvolvimento em [elvesbd41@gmail.com](mailto:elvesbd41@gmail.com).
