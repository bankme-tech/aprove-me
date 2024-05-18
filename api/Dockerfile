FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Copy .env file into Docker image
COPY .env ./

RUN npm install

# Run Prisma migrations after installing dependencies
RUN npx prisma migrate deploy

COPY . .

RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]