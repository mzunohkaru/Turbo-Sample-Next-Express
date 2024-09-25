FROM node:20.12.1-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV $NODE_ENV
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install turbo --global
RUN turbo prune server --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --no-frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build --filter=server

FROM base AS development
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --from=installer --chown=node:node /app .
RUN pnpm install --no-frozen-lockfile
CMD [ "pnpm", "turbo", "dev", "--filter", "server" ]

FROM base AS production
ENV DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydb?schema=public"
WORKDIR /app
RUN apk --no-cache add curl
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server
COPY --from=installer --chown=server:nodejs /app/apps/server/dist .
COPY --from=installer --chown=server:nodejs /app/packages/database/src/generated/client/ /app/src/generated/client/
COPY --from=installer --chown=server:nodejs /app/packages/database/src/generated/client/ .prisma/client
# Not required for infrastructure Dockerfile
CMD [ "node", "index.js" ]
