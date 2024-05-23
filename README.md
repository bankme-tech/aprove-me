# [API] Aprove-me

Cadastro de cedente e pagáveis.

## RFC #1

Tema: Decisão de estrutura

Esta RFC propõe uma estrutura de projeto para a aplicação `aprove-api` que prioriza o desacoplamento entre componentes e facilita a substituição de módulos individuais. A abordagem multiestágio e as boas práticas de arquitetura hexagonal garantirão a modularidade e escalabilidade da aplicação.

**Motivação**

Ao adotar uma abordagem que promova o desacoplamento e a substituição fácil de componentes, podemos responder às mudanças dos requisitos e tecnologias de forma ágil, sem impactar todo o sistema.

**Proposta**

```
project-folder/
  |- src/
  |    |- application/
  |    |    |- use cases
  |    |    |- ...
  |    |- domain/
  |    |    |- customer-enity.ts
  |    |- infra/
  |    |    |- server
  |    |    |- ...
  |    |- main.ts

```

Esta estrutura reflete a organização modular da aplicação, com foco em manter o desacoplamento e facilitar a substituição de componentes. A descrição dos módulos é a seguinte:

**- controllers:** Contém os controladores responsáveis por lidar com a interação entre as solicitações e os _use cases_ de _application_.

**- domain/:** Este módulo abriga as regras de negócio relacionadas ao cliente. Essa camada inclui o serviços que encapsula a lógica de negócios e comportamentos.

**- applications/:** Representa a porta do mundo externo para o interno. É implementar a lógica de negócios da aplicação e coordenar a interação entre os diversos componentes do sistema.

**- infra/:** Camada interna e tem a responsabilidade de lidar com os detalhes de implementação e as interações com componentes externos.

**- main.ts:** Ponto de entrada da aplicação.

**Benefícios**

**- Desacoplamento:** A estrutura modular mantém as diferentes partes da aplicação isoladas, permitindo desenvolvimento independente e menos dependências.

**- Substituição de Componentes:** A modularidade facilita a substituição de módulos individuais, minimizando o impacto em outras partes do sistema.

**- Manutenção Fácil de Regras de Negócio:** Colocar as regras de negócio dentro do módulo de domínio promove uma organização clara e facilita a manutenção e evolução das regras.

# Sumário

- [Stack](#stack)
- [Instalação e execução da API](#instalação-e-execução-da-api)
- [Comandos adicionais](#comandos-adicionais)
- [Gerar imagem Docker](#gerar-imagem-docker)

# Stack

Para criação desse projeto utilizamos as seguintes bibliotecas e framework

- [TypeScript](https://www.typescriptlang.org/) - Linguagem fortemente tipada
- [Docker CE](https://www.docker.com/) - Plataforma de deploy
- [Jest](https://jestjs.io/pt-BR/docs/getting-started) - Framework de teste Javascript

# Instalação e execução da API

### Use a mesma versão de node do projeto

Para execução deste step tenha [nvm](https://github.com/nvm-sh/nvm) instalado em sua máquina e execute os comandos abaixo:

```
  nvm use
```

### Instale as dependências do projeto

Utilize o [yarn](https://yarnpkg.com/):
Utilize o [npm](https://www.npmjs.com/)

```
  npm install
```

### Execute o projeto local

Então execute o seguinte comando. Para execução local é preciso ter o docker instalado para que assim um MongoDB seja instânciado.

Tem uma `/documents` que contem os `curl` dos endpoint para a API.

```
  npm run start:dev
```

# Comandos adicionais

### Teste

Para executar a stack de testes basta executar o seguinte comando:

```
  npm test
```

Para executar um teste específico fica assim:

```
  npm run test:unit
  npm run test:integration
  npm run test:ci
```

# Gerar imagem Docker

Este projeto contém uma imagem Docker para geração de **api-aprove**.

## Pré-requisitos

Certifique-se de ter o Docker e [docker-compose](https://docs.docker.com/compose/install/) instalado em seu sistema.

1. Crie a imagem: 
```
  docker build -t aprove-api .
```

## Configuração

- **PORT**: Porta na qual o servidor web ficará disponível (default: 3000);
- **DATABASE_URL**: URI para conexão com o mongodb;

Basta cópiar o arquivo `.env.example` e renomear para `.env`.

2. Construa um contâiner
```
docker-compose up -d
```