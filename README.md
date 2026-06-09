# App-Todo

## 概要
JavaとReactを使用したフルスタックのTodoWebアプリです。
QAエンジニアとして働きながら、開発スキルを習得するために個人開発しました。
バックエンドはSpring BootでREST APIとして設計し、フロントエンドはReactで実装しました。
開発環境はDockerでコンテナ化しており、コマンド１つで起動ができます。
QAとして培ったテスト設計・品質管理の知識を開発に活かし、
Postmanを使ったAPIテストやバリデーション実装など、品質を意識した開発を心がけました。


## 技術選定の理由

### なぜReactを選んだか
JavaScriptのフレームワークの中でReactを選んだ理由は、**コンポーネントベースの設計**にあります。
UIを独立した部品として分割して管理できるため、変更の影響範囲を最小限に抑えられます。
QAエンジニアとして「変更による影響範囲の把握」を重視してきた経験から、
この設計思想が品質管理の観点とも一致していると感じ採用しました。
また、仮想DOMによる効率的なレンダリングの仕組みに技術的な興味を持ったことも選定理由の一つです。

### なぜDockerを選んだか
「自分のPCでは動くが他の環境では動かない」という問題を解消するために採用しました。
Dockerを使うことでアプリケーションの実行環境をコード化でき、
`docker-compose up`コマンド一つで誰でも同じ環境を再現できます。
QAとして環境差異によるバグに悩まされた経験から、
環境を統一することの重要性を実感しており、その解決策としてDockerを選びました。

## 使用技術
### バックエンド
- Java 21
- Spring Boot
- Spring Data JPA
- MySQL

### フロントエンド
- React
- Bootstrap

### インフラ
- Docker / docker-compose

### ツール
- Git / GitHub
- Postman

## 機能一覧
- タスクの登録・編集・削除
- タスク一覧表示
- 優先度設定（高・中・低）
- ステータス管理（未完了・完了）
- タスク検索（部分一致）
- バリデーション（タスク名必須）

## セットアップ方法
### 必要な環境
- Docker
- Docker Compose

### 起動手順
```
git clone https://github.com/Haruzer/App-Todo.git
cd App-Todo
./mvnw clean package -DskipTests
docker-compose up --build
```

### アクセス方法
- フロントエンド：http://localhost
- バックエンドAPI：http://localhost:8080/api/tasks

## APIエンドポイント
| メソッド | URL | 説明 |
| --- | --- | --- |
| GET | /api/tasks | タスク一覧取得 |
| GET | /api/tasks/{id} | タスク1件取得 |
| POST | /api/tasks | タスク登録 |
| PUT | /api/tasks/{id} | タスク更新 |
| DELETE | /api/tasks/{id} | タスク削除 |
| GET | /api/tasks?keyword={keyword} | タスク検索 |