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
3.1- Adicionando o Service do Prisma no Auth Module como um provider para o Service do Auth conseguir utilizar o Prisma.
</br>
![image](https://user-images.githubusercontent.com/90586912/221436166-82ead0bd-f20f-49cc-91fe-ac2db6e85ec3.png)
</br>
![image](https://user-images.githubusercontent.com/90586912/221436501-f90a74cf-4797-402b-b819-9621d5f305d8.png)
</br>
4- Criando função para validar se o usuário já está cadastrado </br>
5- Criptografando a senha com CryptoJS </br>
![image](https://user-images.githubusercontent.com/90586912/221438054-ed9a7894-a15c-479f-b4f2-1d66cb6cc493.png) </br>
</br>
6- Adicionar validação através do Token JWT </br>










