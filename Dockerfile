FROM node:alpine

ENV NODE_ENV production

RUN apk update && apk --no-cache add --virtual git native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install -g node-gyp

WORKDIR /boat

COPY package.json /boat/package.json
#RUN npm install --no-optional

COPY . /boat

#RUN  apk del build

CMD node index.js
