# ベースイメージ
FROM ubuntu:20.04

# 環境設定
ENV DEBIAN_FRONTEND=noninteractive

ENV QT_X11_NO_MITSHM=1
ENV QT_QPA_PLATFORM=xcb
ENV QT_QPA_PLATFORM=xcb

# localeワーニングを回避するために
ENV LANG=C.UTF-8

# デフォルトの環境変数を設定
ENV ENVIRONMENT_LEVEL=production

# ビルド時の引数を宣言
ARG ENVIRONMENT_LEVEL

# Python3.11をインストールし、PythonのデフォルトをPython3.11に設定
RUN apt-get update && \
    apt-get install -y \
    software-properties-common \
    curl \
    git \
    build-essential \
    --no-install-recommends && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y \
    python3.11 \
    python3.11-venv \
    python3.11-dev \
    python3-distutils \
    libx11-6 \
    libgl1-mesa-glx \
    nano \
    locales \
    --no-install-recommends && \
    update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# developerユーザーとグループの作成
RUN groupadd -g 1000 developer && \
    useradd -m -u 1000 -g developer -s /bin/bash developer

# sudoグループへの追加とパスワードなしでのsudo実行を許可
RUN apt-get update && apt-get install -y sudo && \
    usermod -aG sudo developer && \
    echo 'developer ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# developer ユーザーで作業
USER developer
WORKDIR /home/developer

# 環境変数として `POETRY_HOME` を設定（確実に適用させる）
ENV POETRY_HOME="/home/developer/.local"
ENV PATH="$POETRY_HOME/bin:$PATH"
ENV PATH="/workspace/.venv/bin:$PATH"

# Poetry のインストール
RUN curl -sSL https://install.python-poetry.org | python3 -

# Poetry のパスを環境変数に追加
ENV POETRY_HOME="/home/developer/.local"
ENV PATH="$POETRY_HOME/bin:$PATH"

# Poetry が正しくインストールされたか確認
RUN poetry --version

# Poetry のプラグインを追加
RUN poetry self add poetry-plugin-export

# Poetry用の設定（仮想環境をプロジェクト内に作成する）
RUN /home/developer/.local/bin/poetry config virtualenvs.in-project true

# 作業ディレクトリ設定
WORKDIR /workspace

# アプリケーションファイルをコピー
COPY . .

USER developer