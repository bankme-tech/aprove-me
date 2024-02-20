<p align="center">
  <img src="./docs/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprove-me
</h1>

### Sobre
Implementação do teste técnico da [bankme](https://bankme.tech) onde a idéia é ter uma aplicação fullstack que receba cadastros de Cedente e Pagável. A descrição completa do desafio pode ser encontrada [aqui](https://github.com/bankme-tech/aprove-me/blob/main/README.md).

### Tecnologias utilizadas
- Nest.js no back-end;
- Prisma ORM com SQLite (Banco de Dados);
- Redis + Bull para filas;
- Next.js no front-end;
- TailwindCSS + ShadcnUI para estilização;
- Axios para requests;
- Vitest para testes unitários.

### Pré-requisitos
- Node.js (v20.10.x)
- Docker
- Docker Compose

### Executando com Docker
1. Faça um clone do projeto em sua máquina:

```bash
git clone https://github.com/Viiict0r/bankme-tech-test.git
```

2. Configure as variáveis de ambiente:
```bash
# Back-end (altere os valores se necessário)
cp ./apps/api/.env.example ./apps/api/.env.production
```

3. Suba o ambiente utilizando docker-compose:
```bash
docker-compose up --build -d
```

4. Acesse em seu navegador:
```link
http://localhost:8080
```

### Executando em modo desenvolvimento
1. Faça um clone do projeto em sua máquina:

```bash
git clone https://github.com/Viiict0r/bankme-tech-test.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Back-end
cp ./apps/api/.env.example ./apps/api/.env

# Front-end
echo NEXT_PUBLIC_API_URL=http://localhost:3000 >> ./apps/web/.env.development
```

4. Rode as migrations do Banco de Dados:
```bash
cd apps/api && npx prisma migrate dev && cd ../../
```

5. Inicie as aplicações:
```bash
npm run dev
```

6. Acesse em seu navegador:
```bash
# Front-end
http://localhost:8080

# Back-end
http://localhost:3000
```


