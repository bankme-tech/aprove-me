
## Descrição

Frontend criadao com o intuito de realizar o teste para desenvolvedor fullstack na Bankme.

O Frontend feito em React utilizar o framework Next.JS, um arquétipo opinado que conta com inúmeras facilidades para desenvolvedores que desejam criar interface.

Foi utilizado um utilitário de classes CSS chamado Tailwindcss e Daisyui, a escolha o Daisyui em relação a outra bibliotecas de componente foi devido à performance que ela trás à aplicação devido utilizar apenas coisa primitivas da web que é o CSS e o HTML, sem nenhum javascript.

No texto a seguir serão explicados o pontos mais importantes e o conceitos utilizados nesse Frontend.

## Como rodar a aplicação (localmente)

```bash
$ pnpm install // instalar as dependencias
$ pnpm dev // inicializa a aplicação
```

## Explicação da arquitetura

## Injeção da API
Nesse frontend, utilizei uma espécie de injeção de dependência que eu mesmo criei para suprir a necessidade dos testes. Como o ideal é que os testes unitários não façam requisições para a API, encontrei uma boa maneira de mockar esses dados.

Para isso, utilizo uma única instância do BankmeClient que é injetada pelo ApiContextProvider

![image](https://github.com/felipe1496/aprove-me/assets/75271280/a1f4ce29-ba6f-418b-9b64-5d2fdac6cff1)

### intância sendo utilizada no código

![image](https://github.com/felipe1496/aprove-me/assets/75271280/2f8843e4-8de9-468b-a6a6-0368c7dda48f)

Dessa forma é possível injetar um outro BankmeClient que implementa os métodos de forma mockada, para realizar os testes

### Injetando BankmeClient mockado durante testes

![image](https://github.com/felipe1496/aprove-me/assets/75271280/e400f730-5279-4cbc-94a7-b4eb8070457e)

## Autenticação

Para realizar a autenticação, coloquei o accessToken dentro dos cookies, e sempre que request é utilizado, ele injeta através de um interceptor, o accessToken do usuário.

Caso o accessToken esteja inválido, um interceptor das responses vai redirecionar o usuário para a página de login



