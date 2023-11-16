FROM node:20.7.0-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY .env ./
COPY . .

RUN npm ci
RUN npx prisma generate
RUN npm run prisma:migrate

EXPOSE 3000

CMD ["npm", "start"]
