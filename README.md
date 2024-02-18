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
Primeiro, vamos configurar o Backend. Digite os comandos abaixo para entrar no projeto Backend, instalar as dependências e configurar o Banco de dados
```
cd backend
```
```
npm i
```
```
npx prisma migrate dev --name init
```

Em seguida, vamos configurar o Frontend. Na pasta inicial do projeto, digite os comandos abaixo para entrar no projeto Frontend e instalar as dependências
```
cd frontend
```
```
npm i
```

## Rodando o projeto
Primeiro, vamos iniciar nosso servidor no Backend. Abra o Terminal e digite os comandos abaixo
```
cd backend
```
```
npm run start:dev
```

Agora, vamos iniciar nosso Frontend. Abra <b>outro</b> Terminal e digite os comandos abaixo
```
cd frontend
```
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
