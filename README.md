# Teste técnico Bankme - Aproveme

## Sobre

Aplicação de cadastro de emissão de pagaveis e também de cedentes. Backend foi projetado com NesJS, persistência no Sqlite e os testes com JEST. Já o Frontend foi projetado com NextJS, React Query para requisições e JEST para os testes. Logo mais abaixo estarão as instruções para instalar e roda a aplicação

### 📋 Lista de features BACKEND

- [x] CRUD de Pagavéis e Cedentes
- [x] Validações dos campos requeridos e enviados.
- [x] Testes dos serviços
- [x] Autenticação/Autorização das rotas
- [x] Autenticação/Autorização das rotas utilizando Token JWT

### 📋 Lista de features FRONTEND

- [x] Login e Cadastro de Cedente
- [x] Rotas de privadas protegias por middleware do Next (Listgem de pagáveis privada)
- [x] Atualização e Exclusão de pagável
- [x] Testes automatizados com JEST e Testing Library


### 🔧 Instalação

**OBSERVAÇÃO:** Na raiz do projeto há duas pastas: backend e frontend. É preciso entrar em cada uma respectivamente e fazer
a instalação das dependências.

**FRONTEND**
01. Dentro da pasta frontend rode o comando abaixo para instalar as dependências
```
npm install
```

02. Em seguida rode o comando abaixo para subir a aplicação

```
npm run dev
```
Pronto. O servidor irá inicializar na porta 3000.

**BACKEND:** O backend da aplicação tem dois modos de se usar, através do servidor Nest normal ou então através de um container docker, cujos arquivos encontram-se na pasta.
Evidenciarei cada um deles, começando pelo servidor normal Nest.

**SERVIDOR NEST**
01. Dentro da pasta backend rode o comando abaixo para instalar as dependências
```
npm install
```

02. Em seguida rode o comando abaixo para subir a aplicação
```
npm run dev
```
Pronto. O servidor irá inicializar na porta 3001.

**APLICAÇÃO RODANDO NO DOCKER**
01. Dentro da pasta backend rode o seguinte comando abaixo para subir o container através do Docker Compose
```
docker compose up
```
02. Aguarde a subida dos containers e acesse o servidor na porta 3001, que é a porta onde a aplicação foi exposta pelo docker. Isto por conta que o
Next sobre na porta 3000, então foi escolhida a 3001 para o backend


## ✒️ Autor

- **Daniel Nogueira** - _Web Developer_ - [Github](https://github.com/NogueiraDan)
