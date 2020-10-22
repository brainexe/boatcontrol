FROM node:12

ENV NODE_ENV production

RUN apt update && apt -y install git libusb-dev libusb-1.0-0-dev libbluetooth-dev\
  g++ gcc make python && \
  npm install -g node-gyp

WORKDIR /boat

COPY . /boat

RUN npm install --no-optional
RUN npm script webpack

RUN cd scripts && gcc -o sixpair sixpair.c -lusb
RUN cd sixad && make && make install && make clean

CMD node index.js
