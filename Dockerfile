# syntax=docker/dockerfile:1

# Image du site : pages statiques et serveur Node pour les formulaires.
FROM node:24-alpine AS base
ENV ASTRO_TELEMETRY_DISABLED=1
RUN npm install --global pnpm@10.33.0
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Adresse publique du site (URL canoniques, sitemap). Exemple : https://www.exemple.fr
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
RUN pnpm build

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM node:24-alpine AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:4321/robots.txt || exit 1
CMD ["node", "dist/server/entry.mjs"]
