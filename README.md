<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>


## 📋 Sobre

Aplicacão para teste técnico na Bankme.
Se trata de uma aplicacão full stack de cadastro de recebíveis, onde o usuário pode cadastrar, listar e excluir recebíveis.

## 🚀 Tecnologias utilizadas

### Backend

- NestJS
- Prisma
- RabbitMQ
- Jest

### Frontend

- React
- NextJS
- Tailwind

## Executando o projeto

1 - Altere o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente.
```base
mv ~/.env.example ~/.env
```

2 - Executar containers
```bash
docker-compose up --build
```

3 - Acesse o frontend em `http://localhost:3000`

Obs.: No diretório `./backend/http` existem arquivos demonstrando como acionar as rotas da api

### Teste de carga com Autocannon para rota `intagration/payable/batch`

```bash
npx autocannon -a 10000 -m POST -H Content-Type: application/json -b '{ payables: [ { value: 123.00, assignorId: a431ef69-c190-405b-b3a3-7829d4c95066 }, { value: 124.00, assignorId: a431ef69-c190-405b-b3a3-7829d4c95066 }, { value: 125.00, assignorId: a431ef69-c190-405b-b3a3-7829d4c95066 } ] }' --renderStatusCodes http://localhost:3333/integrations/payable/batch

```
## Linkedin

[Linkedin](https://www.linkedin.com/in/ricardoraposoo)
