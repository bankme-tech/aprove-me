FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

COPY .env ./

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]