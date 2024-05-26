
FROM node:20-alpine AS builder
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 8080
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
