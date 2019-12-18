FROM node:13.3.0-slim AS builder

WORKDIR /app/
RUN chown -R node /app/ && mkdir /build && chown -R node /build/

USER node
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY ./ ./
RUN yarn build

FROM node:13.3.0-slim
COPY --from=builder --chown=node /app/build /build
WORKDIR /build
RUN yarn global add serve
CMD [ "serve", "-s", "./", "-l", "5000" ]
EXPOSE 5000

