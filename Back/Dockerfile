FROM node:20-alpine
WORKDIR /usr/src
COPY package.json package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
RUN npm run prisma:migrate
RUN npm run build
EXPOSE 8000
CMD ["node", "dist/main.js"]