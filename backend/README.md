# Documentação de Execução do Projeto

Esta documentação destina-se a fornecer instruções detalhadas para a execução do projeto.

## Requisitos do Sistema

Antes de prosseguir com a execução do projeto, verifique se o seu sistema atende aos seguintes requisitos:

- Node versão 16 ou superior instalado e configurado corretamente
- Conexão com a Internet para baixar as dependencias necessárias


## Execução do Projeto

A seguir, estão as instruções para a execução do projeto.

Navegue até o diretório do projeto:

   ```bash
   cd /caminho/para/o/projeto
   ```
   
## Instação
Execute o comando abaixo para instalar as depencencias: 

```bash
npm install
ou
yarn 
```

### Executar a aplicação 

```bash
# modo desenvolvimento
$ yarn run start

# modo desenvolvimento utilizando hot reload
$ yarn run start:dev

# modo produção
$ yarn run start:prod
```

## Modo teste

```bash
# testes unitarios
$ yarn run test

# teste cobertura
$ yarn run test:cov
```

## Acesso ao Projeto

Depois que os serviços forem iniciados com sucesso, você poderá acessar o projeto por meio do navegador da Web ou de outros clientes, conforme apropriado. As informações específicas de acesso (URLs, portas, etc.) dependerão da configuração do projeto.

o acesso principal api é na url http://localhost:3000



## Considerações Finais

Este documento fornece as instruções básicas para a execução do projeto. Certifique-se de ajustar as configurações de acordo com os requisitos específicos do seu projeto.

Se encontrar problemas durante a execução do projeto ou precisar de assistência adicional, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento para obter suporte.