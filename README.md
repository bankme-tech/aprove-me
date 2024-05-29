# bankme-tech/aprove-me

## Pré-Requisitos

- Node.js v20.13.1
- NPM v10.5.2

## Instalação

```
git clone git@github.com:inolopesm/aprove-me.git
cd aprove-me
npm install
npx prisma generate
```

## Inicialização

Modo de desenvolvimento

```
npm run start:dev
```

Modo de produção

```
npm run build
npm run start:prod
```

## Docker

Este projeto roda também via docker, podendo rodar os comandos `docker build -t aprove-me .` + `docker run -e SECRET=change-me -e API_KEY=change-me -p 3000:3000 aprove-me` ou `docker compose up`
