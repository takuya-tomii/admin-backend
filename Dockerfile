FROM node:22.11.0-alpine3.20 AS base
ENV NODE_ENV=production
RUN apk update \
    && apk add --no-cache \
    tzdata \
    tini \
    && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && rm -rf /var/cache/apk/*

ENV TZ=Asia/Tokyo

RUN corepack disable && corepack enable

RUN mkdir /app \
    && chown -R node:node /app

WORKDIR /app
USER node
COPY --chown=node:node package*.json yarn*.lock .npmrc .yarnrc.yml ./
RUN yarn install && yarn cache clean


FROM base AS source
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./src ./src


FROM source AS local
EXPOSE 3010
ENV NODE_ENV=development
ENV CONFIG_ENV=local
ENV LISTEN_PORT=3010
ENV PATH=/app/node_modules/.bin:$PATH
RUN yarn install && yarn cache clean
ENTRYPOINT ["/sbin/tini", "-e", "143", "--"]
CMD ["nest", "start", "--watch"]


FROM source AS builder
ENV NODE_ENV=development
RUN yarn install && yarn cache clean && yarn build


FROM base AS deploy
EXPOSE 3010
COPY --from=builder /app/dist /app/dist
ENTRYPOINT ["/sbin/tini", "-e", "143", "--"]
CMD ["node", "dist/main"]
