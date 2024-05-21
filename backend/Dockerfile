FROM node:20-alpine as base
ENV DATABASE_URL="file:./dev.db"

# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci \
    && npx prisma generate

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json package-lock.json ./
ADD prisma ./prisma/
RUN npm ci --omit=dev \
    && npx prisma generate

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npm run build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app
EXPOSE 3000
CMD ["node", "src/main"]
