# App-Todo

## 概要
Java(Spring Boot)とReactを使用して構築したフルスタックのTodoWebアプリケーションです。
QAエンジニアとして培ってきた「テスト設計・品質管理」の知見を開発プロセスの初期段階から組み込むことを目指し、個人開発を行いました。
バックエンドでREST APIとして設計し、開発環境はDockerを用いて完全にコンテナ化をしています。
Postmanを用いたAPIテストや適切なバリデーション実装を通じ、「バグを生みにくい設計」を意識しました。

## 技術選定の理由

### なぜReactを選んだか
画面を「パーツごとに小分けにして作る仕組み」が、品質管理の視点にぴったりだと思ったからです。
Reactはボタンや入力フォームなどを独立した部品として作れるため、「どこか1つを修正したときに、他の場所にバグが広がるリスク」を最小限に抑えられます。
日頃のQA業務でも、システムの修正によって別の場所に不具合が出る『デグレ』の確認を一番重視しているので、この「バグの影響を抑えられる設計」が素晴らしいと感じて採用しました。


### なぜDockerを選んだか
「自分のPCでは動くのに、他の人のPCでは動かない」という問題を無くしたかったから」です。
Dockerを使うことで、コマンド1つで誰のPCでも、全く同じデータベースや実行環境を再現できるようになります。
実務のQAでも、「開発環境とテスト環境のわずかな違い」のせいで起きるバグ調査にとても苦労した経験がありました。
開発をスムーズに進めるためには、まず環境を完全に統一することが基本だと考え、導入しました。

## 使用技術
- **バックエンド**: Java 21, Spring Boot, Spring Data JPA, MySQL 8.4
- **フロントエンド**: React, Bootstrap
- **インフラ**: Docker, Docker Compose
- **ツール**: Git, GitHub, Postman

## 機能一覧
- タスクの登録・編集・削除
- タスク一覧表示
- 優先度設定（高・中・低）
- ステータス管理（未完了・完了）
- タスク検索（部分一致）
- バリデーション（タスク名必須）

## ローカル起動手順

**必須環境:** Docker, Docker Compose

```bash
# 1. リポジトリのクローン
git clone https://github.com/Haruzer/App-Todo.git
cd App-Todo

# 2. バックエンドのビルド
./mvnw clean package -DskipTests

# 3. コンテナのビルドと起動
docker-compose up --build


### アクセス方法
- フロントエンド：http://localhost
- バックエンドAPI：http://localhost:8080/api/tasks


## APIエンドポイント
| メソッド | URL | 説明 |
|---|---|---|
| GET | /api/tasks | タスク一覧取得 |
| GET | /api/tasks/{id} | タスク1件取得 |
| POST | /api/tasks | タスク登録 |
| PUT | /api/tasks/{id} | タスク更新 |
| DELETE | /api/tasks/{id} | タスク削除 |
| GET | /api/tasks?keyword={keyword} | タスク検索 |
