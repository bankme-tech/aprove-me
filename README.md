<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>


# Bankme Api

## Preparando o Ambiente

1. **Instalar o Docker**: Certifique-se de que você tem o Docker e o Docker Compose instalados na sua máquina. [Instruções de instalação do Docker](https://docs.docker.com/get-docker/)

2. **Clonar o Repositório**: Clone o repositório do projeto para a sua máquina local.

    ```bash
    git clone https://github.com/pedro-henrique-a-silva/aprove-me
    git checkout pedro-henrique-a-silva-bankme
    ```

## Iniciando o Projeto

O projeto ira rodar em containers do Docker todas as dependencias serão instaladas ao rodar o comando para iniciar os containers.

> Atenção: É necessário criar um arquivo `.env` na raiz do projeto com algumas variáveis necessarias para rodar a aplicação, siga o modelo do `.env.exemplo`

## Rodando o Projeto


1. **Iniciar o Contêiner**: Inicie o contêiner com o comando:

    ```bash
    docker-compose up -d --build
    ```

    Isso vai iniciar a aplicação da api que irá rodar na porta 3000 `http://localhost:3000`.

    Esse comando também incia um container rodando um banco de dados MySQL, um container rodando o RabbitMQ para gerenciar as filas de processamento e um rodando um micro-serviço para consumir as filas para processamento.

2. **Acessar o Contêiner**: O processo de iniciar a aplicação e banco de dados pode demorar um pouco então e recomendavel que se verifique se a api e o micro-serviço que consome as filas estão saudaveis.

### Verificando saúde da API

Basta execuar o comando

  ```bash
    docker logs -f bankme-api
  ```
    
espere até que veja isso nos logs:

 ```bash
[Nest] 294  - 06/03/2024, 3:20:14 PM     LOG [NestApplication] Nest application successfully started
  ```

### Verificando saúde do Micro-serviço
  
  Basta executar o comando

  ```bash
  docker logs -f bankme-consumer
  ```

espere até que veja isso nos logs:

 ```bash
[Nest] 97  - 06/03/2024, 3:20:10 PM     LOG [NestMicroservice] Nest microservice successfully started
  ```


## Desenvolvimento

Tanto a API quanto o micro-serviço foram desenvolvidos utilizando o framework **Nestjs**, além disso foi utilizado o ORM Prisma para o banco de dados e um servidor RabbitMQ adicionar o serviço de mensageria ao projeto

## Utilização

Acessando a url `http://localhost:3000/documentation` você terá uma documentação completa sobre todos os caminhos da API e como utiliza-los.