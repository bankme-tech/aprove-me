# Backend

## 💻 O Problema
Um cliente da Bankme solicitou uma nova funcionalidade, relacionada a recebíveis.

Todos os dias esse cliente movimenta vários recebíveis, e nosso time de operações estava ficando maluco tendo que cadastrar tudo isso de forma manual!

Os recebíveis são representações digitais de um documento que simula uma dívida a ser recebida. E para Bankme, é importante ter essas informações como parte do fluxo comercial que temos com este cliente.

## ▶️ Iniciar o projeto
Para iniciar o projeto execute os comandos abaixo (tenha pelo menos o Node 18 instalado).

1. Crie um arquivo `.env.local` baseado no arquivo `.env.example`.
2. Caso necessário, altere a variável de ambiente para apontar corretamente para o backend
3. Execute o comando `npm run build` para gerar uma build do projeto
4. Execute o comando `npm run start -- -p 3001` para executar o projeto na porta 3001.


## 🧱 Estrutura do Projeto
Este projeto foi construído utilizando o NextJS 14 com o App folder. As funcionalidades e componentes são separados por segregação de responsabilidades, visando a letra S (Segregation Responsibility Principle) dos princípios SOLID, seria possível fazer uma segregação ainda maior, mas infelizmente por falta de tempo decidi não me aprofundar tanto.
A aplicação conta com uma autenticação básica, aonde o token é armazenado no localStorage. Em uma aplicação para produção, recomendaria salvar o token nos cookies, pela facilidade de transição entre o lado do servidor e do cliente, e também por alguns aspectos de segurança.
Foi também utilizado funcionalidades de cache tanto no lado do servidor quanto no lado do cliente.


## 👀 Níveis concluídos
- [X] Nível 1 - Cadastro
- [X] Nível 2 - Conectando na API
- [X] Nível 3 - Listando
- [X] Nível 4 - Autenticação
- [ ] Nível 5 - Testes

## ⭐️ Funcionalidades
- Design simples e rápido com Shadcn/UI
- Utilização de caches
- Segregação de responsabilidade dos arquivos
- NextJS 14