## Front-end de Recebíveis e Cedentes

Iniciar projeto:

```bash
$ npm install

$ npm run dev

```

## Cadastro

Interface na qual é possível cadastrar os pagáveis em Next.js e previne o cadastro de campos vazios, ou que não estejam nas regras definidas na API.

Os campos do componete Payable são valiados, permitindo o envio do formulario atendendo todos os requisitos do escopo do projeto.

## Conectando na API

Cadastro de pagável com a API e adição tela de cadastro de cedente dentro do Banco de Dados.

Alteração no componente para que o campo assignor seja um combobox e mostre o id de cada assignor presente no banco de dados, atualização na api para retornar todos os assignor em uma única requisição.

Como utilizar fazer a conecção da api?

Faça o compose da API no docker ou utilize as funções internar para iniciar a aplicação no ambiente local, utilizando a rota:

```bash
http://localhost:3001/
```

Ambas aplicações iniciadas já será possivel a utilização do ambiente.

## Listando

Adcionado uma lista para mostrar todos os pagáveis do banco de dados, permitindo ver detalhes do cedente e excluir do banco de dados.

Atualização de API para retornar todos os pagáveis.

## Autenticação

Sisteama de login e senha e verificação de rotas para usuarios logados.
