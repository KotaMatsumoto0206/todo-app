import { storage } from './storage.js';
import { createTodoElement } from './dom.js';

const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

// 保存用関数
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
        const item = createTodoElement(todo, {
            onToggle: handleToggle,
            onDelete: handleDelete,
            onEdit: handleEdit,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
            onDrop: handleDrop
        });
        todoList.appendChild(item);
    });
});

// --- 各種ハンドラー（ここをスッキリ整理しました） ---

function handleToggle(li, isChecked) {
    li.classList.toggle('completed', isChecked);
    updateAndSave();
}

function handleDelete(li) {
    li.remove();
    updateAndSave();
}

function handleEdit(li, span) {
    const currentText = span.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.className = 'edit-input';

    li.replaceChild(editInput, span);
    editInput.focus();

    const finishEditing = () => {
        const newText = editInput.value.trim();
        if (newText) {
            span.textContent = newText;
        } else {
            span.textContent = currentText;
        }
        
        if (li.contains(editInput)) {
            li.replaceChild(span, editInput);
        }
        updateAndSave(); 
    };

    editInput.addEventListener('blur', finishEditing);
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            finishEditing();
        } else if (e.key === 'Escape') {
            editInput.value = currentText; // 元に戻す
            finishEditing();
        }
    });
}

// --- ドラッグ＆ドロップ ハンドラー ---
let draggedItem = null;

function handleDragStart(li) {
    draggedItem = li;
    li.classList.add('dragging');
}

function handleDragEnd(li) {
    li.classList.remove('dragging');
    draggedItem = null;
}

function handleDrop(targetLi) {
    if (!draggedItem || draggedItem === targetLi) return;

    const children = Array.from(todoList.children);
    const draggedIndex = children.indexOf(draggedItem);
    const targetIndex = children.indexOf(targetLi);

    if (draggedIndex < targetIndex) {
        targetLi.after(draggedItem);
    } else {
        targetLi.before(draggedItem);
    }
    updateAndSave();
}

// 新規追加
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    // 第2引数以降に、上記で定義した関数（ハンドラー）を渡す
    const item = createTodoElement({text, completed: false}, {
        onToggle: handleToggle,
        onDelete: handleDelete,
        onEdit: handleEdit,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDrop: handleDrop
    });
    todoList.appendChild(item);
    updateAndSave();
    todoInput.value = "";
    todoInput.focus();
}

// イベント設定
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') addTodo();
});