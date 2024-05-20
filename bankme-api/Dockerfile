FROM node:18

WORKDIR /app

COPY . .

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn build

RUN npx prisma migrate deploy

RUN npx prisma generate

EXPOSE 3000

CMD [ "yarn", "start" ]
