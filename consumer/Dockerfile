FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "start" ]