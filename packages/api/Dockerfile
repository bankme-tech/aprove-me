FROM node:22 AS builder

USER node

WORKDIR /home/node/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn prisma generate

RUN yarn prisma migrate deploy

RUN yarn build

CMD [ "yarn", "start:prod" ]
