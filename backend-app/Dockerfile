FROM node:20-alpine

# Cria o diretório
WORKDIR /app/backend

# Expôe a porta
EXPOSE 3001

# Instala as dependências
COPY package.json ./
RUN npm install

# Copia todos os arquivos
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Roda as migrações
RUN npx prisma migrate deploy

# Roda a aplicação
CMD [ "npm", "start"]