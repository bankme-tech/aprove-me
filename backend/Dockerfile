# Use a imagem do Node.js como base
FROM node:20-alpine AS builder

# Defina a pasta de trabalho dentro do container
WORKDIR /app/backend

# Copie apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instale as dependências do aplicativo
RUN npm ci --only=production

# Instale o Nest CLI globalmente
RUN npm install -g @nestjs/cli

# Copie todo o código-fonte do aplicativo
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Execute as migrações do Prisma
RUN npx prisma migrate deploy

# Compile o aplicativo (se houver um script de construção no package.json)
RUN npm run build

# Segunda etapa para construir a imagem final
FROM node:20-alpine

# Defina a pasta de trabalho
WORKDIR /app/backend

# Copie apenas os arquivos necessários, incluindo o diretório 'node_modules', da etapa anterior
COPY --from=builder /app/backend .



# Exponha a porta 8080
EXPOSE 8080

# Defina o comando para iniciar o aplicativo em modo de produção
CMD [ "npm", "run", "start:prod" ]
