# NOTE: file created to be runned with `context: ../..` at the root folder.
FROM node:22-alpine as migration_target

COPY ./api-payable/ /builder-code/
# COPY ./api-payable/.prod.env /builder-code/.env
COPY ./infrastructure/staging-docker/.api.env /builder-code/.env

ARG NODE_ENV=prod

WORKDIR /builder-code
RUN yarn build
RUN yarn install
COPY ./api-payable/prisma ./prisma
RUN yarn prisma_generate
RUN yarn install --production


FROM node:22-alpine as production_target
WORKDIR /api-payable

# Copy the built files from the previous stage
COPY --from=migration_target /builder-code/dist ./dist
COPY --from=migration_target /builder-code/node_modules ./node_modules
COPY --from=migration_target /builder-code/package.json ./
COPY --from=migration_target /builder-code/yarn.lock ./
COPY --from=migration_target /builder-code/prisma ./
