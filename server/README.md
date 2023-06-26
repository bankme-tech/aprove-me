## Description

<h4>Aprova me </h4>

Desafio feito para bankme!

## Resources

#### Assignor
[post] /assignor
[get] /assignor
[put] /assignor/:id
[get] /assignor/:id
[del] /assignor/:id
#### Payable
[post] /payable
[post] /payable/batch
[get] /payable
[put] /payable/:id
[get] /payable/:id
[del] /payable/:id

#### Auth
[post] /auth/login



## Installation

```bash
$ npm install
```

## Build the app

```bash
$ npm install
$ npm run prisma:build
```

## Running the app

To running locally you need to have a redis instance running on port 6379.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with docker

```bash
# localhost:3000
$ docker compose up -d
```

## Test

```bash
# unit tests
$ npm run test:unit

# ci tests
$ npm run test:ci
```