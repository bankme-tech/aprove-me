FROM node:20-alpine

# Create app directory
WORKDIR /app/backend

# Expose port
EXPOSE 3000

# Install app dependencies
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Run migrations
RUN npx prisma migrate deploy

# Build App
RUN npm run build

# Start app
CMD [ "npm", "run", "start:prod" ]
