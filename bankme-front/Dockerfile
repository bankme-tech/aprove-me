# Use a imagem oficial do Node.js como base
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o projeto Next.js para produção
RUN npm run build

# Segunda etapa para um contêiner mais leve
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para rodar a aplicação
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instala as dependências de produção
RUN npm install --only=production

# Exponde a porta que a aplicação Next.js irá rodar
EXPOSE 8000

# Define o comando padrão para iniciar a aplicação de produção na porta 8000
CMD ["npm", "start"]
