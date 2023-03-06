FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build payables

RUN npx prisma generate

CMD [ "node", "dist/payables/main.js" ]