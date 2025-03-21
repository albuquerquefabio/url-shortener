FROM node:20-slim as builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production=false --legacy-peer-deps --frozen-lockfile

COPY . . /app/

RUN yarn build:back

FROM node:20-slim

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production=true --legacy-peer-deps --frozen-lockfile

COPY --from=builder /app/apps/url-shortener/dist url-shortener/
# ENTRYPOINT [ "/bin/sh", "-c", "while true; do sleep 30; done;" ]

ENTRYPOINT ["node", "url-shortener"]
