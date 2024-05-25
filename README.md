# My API

## Preparando o Ambiente

1. **Instalar o Docker**: Certifique-se de que você tem o Docker e o Docker Compose instalados na sua máquina. [Instruções de instalação do Docker](https://docs.docker.com/get-docker/)

2. **Clonar o Repositório**: Clone o repositório do projeto para a sua máquina local.

    ```bash
    git clone git@github.com:feroddev/aprove-me.git
    cd aprove-me
    git checkout felipe-rodrigues-aprove-me
    ```

## Instalando as Dependências

As dependências do projeto serão instaladas automaticamente dentro do contêiner Docker, conforme definido no `Dockerfile`.

## Rodando o Projeto


1. **Iniciar o Contêiner**: Inicie o contêiner com o comando:

    ```bash
    docker-compose up -d --build
    ```

    Isso vai iniciar a aplicação e mapear a porta 3000 do contêiner para a porta 3000 do host. A aplicação estará acessível em `http://localhost:3000`.

2. **Acessar o Contêiner**: Se você precisar acessar o shell do contêiner para depuração, use o comando:

    ```bash
    docker exec -it bankme_api sh
    ```

## Estrutura do Projeto

- `Dockerfile`: Define a imagem Docker para o ambiente de desenvolvimento da API.
- `docker-compose.yml`: Define os serviços, volumes e variáveis de ambiente para a aplicação.
- `src/`: Diretório que contém o código-fonte da aplicação.
- `package.json` e `package-lock.json`: Arquivos que definem as dependências do projeto.


## Desenvolvimento

Durante o desenvolvimento, as mudanças feitas nos arquivos do projeto serão refletidas imediatamente no contêiner, graças ao volume montado (`volumes` no `docker-compose.yml`).

## Notas

- Certifique-se de que a porta 3000 não esteja sendo usada por outra aplicação no seu host.
- Para parar a aplicação, use `Ctrl+C` no terminal onde o Docker Compose está rodando, ou execute `docker-compose down` para parar e remover os contêineres.

## Me Conheça mais
[Linkedin](https://www.linkedin.com/in/feroddev/)
[Portfólio](portfolio-feroddev.vercel.app)

