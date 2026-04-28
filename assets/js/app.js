"use strict";

// DOMの取得
const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

// addButtonに('click', addTodo　クリックされたらaddTodoを参照する)をaddEventListenerで組み込む
addButton.addEventListener('click', addTodo);

// eがEnterキーを受け取りtureならaddTodo起動
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// addTodoという処理内容を決める箱を作る
function addTodo() {
    // 入力欄から読み込む
    const taskText = todoInput.value;

    // ガード句　空白なら追加しない
    if (taskText === "") return;

    // 新しい空のliを生み出す
    // li.textContentにtaskText(読み込んだもの)を入れる
    const li = document.createElement('li');
    li.textContent = taskText;

    // TodoListにliを.appendChildで押し上げる
    todoList.appendChild(li);

    // todoInput入力欄の.value中身を""空白にする　タスク追加後に入力欄を空白にするため
    todoInput.value = "";

}