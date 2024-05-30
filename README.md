<p align="center">
  <img src="./assets/logo-bankme.png" alt="Logo Bankme" width="91" height="108" />
</p>
<h1 align="center">
  Aprove-me
</h1>

# Receivable Management API

This project implements a comprehensive Receivable Management System using NestJS, Prisma, and a PostgreSQL database. It includes features for validation, persistence, authentication, permission management, batch processing, resilience, cloud deployment, and infrastructure as code. Additionally, a front-end interface is provided to interact with the API.

## Features

### API Features

- [x] **Validation**
  - Implemented a POST `/integrations/payable` endpoint to receive and validate receivable and assignor data.
  - Ensured no fields are null, IDs are UUIDs, and strings do not exceed defined lengths.
  - Returns validation errors if any data is incorrect.

- [x] **Persistence**
  - Utilized Prisma to include a SQLite database.
  - Created necessary database structures.
  - Implemented CRUD operations for receivables and assignors.

- [x] **Authentication**
  - Implemented POST `/integrations/auth` to authenticate users and generate JWT tokens.
  - Applied JWT authentication to all other routes.

- [x] **Permission Management**
  - Created a permission management system with login and password storage.
  - Refactored authentication to validate against stored credentials.

- [x] **Docker and Documentation**
  - Created a `Dockerfile` and `docker-compose.yaml` for the API.
  - Documented the setup process, including environment preparation, dependency installation, and running the project.

- [x] **Batch Processing**
  - Added POST `/integrations/payable/batch` to handle large batches of receivables asynchronously.
  - Implemented queue processing for batch items.

- [x] **Resilience**
  - Implemented retry logic for failed batch items.
  - Moved unprocessable items to a dead-letter queue and sent notification emails.

- [x] **Cloud Deployment**
  - Created a deployment pipeline for deploying the application to a cloud provider (DigitalOcean).

- [x] **Infrastructure as Code**
  - Used Terraform to define the desired infrastructure.

- [x] **Testing**
  - Created tests for the backend application (Payable service).

### Front-End Features

- [x] **Registration**
  - Created an interface for registering receivables.
  - Validated inputs to prevent empty or invalid fields.

- [x] **API Connection**
  - Connected the front-end to the API.
  - Implemented registration of receivables and assignors through the front-end.

- [x] **Listing**
  - Created a system to list receivables with details, edit, and delete options.
  - Displayed assignor details linked from receivables.

- [x] **Authentication**
  - Implemented login and password authentication for accessing routes.
  - Stored JWT tokens in localStorage and handled token expiration.

- [] **Testing**
  - Created tests for the front-end application.

## Setup and Installation

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Environment Setup

- Run the project:
    ```bash
    docker-compose up -d
    ```

### Testing

- Run unit tests:
    ```bash
    yarn test
    ```

### About
**Backend port `8080`
Frontend port `3000`**