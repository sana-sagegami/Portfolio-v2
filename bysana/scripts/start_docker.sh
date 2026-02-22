#!/bin/bash
cd /home/sana/bysana

# 1. 古いコンテナを削除（エラーが出ても止まらないように || true をつける）
docker rm -f my-portfolio-container || true

# 2. 最新のコードでDockerイメージを再構築
docker build -t my-portfolio-image .

# 3. 不死身モードで新しいコンテナを起動
docker run -d --restart always -p 3000:3000 --name my-portfolio-container my-portfolio-image
