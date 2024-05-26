FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

COPY .env .env

RUN echo "Conteúdo do .env:" && cat .env

RUN npx prisma generate
RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
