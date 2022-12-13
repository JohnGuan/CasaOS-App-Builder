ARG NODE_IMAGE_VERSION="18-alpine"
ARG GO_IMAGE_VERSION="1.17"

# Install dependencies only when needed
FROM node:${NODE_IMAGE_VERSION} AS node_deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Prepare Yarn2 in docker-node
RUN \
  mkdir -p /usr/local/sbin && \
  ln -s /usr/local/bin/node /usr/local/sbin/node && \
  corepack enable && \
  corepack prepare yarn@stable --activate

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock .yarnrc.yml ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi



# Rebuild the source code only when needed
FROM node:${NODE_IMAGE_VERSION} AS node_builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Prepare Yarn2 in docker-node
RUN \
  mkdir -p /usr/local/sbin && \
  ln -s /usr/local/bin/node /usr/local/sbin/node && \
  corepack enable && \
  corepack prepare yarn@stable --activate

WORKDIR /app
COPY --from=node_deps /app/.yarn ./.yarn
COPY --from=node_deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build


FROM golang:${GO_IMAGE_VERSION} as go_builder

WORKDIR /app

COPY CasaOS-API .
# CGO_ENABLED=0 Don't forget, it will not work after the build because of the dependency library problem
RUN CGO_ENABLED=0 go build -v -o /go/bin/casaos-api
COPY CasaOS-API/templates/ /go/bin/templates/



# Production image, copy all the files and run next
FROM node:${NODE_IMAGE_VERSION} AS runner
USER root
# Install latest zerotier-one
RUN apk add --no-cache ca-certificates mariadb mariadb-client mariadb-server-utils pwgen && \
    rm -f /var/cache/apk/*
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=node_builder /app/public ./public
COPY --from=node_builder /app/.next/standalone ./
COPY --from=node_builder /app/.next/static ./.next/static

COPY --from=go_builder /go/bin/casaos-api /go/bin/casaos-api
COPY --from=go_builder /go/bin/templates/ /templates/

COPY scripts/ /scripts/
RUN mkdir /docker-entrypoint-initdb.d && \
    mkdir /scripts/pre-exec.d && \
    mkdir /scripts/pre-init.d && \
    chmod -R 755 /scripts

COPY CasaOS-API/sql/ /sql/

EXPOSE 3000
ENV PORT 3000

VOLUME ["/var/lib/mysql"]

CMD []
ENTRYPOINT ["/scripts/entrypoint.sh"]