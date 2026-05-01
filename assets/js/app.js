"use strict";

// DOMの取得
const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

// 起動時、保存データが有れば読み込み
document.addEventListener('DOMContentLoaded', () => {
    const savedTodos = JSON.parse(localStorage.getItem('myTodoList')) || [];
    savedTodos.forEach(todo => {
        const todoItem = createTodoElement(todo.text);
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        todoList.appendChild(todoItem);
    });
});

// 保存場所の作成
function saveToLocalStorage() {
    const todos = [];   // 空の箱を作成
    document.querySelectorAll('.todo-list li').forEach(li => {   // todolisyからforEachでひとつずつ抽出
        todos.push({
            text: li.querySelector('.todo-text').textContent,   // liタグのtextを読み取り
            completed: li.classList.contains('completed')  //.contains('completed')はカッコの中のタグが付与されてたら付与されている返り値を発信
        });
    });
    localStorage.setItem('myTodoList', JSON.stringify(todos));   // JSON形式にして保存
}

// 作成と組み立て 工場役
function createTodoElement(text) {
    const li = document.createElement('li');   // リスト(li)を作成し、定義
    
    const span = document.createElement('span')   //文字専用の入れ物spanを作る
    span.textContent = text;
    span.className = 'todo-text';   //CSSようのタグづけ

    // span（テキスト部分）にダブルクリックイベントを追加
span.addEventListener('dblclick', () => {
    const currentText = span.textContent;
    const editInput = document.createElement('input');
    editInput.value = currentText;
    
    // spanをinputに一時的に置き換え
    li.replaceChild(editInput, span);
    editInput.focus();

    // フォーカスが外れたとき、またはEnterを押したときに確定
    const updateTask = () => {
        span.textContent = editInput.value.trim() || currentText;
        li.replaceChild(span, editInput);
        saveToLocalStorage();
    };

    editInput.addEventListener('blur', updateTask);
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') updateTask();
    });
});

    const deleteButton = document.createElement('button');   // deleteボタンを作成して定義
    deleteButton.innerHTML = '&times;';   // deleteButtonをHTMLでxを表現
    deleteButton.className = 'delete-button';   // CSS用のタグ
    deleteButton.setAttribute('aria-label', '削除');    // アクセシビリティ　読み上げ

    li.addEventListener('click', () => {   //クリックされたらトグルのオンオフ
        li.classList.toggle('completed');
        saveToLocalStorage();   //保存
    }); 

    // 削除イベント
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        li.remove();
        saveToLocalStorage(); // 削除したら保存
    });

    // 削除ボタンとliを合体
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    return li;
}

// 実行　監督役
function addTodo() {
    const taskText = todoInput.value.trim();   // htmlの<input type="text" id="todo-input">の.value(入力された文字)をtrim()空白削除をする
    if (!taskText) return;  // 空白のみなら終了

    const todoItem = createTodoElement(taskText);   // createTodoElementからのtaskTextを入れる
    todoList.appendChild(todoItem);     // TodoItemとtodoListを合体

    saveToLocalStorage(); // 追加したら保存

    todoInput.value = "";   // 入力欄を空に
    todoInput.focus();  // 入力がすぐに進められるようカーソルを準備
}

// イベント設定
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') addTodo();
});