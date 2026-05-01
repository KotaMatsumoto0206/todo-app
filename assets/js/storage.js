//localStorage とのやり取りだけを専門
const STORAGE_KEY = 'myTodoList';

export const storage = {
    // 保存
    save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },
    // 読み込み
    load() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }
};