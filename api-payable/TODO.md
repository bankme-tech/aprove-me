# TODO
## Todo-list
### Back-end
1. `POST /integrations/payable`
    - [x] Validar dto.
    - [x] UUID
2. Persistência
    - [x] `GET /integrations/payable/:id`
    - [x] `GET /integrations/assignor/:id`
    - [x] PATCH, POST, DELETE
3. Testes
    - [x] payables tests.
    - [x] assignor tests.
    - [ ] auth tests.
    - [ ] rabbitMQ tests.
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
    - [x] `POST integrations/payable/batch`
    - [x] RabbitMQ file: send batch
    - [x] RabbitMQ Consumer: process batch
8. Resiliência
    - [x] RabbitMQ: dead-letter queue.
    - [ ] Email sender.
9. Cloud
    - [ ] Pipeline
10. IoC
    - [ ] docker-compose localstack
    - [ ] docker-compose terraform or openToFu
