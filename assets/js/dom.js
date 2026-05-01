export function createTodoElement(todo, onToggle, onDelete, onEdit) {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    // チェックボックスの変更イベント
    checkbox.addEventListener('change', () => onToggle(li, checkbox.checked));

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'todo-text';
    // ダブルクリックで編集イベント
    span.addEventListener('dblclick', () => onEdit(li, span));

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