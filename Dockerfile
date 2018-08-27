FROM node:alpine

ENV NODE_ENV production

RUN apk update && apk --no-cache add git libusb-dev bluez-dev\
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install -g node-gyp

WORKDIR /boat

COPY package.json /boat/package.json
#RUN npm install --no-optional

COPY . /boat

#RUN touch /usr/include/usb.h
#RUN cd scripts && gcc -o sixpair sixpair.c -lusb
#RUN cd sixad && make && make install && make clean

RUN ./node_modules/.bin/bower update --allow-root

CMD node index.js
