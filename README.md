# Pagáveis e cendentes

## Execução em ambiente local
### Terminal 1: Infrastructure
Criar container com banco de dados e RabbitMQ.
```sh
docker-compose up
```
### Terminal 2: Back-end
Criar estrutura no banco de dados.
```sh
yarn migrate:dev 
```
Iniciar aplicação local.
```sh
yarn dev 
```
### Terminal 3: Front-end
Iniciar aplicação
```sh
yarn dev 
```

## API
### 
Documentação de endpoint da API:
- `/integrations/auth`([ver](./api-payable/src/integrations/auth/API.md))
- `/integrations/assignor`([ver](./api-payable/src/integrations/assignor/API.md))
- `/integrations/payable`([ver](./api-payable/src/integrations/payable/API.md))
