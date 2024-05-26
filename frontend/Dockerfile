FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN apk add --no-cache xdg-utils

EXPOSE 3001

ENTRYPOINT ["npm"]

CMD ["run", "dev"]
 