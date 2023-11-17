FROM node:20.9

WORKDIR /api

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npx prisma generate
RUN npm run prisma:migrate

USER node
