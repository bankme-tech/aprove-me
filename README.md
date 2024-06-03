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

- Desenho do Database
![Screenshot 2024-06-02 213350](https://github.com/rogigs/bank-me/assets/49894949/2be7ce4f-3997-4157-ac14-ec3571e3af5a)


### Frontend
- Desenho da UI 
- Entendimento do retorno da API
- Definição das rotas
- Design System -> as cores são baseadas no site da Bank Me
![image](https://github.com/rogigs/bank-me/assets/49894949/e9ea691c-2b79-4402-916d-7bd28e038d1d)


