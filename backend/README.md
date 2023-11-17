# Bankme

Welcome to the project to implement the receivables functionality for the Bankme customer! This project uses the NestJS framework to build the API and Prisma as an ORM to interact with the SQLite database.

<hr>

# ℹ️ About
The Bankme client, handling several receivables daily, requested a solution to automate the manual recording of this information. Receivables are digital representations of documents that simulate debts to be received. The basic structure includes information about the receivable and the assignor.

## 🛠 Structure of a Receivable
- id: string (UUID) - Identification of the receivable.
- value: float - Value of the receivable.
- emissionDate: date - Date of issue of the receivable.
- assignor: int - Identification of the assignor.

## 🛠 Structure of an Assignor
- document: string(30) - CPF or CNPJ of the transferor.
- email: string(140) - Email of the transferor.
- phone: string(20) - Transferor's phone number.
- name: string(140) - Name or company name of the transferor.

# 🌐 Technologies
<div align="rigth">
  <img align="center" alt="Ts" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img align="center" alt="Nest" src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img align="center" alt="nodejs" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img align="center" alt="Prisma" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  <img align="center" alt="Wa-Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img align="center" alt="SQLite" src="https://img.shields.io/badge/SQLite-316192?style=for-the-badge&logo=sqlite&logoColor=white">
</div> 

# ⚙️ How to Run

To run this application, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/natividadesusana/aprove-me.git
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```
   
3. Configure environment variables:
   - Make a copy of the `.env.example` file and configure the environment variable for development as `.env.development`.

4. Generate and apply migrations to the project:

       npx prisma migrate dev

5. Start the application:

        npm start
   

# 🖇 Testing

Run the command below to check the tests:

    npm run test
    

# 🐳 Docker

- Docker
- Docker Compose

Commands to run:

1. Create a Docker image:

        docker build -t backend .

2. Start the services defined in the "docker-compose.yml" file in Docker containers.

        docker-compose up
   
