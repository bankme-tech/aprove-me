FROM node:20.11-alpine

WORKDIR /app-backend

COPY ./package*.json ./
RUN npm ci

COPY . .

COPY ./prisma ./prisma

RUN npx prisma migrate dev --name init --schema=./prisma/schema.prisma


EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD ["start"]