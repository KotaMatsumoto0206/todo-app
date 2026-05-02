// 永続化層 (データ保管庫の役割)
const STORAGE_KEY = 'myTodoList';   // 'myTodoList'って箱を定数化

export const storage = {    // exportで他ファイル内で使えるようになる
    // 保存
    save(todos) {   // todos=入力されたもの
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));   // ラベルを付けてJson形式で保存
    },
    // 読み込み
    load() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }
};