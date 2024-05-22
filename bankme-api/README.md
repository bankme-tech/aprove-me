<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Utilizando o docker

Para rodar a aplicação com o docker utilize este comando:
```bash
$ yarn compose:up
```
E pronto! sua aplicação estará rodando no seu localhost na porta 3000.

##

Para parar o container, basta rodar:
```bash
$ yarn compose:dowm
```

## Instalação sem o Docker
Para rodar a aplicação sem o Docker, siga o passo a passo:

Instale as dependências
```bash
$ yarn install
```
Faça a build do NestJS
```bash
$ yarn build
```
Gere migration
```bash
$ npx prisma migrate dev
```
Rode o cliente do prisma
```bash
$ npx prisma generate
```
Adicione dados ao banco de dados
```bash
$ yarn seed 
```


## Rodando o APP
Se você seguiu o passo a passo anterior, então você está pronto para rodar a aplicação! Basta executar o comando

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testes
Para rodar os testes unitários, execute este comando:

```bash
$ yarn run test

