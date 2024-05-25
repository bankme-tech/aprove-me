# Documentação de Execução do Projeto

Esta documentação destina-se a fornecer instruções detalhadas para a execução do projeto.

## Requisitos do Sistema

Antes de prosseguir com a execução do projeto, verifique se o seu sistema atende aos seguintes requisitos:

- Docker instalado e configurado corretamente
- Docker Compose instalado e configurado corretamente
- Conexão com a Internet para baixar as imagens Docker necessárias

## Estrutura do Projeto

O projeto é composto por múltiplos serviços que são gerenciados por meio de Docker Compose. A estrutura do projeto é organizada da seguinte forma:

```
project/
│
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── ...
├── frontend/
│   ├── Dockerfile
│   ├── ...
└── ...
```

## Execução do Projeto

A seguir, estão as instruções para a execução do projeto em cada ambiente:

1. Navegue até o diretório:

   ```bash
   cd /caminho/para/o/projeto
   ```

2. crie um arquivo .env na pasta backend, .env.example é um exemplo de como deve ser feito, com as seguintes variaveis de ambiente

   ```bash
   DATABASE_URL=nome do caminho que salvara o banco de dados, exemplo file:./dev.db

   SMTP_HOST= host do servidor de email
   SMTP_PORT= porta do servidor de email
   SMTP_USER= usuario do servidor de email
   SMTP_PASSWORD= senha do servidor de email
   SMTP_FROM= email de origem
   ```

3. Execute o comando abaixo na pasta root, para iniciar os serviços do ambiente de produção:

   ```bash
      docker-compose -f compose.prod.yml up
   ```

4. Aguarde até que todos os contêineres sejam iniciados e estejam em execução.

## Acesso ao Projeto

Depois que os serviços forem iniciados com sucesso, você poderá acessar o projeto por meio do navegador da Web ou de outros clientes, conforme apropriado. As informações específicas de acesso (URLs, portas, etc.) dependerão da configuração do projeto.

o acesso principal api é na url http://localhost:3000

## Encerrando os Serviços

Para encerrar os serviços e liberar os recursos do sistema, você pode usar o comando `docker-compose down`.

```bash
cd /caminho/para/o/projeto
docker-compose down
```

## Considerações Finais

Este documento fornece as instruções básicas para a execução do projeto usando Docker Compose. Certifique-se de ajustar as configurações de acordo com os requisitos específicos do seu projeto.

Se encontrar problemas durante a execução do projeto ou precisar de assistência adicional, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento para obter suporte.
