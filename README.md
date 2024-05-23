# AproveMe

## Description

AproveMe is a monorepo project using `pnpm` workspaces, consisting of a NestJS API and a React single-page application (SPA) frontend built with Vite.

## Requirements

- Node.js version >= 20
- pnpm package manager

## Installation

First, install all dependencies by running:

```sh
pnpm install
```

Next, apply Prisma migrations with the following command:

```sh
pnpm prisma:migrate
```

## Usage

### Running the API

1. Copy the contents of `.env.example` into a new `.env` file located in the root of `/apps/api`:

   ```sh
   cp apps/api/.env.example apps/api/.env
   ```

2. Start the API:

   ```sh
   pnpm start:api
   ```

### Running the Frontend

1. Copy the contents of `.env.example` into a new `.env` file located in the root of `/apps/aproveme`:

   ```sh
   cp apps/aproveme/.env.example apps/aproveme/.env
   ```

2. Start the frontend application:

   ```sh
   pnpm start:web
   ```

## Additional Notes

- Ensure that both the API and frontend are properly configured in their respective `.env` files.
- The project uses `pnpm` for package management, which can be installed globally via npm:

  ```sh
  npm install -g pnpm
  ```
