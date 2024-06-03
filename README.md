# BankMe

**Isso não é um monorepo!**, Para rodar as aplicações juntas, utilize o Docker Compose:

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

Os dois projetos estão no mesmo repositório para facilitar o encontro deles. Além disso, toda a documentação necessária para instalar e inicilizar o projeto estará disponível no README.md de cada projeto.

# Processo de desenvolvimento

- Leitura dos requisitos
- [Brainstorm da Solução](#Brainstorm-da-solução)
- Organização das tarefas
- [Decisão das tecnologias a serem utilizadas](#Tecnologias-utilizadas)

# Tecnologias utilizadas

### Backend

Tecnologias utilizadas:

- NestJs
  - Obrigatório;
- SQLite
  - Obrigatório;
- Prisma
  - Obrigatório;
- JWT
  - Obrigatório;
- Docker e Docker Compose
  - Obrigatório;
- Bull
  - Decidir utilizar ela pois tenho mais familiridade e é recomendada pela documentação
- Swagger
  - Documenta a aplicação e ainda permite realizar testes no endpoint

Decisões de arquitetura:

- Arquitetura em camadas

### Frontend

Tecnologias utilizadas e suas motivações:

- React e NextJS
  - Possuo mais familiridade com estes framework/biblioteca, por consequência meu desenvolvimento demora menos tempo(o que estou tendo pouco no momento);
- React-hook-form
  - Esta biblioteca permite que eu construa componentes controlavéis com facilidade;
- Zod
  - Permite que eu desenvolva validações no meu formulário e é compatível com Typescript;
- Tailwind
  - Decidir por não utilizar Design System, por exemplo o Material UI, por meu protótipo apresentar componentes simples;

Decisões de arquitetura:

- NextJS
  - SSR e Router
- Atomic Design

# Brainstorm da solução

### Backend

TODO: Adicionar imagem

### Frontend
