FROM node:20-alpine


WORKDIR /app/frontend
COPY package.json package-lock.json ./

RUN npm cache clean --force && npm install
COPY . .


EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
