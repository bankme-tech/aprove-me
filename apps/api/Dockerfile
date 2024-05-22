FROM node:20-slim AS base

RUN corepack enable
RUN corepack prepare pnpm@9.1.1 --activate

COPY . /app
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

ENV NODE_ENV="development"
ENV PORT=3000
ENV DATABASE_URL="file:./dev.db"
ENV JWT_SECRET="bankme"
ENV JWT_EXPIRES_IN="1m"

FROM base AS build
RUN pnpm install
RUN npx prisma generate
RUN pnpm build

WORKDIR /app/apps/api
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
