# NewsBot

自分の興味・関心に合った「今知るべきニュース」をAIがピックアップし、毎朝メールで届けてくれるニュース配信Botです。

Yahoo!ニュースのRSSからニュースを取得し、Gemini APIを使って重要度や関連性をもとに記事を選定します。

GitHub Actionsを利用することで、毎朝決まった時間に自動実行できます。

## ご自由にお使いください！

このリポジトリをForkして、必要な設定を行うだけで利用できます。

## 使用技術

- Node.js
- TypeScript
- Yahoo!ニュース RSS
- Google Gemini API
- Resend
- GitHub Actions

## 使用方法

### 1. リポジトリをForkする

このリポジトリの右上にある `Fork` ボタンから、自分のGitHubアカウントにリポジトリをコピーしてください。

以降の設定は、Forkした自分のリポジトリで行います。

### 2. Gemini APIキーを取得する

ニュースの選定にGemini APIを使用します。

1. [Google AI Studio](https://aistudio.google.com/) にアクセス
2. Googleアカウントでログイン
3. APIキーを発行
4. 発行したAPIキーを控えておく

### 3. Resendに登録する

メールの送信にResendを使用します。

1. [Resend](https://resend.com/) にアクセス
2. アカウントを作成
3. API KeysからAPIキーを発行
4. Domainsから送信元ドメインを登録・認証

**注意：** Resendから任意のメールアドレスへ送信するには、送信元ドメインの認証が必要です。独自ドメインと、そのDNSレコードを編集できる環境を用意してください。

認証が完了したら、送信元として使用するメールアドレスを決めておきます。

### 4. GitHub Secretsを設定する

ForkしたリポジトリのGitHub画面から、以下の手順でSecretsを登録します。

1. `Settings` を開く
2. `Secrets and variables` → `Actions` を選択
3. `New repository secret` をクリック
4. 以下の4項目をそれぞれ登録

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | 取得したGemini APIキー |
| `RESEND_API_KEY` | 取得したResend APIキー |
| `FROM_EMAIL` | Resendで認証した送信元メールアドレス |
| `TO_EMAIL` | ニュースを受信したい自分のメールアドレス |

### 5. GitHub Actionsを実行する

必要な設定が完了したら、GitHubリポジトリの `Actions` タブを開きます。

1. `Daily News Bot` を選択
2. `Run workflow` から手動実行
3. 実行が成功し、メールが届くことを確認

正常に動作すれば設定完了です！

以降はGitHub Actionsによって毎朝自動実行されます。

## 環境変数一覧

| 環境変数 | 説明 |
|---|---|
| `GEMINI_API_KEY` | Gemini APIの認証キー |
| `RESEND_API_KEY` | Resend APIの認証キー |
| `FROM_EMAIL` | メールの送信元アドレス |
| `TO_EMAIL` | メールの送信先アドレス |

## 配信スケジュール

- 配信時刻：毎朝 9:00
- 実行環境：GitHub Actions
- タイムゾーン：Asia/Tokyo

## 注意事項

- APIキーなどの機密情報はGitHub Secretsに登録してください。
- APIキーをソースコードに直接記述したり、公開したりしないでください。
- Gemini APIやResendの利用には、それぞれのサービスの利用規約・利用制限が適用されます。
- GitHub Actionsの実行状況は、リポジトリの `Actions` タブから確認できます。
