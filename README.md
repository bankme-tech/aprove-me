<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aplicação - Aprove-me
</h1>

## Sumário

- [Sumário](#sumário)
- [❤️ Bem vindos](#️-bem-vindos)
- [🚀 Instalação!](#-instalação)
- [✅ Tarefas!](#-tarefas)

## ❤️ Bem vindos 

Para melhor organização, deixei documentos do projeto organizados no notion, você pode conferir [aqui](https://natural-iberis-96f.notion.site/Bankme-appliance-31210b6ec8fb4da38b1c0f5913b38e6f?pvs=4), lá você verá os documentos técnicos, e demais links para outras informações relacionadas ao projeto.

## 🚀 Instalação!

> Aqui assumimos que você já tenha instalado git e node, além de possuir conhecimentos básicos dos mesmos.

### Repositório

Para baixar o projeto, escolha a pasta que vai coloca-lo e rode: `https://github.com/darklight9811/bankme.git`

### Dependencias

Para baixar as dependencias, simplesmente rode `yarn` ou `npm i` no diretório raiz. Isso vai instalar todas as dependencias dos projetos também.

### Banco de dados

Por padrão estamos usando sqlite, para montar o banco, rode: `yarn db:push`.

### Backend

Agora para rodar o backend em modo de desenvolvimento, você pode rodar: `yarn dev:backend`. Isso vai utilizar a porta 3000, você pode verificar se está tudo funcionando abrindo no seu navegador: `http://localhost:3000`, você deverá ver uma mensagem semelhante a essa:

``` json
{
  "version": "0.1.0",
  "date": "06/01/2024"
}
```

### Frontend

Em um novo terminal, rode: `yarn dev:frontend`. Ele irá abrir na porta 3001, você pode verificar entrando no navegador: `http://localhost:3001`.

## Tarefas

### Backend
- [x]  1 - Validação
- [x]  2 - Persistência
- [ ]  3 - Testes
- [x]  4 - Autenticação
- [x]  5 - Gerenciamento de permissões
- [ ]  6 - Infra e doc
- [ ]  7 - lotes
- [ ]  8 - resiliência
- [ ]  9 - cloud
- [ ] 10 - infra as a code

### Frontend
- [ ] 1 - Cadastro
- [ ] 2 - Conectando na API
- [ ] 3 - Listando
- [ ] 4 - Autenticação
- [ ] 5 - Testes