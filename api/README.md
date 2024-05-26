<p align="center">
  <img src="./docs/api-arch.png" width="1000" alt="Nest Logo" />
</p>

## Descrição

API criada com o intuito de realizar o teste para desenvolvedor fullstack na Bankme.

O Backend feito em Node.JS utilizar o framework Nest.JS, um arquétipo opinado que conta com inúmeras facilidades para desenvolvedores que desejam criar apis.

No texto a seguir serão explicados o pontos mais importantes e o conceitos utilizados nessa API.

Sumário
1. Como rodar a aplicação
2. Explicação da arquitetura

## Como rodar a aplicação

```bash
$ pnpm 
```

## Explicação da arquitetura

### Schema Validation
Para ter dados consistentes e que estão de acordo com a lógica de negócios da aplicação, foi utilizaro o [Zod](https://zod.dev/), um biblioteca de validação de dados e tipagem estática extremamente flexível e cabível para situação onde precisamos que os dados vindo do cliente da API sejam extremamente consistentes. A imeplemtação foi feita através da Pipe ZodValidationPipe que é utilizada nos parametros de body, params, entre outros.
### Validation Pipe
<img src="./docs/zod-pipe.png" width="400" />

### Utilização
<img src="./docs/zod-pipe-apply.png" width="400" />

### Autenticação
A autenticação no sistema foi feita utilizando tokens JWT com expiração definivida por uma variavel de ambiente JWT_EXPIRES_IN, além de um secret (JWT_SECRET). A cada request que é feito para a API antes de passar pelo fluxo de obtenção dos dados, uma checagem é feita pelo AuthGuard para garantir que o consumidor está passando um token valido e não expirado.

### Auth Guard
<img src="./docs/auth-guard-apply.png" width="400" />

### Utilização
<img src="./docs/auth-guard.png" width="400" />

### Criptografia da senha
Para a senha foi feito uma criptografia baseada em rounds a partir da biblioteca bcrypt

### Criptografando a senha para persistir
<img src="./docs/crypt-password.png" width="400" />

### Descriptografando na tentativa do login
<img src="./docs/decrypt-password.png" width="400" />

### Filas
As filas no projeto foram implementadas a partir da biblioteca [Bull](https://github.com/OptimalBits/bull). Com essa lib conseguimos criar uma classe produtora e outra consumidora, e ela trata de lidar com as ações encadeadas. Foi implementado tanto a fila de criação em lote dos payables quanto a fila morta. O email que seria do time de operações pode ser visualizado aqui https://ethereal.email/messages, ele será abastecido sempre que um Payable indevido não conseguir ser cadastrado

### Testes
No que se refere aos testes, fora implementados testes para os principais UseCases da aplicação
