FROM node:12.13-alpine as builder 

ADD repo /srv/repo

WORKDIR /srv/repo

RUN apk --update --no-cache -q upgrade && \
    rm -rf .git && \
    sed -i 's/function //g' build.sh && \
    sed -i 's/ensure_success {/ensure_success() {/g' build.sh && \
    sh build.sh

FROM node:12.13-alpine

COPY --from=builder /srv/repo /srv/repo

ENV PORT not_defined
ENV SERVICE_NAME not_defined
ENV DEPLOY_ENV not_defined

RUN apk --update --no-cache -q upgrade && \
    apk --update --no-cache -q add tini && \
    chown -R node /srv/repo

USER node

WORKDIR /srv/repo/

ENTRYPOINT ["/sbin/tini", "--", "/bin/sh", "deployment/entrypoint.sh"]

CMD ["node", "index.js", "--host", "0.0.0.0"]
