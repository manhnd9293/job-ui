FROM node:16-alpine as build
WORKDIR /app
COPY .  .
RUN yarn
RUN yarn build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

