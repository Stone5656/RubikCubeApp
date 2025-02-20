#!/bin/bash

set -e  # エラーが出たら即停止

# `make install` を実行（必要な環境構築）
echo "Running make install..."
export PATH="/usr/bin:$PATH"
python --version || echo "Python command not found!"

make install

source $(poetry env info --path)/bin/activate

# `entrypoint.sh` を実行（もともとの処理）
echo "Running entrypoint script..."
./secret/entrypoint.sh

echo "Post-create setup completed!"
