FROM node:20.13.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
RUN chmod +x ./init.sh
COPY prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:prod"]