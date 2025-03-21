FROM node:20-slim as builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production=false --legacy-peer-deps --frozen-lockfile

COPY . .

RUN yarn build:front

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/apps/client /usr/share/nginx/html

RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
