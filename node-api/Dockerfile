# --- Build Phase

FROM node:alpine as builder

RUN chown -R root /opt
RUN chmod 755 /usr/local/bin/*

WORKDIR '/app'

COPY '.' '/app'

RUN npm ci && npm run build

# --- Run Phase

FROM node:alpine

RUN chown -R root /opt
RUN chmod 755 /usr/local/bin/*

WORKDIR '/app'

COPY --from=builder '/app/package*.json' '/app'
COPY --from=builder '/app/dist/' '/app/dist/'
COPY './.env.prod' '/app'

ENV NODE_ENV='production'

RUN npm ci

CMD ["npm", "run", "start:prod"]