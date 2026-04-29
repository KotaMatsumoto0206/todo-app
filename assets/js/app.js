"use strict";

// DOMの取得
const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

// 作成と組み立て 工場役
function createTodoElement(text) {
    // リスト(li)を作成し、定義
    const li = document.createElement('li');
    
    const span = document.createElement('span')   //文字専用の入れ物spanを入れる
    span.textContent = text;
    span.className = 'todo-text';   //CSSようのタグづけ

    // deleteボタンを作成して定義
    const deleteButton = document.createElement('button');
    // deleteButtonをHTMLでxを表現
    deleteButton.innerHTML = '&times;';
    // CSS用のタグ
    deleteButton.className = 'delete-button';
    // アクセシビリティ　読み上げ
    deleteButton.setAttribute('aria-label', '削除');

    li.addEventListener('click', () => {   //クリックされたらトグルのオンオフ
        li.classList.toggle('completed');
    }); 

    // 削除イベント
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        li.remove();
    });

    // 削除ボタンとliを合体
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    return li;
}

// 実行　監督役
function addTodo() {
    // htmlの<input type="text" id="todo-input">の.value(入力された文字)をtrim()空白削除をする
    const taskText = todoInput.value.trim();
    // 空白のみなら終了
    if (!taskText) return;

    // createTodoElementからのtaskTextを入れる
    const todoItem = createTodoElement(taskText);
    // TodoItemとtodoListを合体
    todoList.appendChild(todoItem);

    // 入力欄を空に
    todoInput.value = "";
    // 入力がすぐに進められるようカーソルを準備
    todoInput.focus(); 
}

// イベント設定
// クリックされたらaddTod
addButton.addEventListener('click', addTodo);
// Enterキーでも
todoInput.addEventListener('keydown', (e) => {
    // 1. 漢字変換中（未確定）なら、ここで処理を終了してaddTodoを実行させない
    if (e.isComposing || e.keyCode === 229) {
        return;
    }

    // 2. 確定した状態でEnterが押されたときだけaddTodoを呼ぶ
    if (e.key === 'Enter') {
        addTodo();
    }
});