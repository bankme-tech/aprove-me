FROM node:20-alpine

WORKDIR /app/frontend

EXPOSE 3000

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "dev"]