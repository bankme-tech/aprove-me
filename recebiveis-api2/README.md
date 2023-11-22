<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Description

Esta API foi criada para atender aos requisitos do processo seletivo da bankme, com diferentes niveis de maturidade. 

```
[x] Nível 1 - Validação.
[ ] Nível 2 - Persistência
[ ] Nível 3 - Testes
[ ] Nível 4 - Autenticação
[ ] Nível 5 - Gerenciamento de permissões
[ ] Nível 6 - Infra e Doc
[ ] Nível 7 - Lotes
[ ] Nível 8 - Resiliência
[ ] Nível 9 - Cloud
[ ] Nível 10 - Infra as a Code
```
[Click aqui para mais detalhes](https://github.com/TiagoGIM/aprove-me#readme)

#### Nível 1 VALIDAÇÃO

Criaçao do recurso 
> **/payable**


Usando recurso da propria CLI
```bash
$ npx nest generate resource payable
```

Para  fazer a validaçao dos campos usaremos duas bibliotecas, uma para validaçao e outra para (de)serializar dados.


```bash
$  class- validator class-transformer
```

para desenvolvimento rápido e teste, foi usada uma extensão que já esta incluída no container rest-api onde rapidas chamadas podem ser feitas com o arquivo api.http

![Alt text](image.png)


#### Nível 2 PERSISTENCIA

Para persistir os dados usando o prisma foi criado o service prisma globalmente

```bash
$ npx nest generate service prisma
```

#### Nível 4 - Autenticação

seguindo a documentaçao de [nest.js](https://docs.nestjs.com/recipes/passport) vamos usar o passaport, jwt e bcript para fazer a autenticaçao, para isso foi criado um recurso user, para criaçao de usuario com apenas login e senha, o modulo de auth com toda configuraçao necessaria para fazer autenticaçao usando jwt. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Tiago Almeida](https://kamilmysliwiec.com)
- Twitter - [@tiagoGIM](https://twitter.com/tiagoGIM)

## License

recebiveis-api is [MIT licensed](LICENSE).
