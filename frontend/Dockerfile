FROM node:20-alpine

# Create app directory
WORKDIR /app/frontend

EXPOSE 3000

# Install app dependencies
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Build app
RUN npm run build

# Start app
CMD ["npm", "start"]
