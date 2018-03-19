FROM node:alpine

WORKDIR /boat
COPY . /boat

ENV NODE_ENV production npm install -q --progress=false

RUN apk --no-cache add --virtual git native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install node-gyp -g &&\
  npm install && \
  apk del native-deps

RUN node index.js
