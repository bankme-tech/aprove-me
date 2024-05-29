FROM node:21.1.0-alpine as builder

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install && yarn build

FROM node:21.1.0-alpine

WORKDIR /app

RUN apk add --no-cache

COPY --from=builder /app/package*.json ./

RUN yarn cache clean && yarn install --prod

COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD [ "yarn", "start" ]