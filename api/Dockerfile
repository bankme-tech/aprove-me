FROM node:18

WORKDIR /app

RUN npm install --global yarn --force

COPY package*.json ./

RUN  yarn

COPY . .

CMD [ "yarn", "start" ]