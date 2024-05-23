# TODO
## Todo-list
### Back-end
1. [x] `POST /integrations/payable`
    - [x] Validar dto.
    - [x] UUID
2. Testes
    - [x] Tests.
3. Persistência
    - [x] `GET /integrations/payable/:id`
    - [x] `GET /integrations/payable/:id`
    - [x] PATCH, POST, DELETE
4. Auth
    - [x] Jwt com duração de 1 minuto
    - [x] Dto `{ "login": "aprovame", "password": "aprovame" }`
5. Criar User
    - [x] User com login e password.
    - [x] Save Auth Dto.
6. Infra
    - [x] Dockerfile API
    - [x] docker-compose database.
7. Batch
    - [] `POST integrations/payable/batch`
    - [] RabbitMQ file: send batch
    - [] RabbitMQ Consumer: process batch
8. Resiliência
    - [] RabbitMQ: dead-letter queue
9. Cloud
    - [] Pipeline
10. IoC
    - [] docker-compose localstack
    - [] docker-compose terraform or openToFu
