FROM node:16

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
