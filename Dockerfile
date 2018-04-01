FROM node:alpine

WORKDIR /boat
COPY . /boat

ENV NODE_ENV production

RUN apk update && apk --no-cache add --virtual git native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install -g node-gyp && \
  npm install && \
  apk del build

RUN node index.js
