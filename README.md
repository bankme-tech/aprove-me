# Aprove-me

## Pré-requisitos(para o backend por enquanto)

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração

1. Clone o repositório para a sua máquina local usando `git clone`.

```bash
git clone git@github.com:emersondont/aprove-me.git
```

2.Navegue até a pasta api no diretório do projeto.
```bash
cd aprove-me/api
```

3.Crie um arquivo .env no diretório raiz do projeto. Você pode usar o arquivo .env.example como base.
```bash
cp .env.example .env
```

4.Abra o arquivo .env e atualize as variáveis de ambiente conforme necessário.

### Executando o Projeto
1. Construa a imagem Docker e inicie os serviços usando docker-compose.
```bash
docker-compose up --build
```

Agora, seu projeto deve estar rodando no localhost na porta especificada no arquivo .env

### Parando a execução do container
1. Rode o docker compose down para parar a execução do container.
```bash
docker compose down
```