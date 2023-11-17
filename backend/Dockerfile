FROM node:alpine

ENV DATABASE_URL "file:./dev.db"

WORKDIR /app/backend

COPY . .

EXPOSE 3000

RUN npm install
RUN npm run build

CMD ["npm", "start"]