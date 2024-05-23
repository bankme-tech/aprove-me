FROM node:22 AS builder

USER node

WORKDIR /home/node/app

COPY package.json ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]
