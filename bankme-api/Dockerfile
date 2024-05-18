FROM node:18

WORKDIR /app

COPY . .

COPY package.json yarn.lock ./

RUN yarn install

RUN npx prisma generate

RUN yarn build

RUN npx prisma migrate deploy

EXPOSE 3000

CMD [ "yarn", "start" ]
