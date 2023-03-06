<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108">
</p>
<h1 align="center">
  Aprova-me
</h1>

<h2>🔵  Resumo sobre o projeto</h2>
<p>Texto.</p>

</br>
<h2>💙  Aprendizados</h2>
<p>Texto.</p>

</br>
<h2> 👨🏽‍💻 Documentação Complementar FRONTEND</h2>
<p>Abaixo pode ser verificado o raciocínio para a criação da frontend</p>




</br>
</br>
</br>
</br>



</br>
<h2> 🧑🏽‍💻 Documentação Complementar BACKEND</h2>
<p>Abaixo pode ser verificado o raciocínio para a criação da api e também da infraestrutura, bem como os testes realizados utilizando o postman/logs.</p>


## Auth (Autenticação de um Bankmer)

<strong>Login</strong> </br> 
1- Instalação das Classes de Validação </br>
2- Redefinição dos loggers da aplicação </br>
3- Adição da função de CORS (segurança para comunicação entre domínios) </br>
4- Habilitando transformação dos dados recebidos pelo Payload </br>
5- Definindo prefixo global da API </br>
6- Teste do servidor rodando através do Postman </br>

![image](https://user-images.githubusercontent.com/90586912/221385143-8b4bb54c-2449-41ee-9c53-666b5808bc56.png) </br>

7- Criação das mensagens de validação (helpers). </br>
8- Criação dos DTOs utilizando Decorators de validação de Email e de Senha. </br>
9- Criação do Service de Authentication e definição da da regra de negócio para Login. </br>
10- Criação do Controller de Authentication. </br>
11- Criação do Module de Authentication e importação dentro do Modulo principal da API. </br>

![image](https://user-images.githubusercontent.com/90586912/221418106-715b8c75-70ad-4041-ba91-fe82abf61aba.png)
</br> 
</br> 
![image](https://user-images.githubusercontent.com/90586912/221418130-2722f614-0e28-45da-9907-bd5d8af3fbef.png)
</br> 

<strong>Cadastro</strong> </br> 
1- Instalação do Prisma e criação do DB SQLite (Envs, Schema, Models e Service) </br>
</br> 
![image](https://user-images.githubusercontent.com/90586912/221434463-18f443d6-2def-4cdd-822d-dafb8fe2a1fb.png) </br> 
</br> 
2- Instalação do Prisma, desenvolvimento do relacionamento e criação do DB SQLite (Envs, Schema, Models e Service) </br>
3- Criando Messagers, DTO, Regra de Negócio e Adicionando ao Auth Controller os recursos de Cadastro de um user através do Prisma </br>
3.1- Adicionando o Service do Prisma no Auth Module como um provider para o Service do Auth conseguir utilizar o Prisma. </br>
</br>
![image](https://user-images.githubusercontent.com/90586912/221436166-82ead0bd-f20f-49cc-91fe-ac2db6e85ec3.png)
</br>
![image](https://user-images.githubusercontent.com/90586912/221436501-f90a74cf-4797-402b-b819-9621d5f305d8.png)
</br>
4- Criando função para validar se o usuário já está cadastrado </br>
5- Criptografando a senha com CryptoJS </br>
</br>
![image](https://user-images.githubusercontent.com/90586912/221438054-ed9a7894-a15c-479f-b4f2-1d66cb6cc493.png) </br>
</br>
6- Criando a Estratégia de Authentication & Adicionando validação através do Token JWT (expiração de 60s) </br>
</br>
![image](https://user-images.githubusercontent.com/90586912/221452894-01854b34-958d-419b-8da5-92158bc34b5c.png)
</br>
7- Customizando as rotas privadas usando os Guards e adicionando o Decorator de validação do Guard no module principal </br>
</br>
![image](https://user-images.githubusercontent.com/90586912/221457257-abfc61c3-e266-4d67-bc9e-487a888ad8eb.png)
</br>
PS.: agora toda a aplicação está segura por padrão, e somente com o uso do Decorator customizado ("IsPublic") uma rota se tornará publica. Portanto, caso não seja pública, será necessário o JWT para validar o acesso à rota. </br>
</br>

## Payables - CRUD
PS.: Entidades do DB estão criadas, portanto, basta criar a regra de negócio. </br>
1- Criar o DTO </br>
2- Criar o Helper </br>
3- Criar o Service  </br>
4- Criar o Controller </br>
5- Criar o Module e importar no main module </br>
</br>
<strong>Tratamento de exceções no CRUD Payables</strong>
![image](https://user-images.githubusercontent.com/90586912/221611768-1e37b48d-e55c-4536-8176-d7d7ae662f77.png)
</br>
![image](https://user-images.githubusercontent.com/90586912/221621231-bff5f5fb-6291-41db-a8e0-8d42c3dcae20.png)
</br>

## Assignors - CRUD
PS.: Entidades do DB estão criadas, portanto, basta criar a regra de negócio. </br>
1- Criar o DTO (Adicionando validação de quantidade máx. de caracteres) </br>
2- Criar o Helper </br>
3- Criar o Service  </br>
4- Criar o Controller </br>
5- Criar o Module e importar no main module </br>
</br>
![image](https://user-images.githubusercontent.com/90586912/221621498-30a77b56-f8af-4a78-9ea5-d7de78659842.png)
</br>

<h1>Infra</h1>

## Docker
Iniciei criando os arquivos Dockerfile e dockerignore para conseguir criar a imagem da API. </br>

Em seguida crio o docker-compose.yml e faço uma nova imagem. </br>
<strong>OBS:</strong> o SQLite é um DB local, porém, a sua instância é criada dentro da imagem do Docker. </br>
</br>

![image](https://user-images.githubusercontent.com/90586912/222936202-173914e9-e760-4ef2-9b26-68cbbd1f57bf.png)
</br>

## Construção do IaC utilizando Terraform
Começo instalando a dependência de microservices do nestjs. </br>
Criação da instância utilizando terraform (IaC) através do arquivo main.tf. </br>
Para criar essa instância, foi criado um novo grupo de segurança, definindo regras de entrada e saída para HTTP, HTTPS e SSH.  </br>

</br>

![image](https://user-images.githubusercontent.com/90586912/222992287-64b48917-06b3-46f4-bb78-d58932863e21.png)</br>
</br>

## Gerar um Pipeline de Deploy (EC2 & Github Actions)
Uma vez já criada a instância do EC2, agora configuro o github através de um arquivo yml. </br>
Nesse momento, visando segurança e boas práticas, crio os secrets dentro do Github Actions Secrets. </br>


</br>

</br>


<h1>Filas e Microservice</h1>

## Criação do Microservice e Processamento de Pagáveis usando Fila
Começo instalando a dependência de microservices do nestjs. </br>
Instalo o RabbitMQ na API e faço as configurações necessárias para integrá-lo ao serviço "payables". </br>
Altero meu Docker Compose para gerar 3 imagens: RabbitMQ, Payable Microservice e API. </br>
Por fim, crio a rota "/payables/batch" para conseguir processar os arquivos através da fila </br>

</br>

![image](https://user-images.githubusercontent.com/90586912/222968233-92f7de4a-c8cd-4bfa-a8b4-01f16bc93527.png)
</br>

</br>

![image](https://user-images.githubusercontent.com/90586912/222992406-8db1b1e6-fb24-4f7d-a267-2e63dbbb5b46.png)
</br>

