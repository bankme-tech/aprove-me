FROM node:20-alpine AS base

RUN corepack enable && \
    addgroup --system --gid 1001 server && \
    adduser --system --uid 1001 server
WORKDIR /app
COPY pnpm-workspace.yaml pnpm-lock.yaml ./

ENV DATABASE_URL "file:./dev.db"

# Server Production dependencies stage
FROM base AS server-prod
COPY ./apps/server/package.json ./apps/server/package.json
COPY ./apps/server/prisma ./apps/server/prisma/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter "@aprove-me/server" --prod && \
    pnpm --filter server exec pnpm dlx prisma generate

# Server Builder stage
FROM base AS server-builder
COPY ./apps/server ./apps/server
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter "@aprove-me/server" && \
    pnpm --filter server exec pnpm dlx prisma generate && \
    pnpm --filter server exec pnpm dlx prisma migrate deploy && \
    pnpm -r build

# Server Production stage
FROM base AS server
COPY --from=server-builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=server-builder /app/apps/server/tsconfig.json ./apps/server/tsconfig.json
COPY --from=server-builder /app/apps/server/dist ./apps/server/dist
COPY --from=server-builder /app/apps/server/prisma ./apps/server/prisma
COPY --from=server-prod /app/apps/server/node_modules ./apps/server/node_modules
COPY --from=server-prod /app/node_modules ./node_modules

RUN 

CMD ["pnpm", "--filter", "@aprove-me/server", "start:prod" ]