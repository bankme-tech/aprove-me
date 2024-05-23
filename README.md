# Aprove-me

Este projeto é um teste de seleção para novos desenvolvedores na Bankme! O repositório do teste pode ser encontrado [aqui](https://github.com/bankme-tech/aprove-me).

Este arquivo README fornece instruções sobre como configurar e testar o projeto Aprove-me em seu ambiente local.

## Pré-requisitos(para o backend)

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração - backend

1. Clone o repositório para a sua máquina local usando `git clone`.

```bash
git clone git@github.com:emersondont/aprove-me.git
```

2.Navegue até a pasta api no diretório do projeto.
```bash
cd aprove-me/api
```

3.Crie um arquivo .env no diretório do projeto. Você pode usar o arquivo .env.example como base.
```bash
cp .env.example .env
```

4.Abra o arquivo .env e atualize as variáveis de ambiente conforme necessário.

### Executando o Projeto
1. Construa a imagem Docker e inicie os serviços usando docker-compose.
```bash
docker-compose up --build
```

Agora, seu projeto deve estar rodando no localhost na porta especificada no arquivo .env

### Parando a execução do container
1. Rode o docker compose down para parar a execução do container.
```bash
docker compose down
```

## Pré-requisitos(para o frontend)

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/getting-started/install) (dependendo do que você está usando para gerenciar pacotes)


## Configuração - frontend

1. Navegue até a pasta do frontend no diretório do projeto.
```bash
cd aprove-me/spa
```

2.Instale as dependências do projeto.
```bash
npm install
# ou
yarn install
```

3.Crie um arquivo de configuração no diretório do projeto. Você pode usar o arquivo .env.example como base.
```bash
cp .env.example .env.local
```

4.Abra o arquivo .env.local e atualize as variáveis de ambiente conforme necessário.

### Executando o Projeto
1. Inicie o servidor de desenvolvimento.
```bash
npm start
# ou
yarn start
```

Agora, seu projeto deve estar rodando no localhost na porta especificada no arquivo de configuração do projeto.