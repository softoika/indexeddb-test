# Chrome extensionでIndexedDBを使う実験
動くには動く。Manifest V3に移行するとバックグラウンドスクリプトのDevToolsから中身を見れなくなった。(ポップアップのDevToolsからは見れるので問題なし)<br>
バックグラウンド/ポップアップ共に同じデータベースを参照することができる。<br>
V2も同じだがIndexedDBを使うために`storage`パーミッションを追加する必要はない。
