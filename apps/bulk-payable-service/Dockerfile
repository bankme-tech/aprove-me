FROM node:20-slim AS base

RUN corepack enable
RUN corepack prepare pnpm@9.1.1 --activate

COPY . /app
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

ENV DATABASE_URL="file:./dev.db"
ENV REDIS_HOST="redis"
ENV REDIS_PORT=6379

FROM base AS build
RUN pnpm install
RUN npx prisma migrate dev
RUN pnpm build

WORKDIR /app/apps/bulk-payable-service
CMD [ "node", "dist/main.js" ]
