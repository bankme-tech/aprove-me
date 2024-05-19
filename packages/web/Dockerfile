FROM node:22

USER node

WORKDIR /home/node/app

COPY package.json .

RUN yarn

COPY . .

CMD ["yarn", "dev"]
