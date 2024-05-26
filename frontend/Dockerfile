# Use a imagem oficial do Node.js como base
FROM node:20-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte do aplicativo para o diretório de trabalho
COPY . .

# Compile o aplicativo Next.js para produção
RUN npm run build

# Exponha a porta em que o aplicativo será executado
EXPOSE 3000

# Defina o comando para iniciar o aplicativo Next.js em modo de produção
CMD ["npm", "run", "start"]
