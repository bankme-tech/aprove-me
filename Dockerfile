FROM node:20.13.1-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY prisma/migrations/ prisma/migrations/
COPY prisma/schema.prisma prisma/schema.prisma
COPY src/ src/
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npx prisma generate
RUN npm run build
RUN npx prisma migrate deploy

###

FROM node:20.13.1-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json .
RUN npm ci --omit=dev

COPY prisma/ prisma/
RUN npx prisma generate

COPY --from=builder /app/dist/ dist/

EXPOSE 3000

CMD npm run start:prod
