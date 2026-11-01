#!/bin/bash
cd /home/sana/bysana

# 1. 古いコンテナを削除（エラーが出ても止まらないように || true をつける）
docker rm -f my-portfolio-container || true

# 2. 最新のコードでDockerイメージを再構築
docker build -t my-portfolio-image .

# 3. 不死身モードで新しいコンテナを起動
# 記事の保存先(永続化)と管理者パスワードの設定ファイル
# サーバー上に /home/sana/portfolio-data/.env を作り、ADMIN_PASSWORD=... / ADMIN_PATH=推測されにくい文字列 / SESSION_SECRET=... を書いておく
mkdir -p /home/sana/portfolio-data/posts
docker run -d --restart always -p 3000:3000 \
  -v /home/sana/portfolio-data/posts:/data/posts \
  -e POSTS_DIR=/data/posts \
  --env-file /home/sana/portfolio-data/.env \
  --name my-portfolio-container my-portfolio-image
