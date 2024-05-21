# API TODO list
1. [] `POST /integrations/payable`
    - [X] Validar dto.
    - [X] UUID
2. Testes
    - [] Tests.
3. Persistência
    - [] `GET /integrations/payable/:id`
    - [] `GET /integrations/payable/:id`
    - [] PATCH, POST, DELETE
4. Auth
    - [] Jwt com duração de 1 minuto
    - [] Dto `{ "login": "aprovame", "password": "aprovame" }`
5. Criar User
    - [] User com login e password.
    - [] Save Auth Dto.
6. Infra
    - [] Dockerfile API
    - [] docker-compose database.
7. Batch
    - [] `POST integrations/payable/batch`
    - [] RabbitMQ file: send batch
    - [] RabbitMQ Consumer: process batch
8. Resiliência
    - [] RabbitMQ: dead-letter queue
9. Cloud
    - [] sair de casa e olhar as nuvens.
10. IoC
    - [] docker-compose localstack
    - [] docker-compose terraform or openToFu
