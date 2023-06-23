## API de Validação de Recebíveis e Cedentes

Esta API foi desenvolvida utilizando o framework NestJS e tem como objetivo receber dados, realizando a validação desses dados.

Estrutura de acordo com o que foi definido.

REST API:

```bash
GET /integrations/payable/:id
GET /integrations/assignor/:id
PATCH /integrations/payable/:id
PATCH /integrations/assignor/:id
DELETE /integrations/payable/:id
DELETE /integrations/assignor/:id
```

## Executando a API

Certifique-se de ter o Node.js instalado em seu sistema.
Clone este repositório

```bash
$ npm install
$ npm run start
```

A API estará disponível localmente em http://localhost:3000.

## Teste Rest API

Exemplo de teste para o payable:

Utilize o verção 4 do UUID

```bash
{
  "id": "2ad5424a-7554-44f5-ab22-d38e6585b857",
  "value": 1000,
  "emissionDate": "2023-06-22T00:00:00Z",
  "assignor": 1
}
```

Exemplo de teste para o assignor:

```bash
{
  "document": "123456789",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "name": "John Doe"
}
```
