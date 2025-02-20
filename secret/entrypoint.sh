#!/bin/bash

# `.env` を読み込んで environment_level を取得
if [ -f /workspace/.env ]; then
    while IFS='=' read -r key value || [ -n "$key" ]; do
        if [[ ! "$key" =~ ^#.* ]] && [[ -n "$key" ]]; then
            # 不要な空白や改行を削除
            key=$(echo "$key" | tr -d '[:space:]')
            value=$(echo "$value" | tr -d '[:space:]')
            export "$key"="$value"
        fi
    done < /workspace/.env
else
    echo "Error: /workspace/.env file not found!"
    exit 1
fi

# デバッグ出力: 実際の environment_level の値を確認
echo "DEBUG: environment_level is '$ENVIRONMENT_LEVEL'"

# environment_level に応じて適切な `.env` を選択
if [ "$ENVIRONMENT_LEVEL" == "production" ]; then
    ENV_FILE="/workspace/secret/.env.prod"
    echo "Running in PRODUCTION mode"
elif [ "$ENVIRONMENT_LEVEL" == "development" ]; then
    ENV_FILE="/workspace/secret/.env.dev"
    echo "Running in DEVELOPMENT mode"
else
    echo "Error: Invalid environment_level value. Must be 'production' or 'development'."
    exit 1
fi

# 環境変数を適用（ファイルを1行ずつ読み込んでexport）
if [ -f "$ENV_FILE" ]; then
    while IFS='=' read -r key value || [ -n "$key" ]; do
        # 空行とコメント行をスキップ
        if [[ ! "$key" =~ ^#.* ]] && [[ -n "$key" ]]; then
            key=$(echo "$key" | tr -d '[:space:]')
            value=$(echo "$value" | tr -d '[:space:]')
            export "$key"="$value"
        fi
    done < "$ENV_FILE"
else
    echo "Error: $ENV_FILE file not found!"
    exit 1
fi

# 環境変数の適用結果をデバッグ出力
echo "===== ENVIRONMENT VARIABLES ====="
env | grep -E "APP_ENV|DB_HOST|DB_USER|DB_PASSWORD|environment_level"
echo "================================="

# 環境変数設定確認スクリプトの実行
bash /workspace/secret/env_settings_test.sh

# シェルを起動してコンテナを保持
exec /bin/bash
