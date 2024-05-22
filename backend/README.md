# Backend

## 💻 O Problema
Um cliente da Bankme solicitou uma nova funcionalidade, relacionada a recebíveis.

Todos os dias esse cliente movimenta vários recebíveis, e nosso time de operações estava ficando maluco tendo que cadastrar tudo isso de forma manual!

Os recebíveis são representações digitais de um documento que simula uma dívida a ser recebida. E para Bankme, é importante ter essas informações como parte do fluxo comercial que temos com este cliente.

## ▶️ Iniciar o projeto
Para iniciar o projeto poderá ser feito de 3 maneiras.

### 1. Localmente
Para essa execução, instale a última versão LTS do Node em sua máquina, e siga as instruções abaixo.

1. Crie um arquivo `.env` baseado no arquivo `.env.example`.
2. Preencha as variáveis de ambiente necessárias para aplicação funcionar.
3. Instale as dependências da aplicação através do comando `npm install`.
4. Gere a tipagem do prisma localmente com o comando `npx prisma generate`.
5. Agora popule o banco de dados através do comando `npx prisma seed`.
6. Neste momento você poderá executar a aplicação com o comando `npm run start` caso queira executar em desenvolvimento.
7. (BUILD) Caso queira executar a aplicação já "buildada", primeiro execute `npm run build` e após `npm run start`

### 2. Docker
Para essa execução, garanta que tenha o Docker instalado em sua maquina (testado na versão 26.1.1, build 4cf5afa)

1. Crie um arquivo `.env` baseado no arquivo `.env.example`.
2. Preencha as variáveis de ambiente necessárias para aplicação funcionar.
3. Faça o build da imagem docker através do comando `docker build -t backend_image .`
4. Agora execute o projeto através do comando `docker run -d -p 3000:3000 backend_image`

### 3. Docker Compose
Para essa execução, garanta que tenha o Docker instalado em sua maquina (testado na versão 26.1.1, build 4cf5afa) e Docker Compose (testado na versão v2.27.0-desktop.2)

1. Crie um arquivo `.env` baseado no arquivo `.env.example`.
2. Preencha as variáveis de ambiente necessárias para aplicação funcionar.
3. Execute o comando `docker-compose up -d`

## 🧱 Estrutura do Projeto

O projeto foi desenvolvido utilizando o NestJS, decidi separar os arquivos por responsabilidades pois em casos de grandes aplicações esse método ajuda na escalabilidade e manutenibilidade da aplicação, foi utilizado alguns conceitos da Clean Architecture, como segregação de camadas. Também foi adotado alguns design patterns como Factories, Skeleton, Repository Pattern e Either Pattern.

## 👀 Níveis concluídos
- [X] Nível 1 - Validação
  - No nível de validação, foi feito validações tanto nos controllers quanto nas entidades, visto que no ponto de vista de segregação, as camadas da aplicação devem trabalhar "independentes".
- [X] Nível 2 - Persistência
  - Como informado, foi utilizado Prisma com SQLite para a persistência dos dados. Também foi feito a criação de arquivos seeds. Para iniciar a aplicação com alguns valores já definidos.
- [X] Nível 3 - Testes
  - O teste como um todo foi feito testes unitários, inclusive para os arquivos de consumers das filas. 
- [X] Nível 4 - Autenticação
  - A aplicação conta com uma autenticação JWT, seguindo as instruções informadas. A senha do usuário também é armazenada no banco de dados criptografada.
- [X] Nível 5 - Gerenciamento de permissões
  - O gerenciamento de permissões é feito através da utilização de Guards nos controllers.
- [X] Nível 6 - Infra e Doc
  - A aplicação conta com um painel de documentação do Swagger, além dos arquivos READMEs. Também foi criado um arquivo Dockerfile e docker-compose para utilizar tanto a aplicação quanto o redis.
- [X] Nível 7 - Lotes
  - Foi feito a manipulação assíncrona de filas através do Bull, seguindo o fluxo de receber os payables e envia-los para ser processados posteriormente.
- [X] Nível 8 - Resiliência
  - Caso acontece algum erro durante o processamento da fila, será feito 4 tentativas no mesmo payable, e se ainda tiver dando erro será emitido um evento para disparar email para a equipe de suporte. (Emails não integrados)
- [X] Nível 9 - Cloud
  - Foi criado um arquivo do github actions para enviar a aplicação para a AWS EC2
- [ ] Nível 10 - Infra as a Code
  - Este nível infelizmente não pude completar, pois ainda não tenho conhecimento prático na utilização do TerraForm. Mas pretendo aprender em breve.

## ⭐️ Funcionalidades
Essas são algumas das funcionalidades da aplicação
- Armazenamento de senha criptografado
- Documentação de API REST (http://127.0.0.1:3000/docs)
- Filas assíncronas
- Facilidade de replicação de módulos
- Testes
- Arquivo client.http (na raiz do projeto) para uma rápida analise nos endpoints