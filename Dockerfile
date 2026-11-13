# ポートフォリオ (Next.js) の本番イメージ
# 依存インストール → ビルド → 実行用の軽いイメージ、の3段階

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/posts ./posts
# root ではなく node ユーザーで動かす(記事の保存先 /data/posts は書き込めるようにしておく)
RUN mkdir -p /data/posts && chown -R node:node /data
USER node
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
