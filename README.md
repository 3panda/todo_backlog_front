# todo_backlog_front
このリポジトリはSimple TodoListのフロントエンド処理のリポジトリです　
バックエンド処理のリポジトリは[こちら](https://github.com/3panda/todo_backlog_back) になります

## Simple TodoList
- Simple TodoListはBacklog APIの技術検証のためのデモアプリです
- Simple TodoListはタスク管理を行うシンプルなTodoList
- Simple TodoListはWeb画面のTodoの内容をBacklogに記録します
- Backlogで追加された課題もWeb画面に反映されます※

※ Backlog APIのユーザーが担当者で且つ未対応の処理に限ります

## 前提条件
- TypeScript + Reactを使用
- モジュールバンドラはWebpackを使用
- 必要なモジュールはGitでは管理対象外のため個別でインストールが必要

### モジュールのインストール
```
## yarn
yarn install

## npm
npm install
```

## AjaxのURLについて

```
src/components/todo_list.tsx
```
上記で利用するAPIは下記の定数で指定します。

```
// 定数
namespace apiConst {
  export const GET_BACKLOG_DATA = '';
  export const ADD_BACKLOG_ISSUE = '';
  export const UPDATE_BACKLOG_ISSUE = '';
}
```
定数の値は空白になっています。

実際にはAmazon API GatewayでバックエンドのLambdaに紐づいたものを使用します。
以下は定数に対して呼び出すAPIの名前です

- GET_BACKLOG_DATA
add_backlog_issue

- ADD_BACKLOG_ISSUE
get_backlog_data

- UPDATE_BACKLOG_ISSUE
update_backlog_issue
