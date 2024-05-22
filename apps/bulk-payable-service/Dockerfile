FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN corepack prepare pnpm@9.1.1 --activate

COPY . /app
WORKDIR /app

ENV DATABASE_URL="file:./dev.db"

FROM base AS build
RUN pnpm install
RUN npx prisma migrate dev

ENV NODE_ENV=production

RUN pnpm build

ENV REDIS_HOST="redis"
ENV REDIS_PORT=6379

WORKDIR /app/apps/bulk-payable-service
CMD [ "node", "dist/main.js" ]
