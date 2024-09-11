ARG NODE_VERSION=20.12.0

FROM node:${NODE_VERSION}-slim AS base

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base AS build

COPY package.json .

RUN yarn install --production=false

COPY . .
RUN chmod +x startup.sh
RUN yarn build

# Run
FROM base

COPY --from=build /src/startup.sh /src/startup.sh
COPY --from=build /src/.output /src/.output
COPY --from=build /src/package.json /src/package.json
COPY --from=build /src/.sequelizerc /src/.sequelizerc
COPY --from=build /src/node_modules /src/node_modules
COPY --from=build /src/config /src/config
COPY --from=build /src/server/migrations /src/server/migrations

ENTRYPOINT [ "./startup.sh" ]
