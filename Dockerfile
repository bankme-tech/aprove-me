# Etapa de build
FROM node:18-alpine as builder
WORKDIR /opt/aprove-api

# Copia o código-fonte e instala as dependências
COPY . /opt/aprove-api
RUN npm ci

# Gera o cliente Prisma e faz a build do projeto
RUN npx prisma generate --schema=./src/infra/repository/schema.prisma
RUN npm run clean && npm run build

# Etapa final
FROM node:18-alpine

# Instala certificados
RUN apk --no-cache add ca-certificates

WORKDIR /opt/aprove-api

# Copia os arquivos da etapa de build e o arquivo .env
COPY --from=builder /opt/aprove-api .
COPY .env .env

# Instala dependências de produção e gera o cliente Prisma novamente
RUN npm ci --only=production
RUN npx prisma generate --schema=./src/infra/repository/schema.prisma

# Expõe a porta da aplicação
EXPOSE 3000

# Aplica as migrações do Prisma e inicia a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./src/infra/repository/schema.prisma && node ./dist/src/main.js"]
