FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json ./
# COPY prisma ./prisma/
# COPY .env ./

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . .

# RUN chown -R node:node .

COPY package.json ./
COPY .env ./
COPY prisma ./prisma/
COPY src ./src

COPY nest-cli.json ./nest-cli.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.json ./tsconfig.json

RUN npm install
RUN npm run prisma:build:prod
RUN npm run build
# RUN npm run prune --production

EXPOSE 3000
EXPOSE 5555

CMD [ "npm", "run", "start:prod" ]