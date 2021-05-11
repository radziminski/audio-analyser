FROM node:alpine as builder

RUN chown -R root /opt
RUN chmod 755 /usr/local/bin/*

WORKDIR '/app'

COPY package*.json .

RUN npm ci

COPY '.' '/app'

ENV NODE_ENV=production

RUN npm run build
COPY package*.json ./dist

CMD npm run serve
