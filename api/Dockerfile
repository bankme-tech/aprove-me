# Base image
FROM node:20.11.1

# Create app directory
WORKDIR /src

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Prisma migrations
RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 8080

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]