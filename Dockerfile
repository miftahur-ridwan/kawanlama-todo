ARG NODE_VERSION=20.12.0

FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base AS build

COPY --link package.json .
RUN yarn install
RUN yarn cache clean

COPY --link . .

RUN yarn build

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
