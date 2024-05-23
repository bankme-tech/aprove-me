FROM node:20-alpine

# Cria o diretório
WORKDIR /app/backend

# Expôe a porta
EXPOSE 3333

# Instala as dependências
COPY package.json ./
RUN npm install

# Copia todos os arquivos
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Roda as migrações
RUN npx prisma migrate deploy

# Builda o app
RUN npm run build

# Roda a aplicação em modo de produção
CMD [ "npm", "run", "start:prod" ]