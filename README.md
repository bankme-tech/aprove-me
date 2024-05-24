Este é um projeto composto por uma aplicação backend em Node.js e uma aplicação frontend em Angular, com o RabbitMQ como sistema de mensageria. O projeto utiliza Docker para facilitar a configuração e execução dos serviços.

## Pré-requisitos

Antes de iniciar, você precisa ter os seguintes softwares instalados:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estrutura do projeto

├── client
│   ├── Dockerfile
│   ├── package.json
│   └── ... (outros arquivos do frontend)
├── server
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── ... (outros arquivos do backend)
├── docker-compose.yml
└── README.md (você está aqui)


## Configuração

Clone o repositório para a sua máquina local:

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

Certifique-se de que os arquivos package.json e .env estejam presentes nos diretórios server e client.

Um exemplo de como configurar o arquivo .env encontra-se no arquivo .env.example

DATABASE_URL=sqlite:./dev.db
RABBITMQ_URL=amqp://rabbitmq

## Executando o Projeto

No diretório raiz do projeto, execute o seguinte comando para iniciar todos os serviços usando:

```sh
docker-compose up --build
```

Este comando irá construir as imagens Docker e iniciar os contêineres para o RabbitMQ, backend e frontend.Acesse a aplicação:

Backend: http://localhost:3000
Frontend: http://localhost:4200
RabbitMQ Management: http://localhost:15672

## Parando os Serviços

Para parar e remover os contêineres, execute:

docker-compose down

