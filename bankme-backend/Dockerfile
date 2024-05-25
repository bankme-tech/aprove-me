FROM node:20-alpine

WORKDIR /app

ENV DATABASE_URL="file:./dev.db"

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY . .

RUN pnpm install

RUN npx prisma db push

EXPOSE 3001

EXPOSE 5555

CMD [ "pnpm", "run", "start" ]