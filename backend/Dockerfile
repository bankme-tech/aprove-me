FROM node:20.11-alpine

WORKDIR /app-backend

COPY ./package*.json ./
RUN npm ci

COPY . .


RUN npx prisma generate


EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD ["start"]