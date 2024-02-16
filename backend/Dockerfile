FROM node:20-alpine AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

ENV PORT=3000
ENV PORT=$PORT
ENV JWT_SECRET_KEY=SECRET
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV JWT_EXPIRATION_TIME=60000

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm dlx prisma generate
RUN pnpm build

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist/
COPY --from=build /app/node_modules ./node_modules
EXPOSE $PORT
CMD [ "node" , "dist/main.js" ]
