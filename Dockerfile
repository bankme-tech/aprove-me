FROM node:21

RUN npm install -g pnpm
WORKDIR /usr/src/app

COPY backend .

RUN pnpm install
RUN pnpm dlx prisma generate
RUN pnpm dlx prisma db push
RUN pnpm build 

CMD ["pnpm", "start:prod"]
