FROM node:20-slim AS base

RUN corepack enable
RUN corepack prepare pnpm@9.1.1 --activate

COPY . /app
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

FROM base AS build
RUN pnpm install
RUN npx prisma generate
RUN pnpm build

WORKDIR /app/apps/bulk-payable-service
CMD [ "node", "dist/main.js" ]
