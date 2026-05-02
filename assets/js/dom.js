export function createTodoElement(todo, { onToggle, onDelete, onEdit, onDragStart, onDragEnd, onDrop }) {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    // ドラッグ＆ドロップ設定
    li.draggable = true;
    li.addEventListener('dragstart', () => onDragStart(li));
    li.addEventListener('dragend', () => onDragEnd(li));
    li.addEventListener('dragover', (e) => {
        e.preventDefault(); // ドロップを許可するために必要
    });
    li.addEventListener('drop', (e) => {
        e.preventDefault();
        onDrop(li);
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    // チェックボックスの変更イベント
    checkbox.addEventListener('change', () => onToggle(li, checkbox.checked));

    // dom.js の span 部分
    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'todo-text';

    // ここで main.js から受け取った handleEdit (onEdit) を実行する
    span.addEventListener('dblclick', () => {
    onEdit(li, span); 
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&times;';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onDelete(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}