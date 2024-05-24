FROM node:18

WORKDIR /app

RUN npm install --global yarn --force

COPY package*.json ./

RUN  yarn

COPY . .
RUN yarn prisma generate

RUN yarn prisma migrate

CMD [ "yarn", "start" ]

