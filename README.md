<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprova-me
</h1>

## Sumário

- [Sumário](#sumário)
- [❤️ Bem vindos](#️-bem-vindos)
- [🚀 Vamos nessa!](#-vamos-nessa)
  - [Dicas](#dicas)
  - [Como você deverá desenvolver?](#como-você-deverá-desenvolver)
  - [Qual o tempo para entregar?](#qual-o-tempo-para-entregar)
- [💻 O Problema](#-o-problema)
  - [Estrutura de um recebível](#estrutura-de-um-recebível)
  - [Estrutrua de um cedente](#estrutrua-de-um-cedente)
- [💾 Back-end](#-back-end)
  - [Nível 1 - Validação](#nível-1---validação)
  - [Nível 2 - Persistência](#nível-2---persistência)
  - [Nível 3 - Testes](#nível-3---testes)
  - [Nível 4 - Autenticação](#nível-4---autenticação)
  - [Nível 5 - Gerenciamento de permissões](#nível-5---gerenciamento-de-permissões)
  - [Nível 6 - Infra e Doc](#nível-6---infra-e-doc)
  - [Nível 7 - Lotes](#nível-7---lotes)
  - [Nível 8 - Resiliência](#nível-8---resiliência)
- [🖥️ Front-end](#️-front-end)
  - [Nível 1](#nível-1)
  - [Nível 2](#nível-2)

## ❤️ Bem vindos 

Olá, tudo certo?

Seja bem vindo ao teste de seleção para novos desenvolvedores na Bankme!

Estamos honrados que você tenha chegado até aqui!

Prepare aquele ☕️ , e venha conosco codar e se divertir!

## 🚀 Vamos nessa!

Este é um teste para analisarmos como você desempenha ao entender, traduzir, resolver e entregar um código que resolve um problema.

### Dicas

- Documente;
- Pergunte;
- Mostre a sua linha de reciocínio;
- Trabalhe bem o seu README.md;

### Como você deverá desenvolver?

1. Faça um clone deste projeto em seu GitHub pessoal;
2. Realize as implementações de acordo com cada um dos níveis;
3. Faça pequenos commits;
4. Depois de sentir que fez o seu máximo, faça um PR para o repositório original.

**IMPORTANTE!**

Não significa que você precisa implementar todos os níveis para ser aprovado no processo!

Faça até onde se sentir confortável.

### Qual o tempo para entregar?

Você terá **48 horas** a partir do envio do link deste repositório.

Mas não desista! Envie até onde conseguir.

## 💻 O Problema

Um cliente da Bankme solicitou uma nova funcionalidade, relacionada a recebíveis.

Todos os dias esse cliente movimenta vários recebíveis, e nosso time de operações estava ficando maluco tendo que cadastrar tudo isso de forma manual!

Os recebíveis são representações digitais de um documento que simula uma dívida a ser recebida. E para Bankme, é importante ter essas informações como parte do fluxo comercial que temos com este cliente.

### Estrutura de um recebível

| CAMPO        | TIPO          | DESCRIÇÃO                                 |
|--------------|---------------|-------------------------------------------|
| id           | string (UUID) | É a identificação de um recebível.        |
| valor        | float         | É o valor do recebível.                   |
| emissionDate | date          | É a data de emissão do recebível.         |
| assignor     | int           | Representa a identificação de um cedente. |

### Estrutrua de um cedente

| CAMPO    | TIPO        | DESCRIÇÃO                             |
|----------|-------------|---------------------------------------|
| document | string(30)  | É o documento CPF ou CNPJ do cedente. |
| email    | string(140) | É o email do cedente.                 |
| phone    | string(20)  | É o telefone do cedente.              |
| name     | string(140) | É a nome ou razão social do cedente.  |

## 💾 Back-end

### Nível 1 - Validação

Implemente uma API utilizando NestJS que receba dados de um recebível e de um cedente.

A rota para este cadastro é:

`POST /integrations/payable`

Essa rota deverá receber todas as informações. É importante garantir a validação destes dados:

1. Nenhum campo pode ser nulo;
2. Os ids devem ser do tipo UUID;
3. As strings não podem ter caracteres a mais do que foi definido em sua estrutura;

Se algum campo não estiver preenchido corretamente, deve-se retornar uma mensagem para o usuário mostrando qual o problema foi encontrado em qual campo.

Se todos os dados estiverem validados. Apenas retorne todos os dados em um formato JSON.

### Nível 2 - Persistência

Utilize o Prisma, para incluir um novo banco de dados SQLite.

Crie a estrutura de acordo com o que foi definido.

Caso os dados estejam válidos, cadastre-os.

Crie 2 novas rotas:

`GET /integrations/payable/:id`

`GET /integrations/assignor/:id`

Para que seja possível retornar pagáveis e cedentes de forma independete.

### Nível 3 - Testes

Crie testes unitários para cada arquivo da aplicação. Para cada nova implementação a seguir, também deve-se criar os testes.

### Nível 4 - Autenticação

Inclua um sistema de autenticação em todas as rotas.

Para isso, crie uma nova rota:

`POST /integrations/auth` que deve receber:

```json
{
  "login": "aprovame",
  "password": "aprovame"
}
```

Com essas credenciais o endpoint deverá retornar um JWT com o tempo de expiração de 1 minuto.

Reescreva as regras de todas as outras rotas para que o JWT seja enviado como parâmetro do `Header` da requisição.

Se o JWT estiver válido, então os dados devem ser mostrados, caso contrário, deve-se mostrar uma mensagem de "Não autorizado".

### Nível 5 - Gerenciamento de permissões

Agora, crie um sistema de gerenciamento de permissões.

Crie um novo cadastro de permissões. Esse cadastro deve armazenar: `login` e `password`.

Refatore o endpoint de autenticação para que sempre se gere JWTs se login e senha estiverem cadastrados no Banco de Dados.

### Nível 6 - Infra e Doc

Crie um `Dockerfile` para sua API.

Crie um `docker-compose.yaml` para iniciar o seu projeto.

Documente tudo o que foi feito até aqui:

- Como preparar o ambiente;
- Como instalar as dependência;
- Como rodar o projeto;

### Nível 7 - Lotes

Crie um novo recurso de processamento de pagáveis por lotes.

A ideia é que o cliente possa enviar um GRANDE número de pagáveis de uma única vez. E isso, não poderá ser processado de forma síncrona.

Crie um novo endpoint:

`POST integrations/payable/batch`

Neste endpoint deve ser possível receber lotes de até 10.000 pagáveis.

Ao receber todos os pagáveis, deve-se postá-los em uma fila.

Crie um consumidor para esta fila que deverá pegar pagável por pagável, criar seu registro no banco de dados, e ao final do processamento do lote enviar um e-mail de lote processado, com o número de sucesso e falhas.

### Nível 8 - Resiliência

Caso não seja possível processar algum ítem do lote, coloque-o novamente na fila. Isso deve ocorrer por até 4 vezes. Depois, esse ítem deve ir para uma "Fila Morta" e um e-mail deve ser disparado para o time de operações.

## 🖥️ Front-end

### Nível 1

### Nível 2