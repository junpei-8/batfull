# SSH Key を用意
echo "$GITHUB_SSH_KEY" > ~/.ssh/github_rsa
chmod 600 ~/.ssh/github_rsa

# SSH 設定
ssh_config="
Host github.com
	AddKeysToAgent yes
	IdentityFile ~/.ssh/github_rsa
"

# 重複した SSH 設定が存在しなければ追記
if ! grep -q "$ssh_config" ~/.ssh/config; then
	echo "$ssh_config" >> ~/.ssh/config
fi

# SSH 接続設定
ssh-keyscan github.com > ~/.ssh/known_hosts

# SSH 接続設定の重複削除
sort -u ~/.ssh/known_hosts -o ~/.ssh/known_hosts

# Application ディレクトリを作成
mkdir -p $APP_DIR

# Git の設定
if [ -d "$APP_DIR/.git" ]; then
	# 作業先へ移動
	cd $APP_DIR
	git checkout $GITHUB_BRANCH_NAME

	# 最新の状態を取り込み上書き
	git fetch origin $GITHUB_BRANCH_NAME
	sudo git reset --hard origin/$GITHUB_BRANCH_NAME

else
	# Git リポジトリをクローン
	git clone git@github.com:$GITHUB_REPOSITORY_NAME.git $APP_DIR

	# 作業先へ移動
	cd $APP_DIR
	git checkout $GITHUB_BRANCH_NAME

fi

# 環境変数ファイルの生成
echo "$APP_ENV" > .env

# Docker Compose の実行
docker compose --env-file .env down
docker compose --env-file .env build
docker compose --env-file .env up -d
