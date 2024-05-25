FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["npm", "run", "start:dev" ]