import { storage } from './storage.js';
import { createTodoElement } from './dom.js';

const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

// 保存用関数（全リストをスキャンしてstorageに渡す）
function updateAndSave() {
    const todos = [];
    document.querySelectorAll('.todo-list li').forEach(li => {
        todos.push({
            text: li.querySelector('.todo-text').textContent,
            completed: li.querySelector('.todo-checkbox').checked
        });
    });
    storage.save(todos);
}

// 起動時の読み込み
document.addEventListener('DOMContentLoaded', () => {
    const savedTodos = storage.load();
    savedTodos.forEach(todo => {
        const item = createTodoElement(todo, handleToggle, handleDelete, handleEdit);
        todoList.appendChild(item);
    });
});

// 各種ハンドラー（dom.jsから呼ばれる）
function handleToggle(li, isChecked) {
    li.classList.toggle('completed', isChecked);
    updateAndSave();
}

function handleDelete(li) {
    li.remove();
    updateAndSave();
}

function handleEdit(li, span) {
    // ここに前回の編集ロジックを配置
    // 編集完了後に updateAndSave() を呼ぶ
}

// 新規追加
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    const item = createTodoElement({text, completed: false}, handleToggle, handleDelete, handleEdit);
    todoList.appendChild(item);
    updateAndSave();
    todoInput.value = "";
}

addButton.addEventListener('click', addTodo);