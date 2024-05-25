FROM node:18.0.0-alpine3.15 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

RUN npm install @nestjs/cli@10.0.0

COPY . .

RUN npx prisma generate


RUN npm run build

FROM node:18.0.0-alpine3.15 AS runtime

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/.env ./

EXPOSE 8080

CMD ["npm", "run", "start:prod"]