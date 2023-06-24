
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install

COPY . .

RUN npm test

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]