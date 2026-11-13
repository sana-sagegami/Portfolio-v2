# ポートフォリオ (Next.js) の本番イメージ
# 依存インストール → ビルド → 実行用イメージ、の3段階 (pnpm は corepack で package.json の packageManager に合わせる)

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS run
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/posts ./posts
# root ではなく node ユーザーで動かす(記事の保存先 /data/posts は書き込めるようにしておく)
RUN mkdir -p /data/posts && chown -R node:node /data
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
