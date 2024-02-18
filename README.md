<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Quero ser Bankmer | Kevin Bezerra
</h1>



## Vamos começar!
#### Clone o projeto:
```
git clone git@github.com:kevinbzrra/bankme-challenge.git
```

#### Configurações iniciais:
Primeiro, vamos configurar o Backend. Abra o terminal, vá até a pasta ```bankme-challenge/backend/``` e digite os comandos abaixo para instalar as dependências e configurar o Banco de dados
```
npm i
```
```
npx prisma migrate dev --name init
```

Em seguida, vamos configurar o Frontend. Vá até a pasta ```bankme-challenge/frontend/``` e digite o comando abaixo para instalar as dependências
```
npm i
```

## Rodando o projeto
Primeiro, vamos iniciar nosso servidor no Backend. Abra o Terminal e, na pasta ```bankme-challenge/backend/```,  digite o comando abaixo:
```
npm run start:dev
```

Agora, vamos iniciar nosso Frontend. Abra <b>outro</b> Terminal e, na pasta ```bankme-challenge/frontend/```, digite o comando abaixo:
```
npm run dev
```

## Portas
Frontend ```http://localhost:3000```

Backend ```http://localhost:3001```

## Stack utilizada

- [NPM](https://www.npmjs.com/)

Frontend:

- [NextJS](https://nextjs.org/)
- [PrimeReact](https://primereact.org/)

Backend:

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
