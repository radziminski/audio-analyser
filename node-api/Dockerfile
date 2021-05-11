FROM node:alpine as builder

RUN chown -R root /opt
RUN chmod 755 /usr/local/bin/*

WORKDIR '/app'

COPY 'package.json' '/app'
COPY 'package-lock.json' '/app'

RUN npm ci

COPY '.' '/app'

ENV NODE_ENV=production

RUN npm run build

RUN mkdir '/app/deploy'
RUN mkdir '/app/deploy/dist'

COPY 'package.json' '/app/deploy'
COPY 'package-lock.json' '/app/deploy'
RUN cp -r '/app/dist' '/app/deploy/dist'
RUN ls '/app/deploy'
RUN ls '/app/deploy/dist'

CMD npm run serve
