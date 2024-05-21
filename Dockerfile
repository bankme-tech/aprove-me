FROM node:20.13.1 as base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN npm install -g concurrently
RUN pnpm install

FROM base as build-server

WORKDIR /app/server
COPY server/package.json .
COPY server/tsconfig.json .
COPY server/nest-cli.json .
COPY server/src ./src
RUN pnpm --filter server run build

FROM base as build-web

WORKDIR /app/web
COPY web/package.json .
COPY web/tsconfig.json .
COPY web/next.config.js .
COPY web/pages ./pages
COPY web/public ./public
RUN pnpm --filter web run build

FROM node:20.13.1 as final

WORKDIR /app

COPY --from=build-server /app/server/package.json ./server/package.json
COPY --from=build-server /app/server/dist ./server/dist

COPY --from=build-web /app/web/package.json ./web/package.json
COPY --from=build-web /app/web/.next ./web/.next
COPY --from=build-web /app/web/public ./web/public

RUN pnpm --filter server install --prod
RUN pnpm --filter web install --prod

EXPOSE 3000 3003

CMD ["concurrently", "\"node server/dist/main\"", "\"next start web -p 3000\""]