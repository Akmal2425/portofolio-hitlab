const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoBody = document.getElementById('todo-body');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = [];

window.addTodo = function() {
    const text = input.value.trim();
    if (text === "") return; 

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    input.value = ""; 
    renderTodos();
}

window.moveToComplete = function(id) {
    todos = todos.map(t => {
        if (t.id === id) return { ...t, completed: true };
        return t;
    });
    renderTodos();
}

window.toggleTodo = function(id) {
    todos = todos.map(t => {
        if (t.id === id) return { ...t, completed: !t.completed };
        return t;
    });
    renderTodos();
}

function renderTodos() {
    todoBody.innerHTML = ''; 
    
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    let filteredTodos = todos;
    if (activeFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (activeFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach((todo, index) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = "1px solid #eee";

        const textStyle = todo.completed 
            ? 'text-decoration: line-through; color: #a0a0a0;' 
            : 'color: #333;';

        tr.innerHTML = `
            <td style="padding: 10px; color: #888;">${index + 1}</td>
            <td style="padding: 10px; cursor: pointer; ${textStyle}" onclick="toggleTodo(${todo.id})">
                ${todo.text}
            </td>
            <td style="padding: 10px; text-align: right;">
                ${todo.completed 
                    ? '<span style="color: #28a745; font-size: 14px; font-weight: bold;">Selesai</span>' 
                    : `<button class="delete-btn" onclick="moveToComplete(${todo.id})">Proses</button>`
                }
            </td>
        `;
        todoBody.appendChild(tr);
    });
}


addBtn.addEventListener('click', window.addTodo);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.addTodo(); });

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderTodos();
    });
});