FROM node:20.9

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]