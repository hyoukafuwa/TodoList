
// Alle Variablen, die benötigt werden
const valueTodo = document.getElementById('todoValue');
const myForm =  document.getElementById('myForm');
const container = document.querySelector('ul');
const addButton = document.querySelector('button');
const error = document.getElementById('error');
const listElements = document.getElementsByClassName('todos');
const deleteButton = document.getElementsByClassName('delete1');
const newTodoButton = document.getElementById('addTodo');

// Beim Laden der Webseite soll die Farbe geändert werden
window.onload = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    myForm.style.backgroundColor = "#" + randomColor;

    getTodos();
}

function getTodos() {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
}

todos.forEach(() => {
    
    // Elemente erstellen
    const div = document.createElement('div');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const i = document.createElement('i');
    const secondI = document.createElement('i');
    const secondSpan = document.createElement('span');
    
    // Text hinzufügen
    for (let i = 0; i <= listElements.length; i++) {
        li.innerText = todos[i];
    }
    
    // Attribute hinzufügen 
    div.className = 'todos';
    span.className = 'delete1';
    i.className = 'fas fa-trash';
    secondI.className = 'far fa-circle';
    
    function create() {
        // Ins DOM hinzufügen
        span.appendChild(i);
        secondSpan.appendChild(secondI);
        div.appendChild(secondSpan);
        div.appendChild(li);
        div.appendChild(span);
        container.appendChild(div);
    }
    
    create();
});
}

function addTodoToLocalStorage(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalStorageTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.parentElement.children[1];
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Die Funktion hinzufügen
function addElements(e, value) {
    e.preventDefault();

    // Elemente erstellen
    const div = document.createElement('div');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const i = document.createElement('i');
    const secondI = document.createElement('i');
    const secondSpan = document.createElement('span');

    // Text hinzufügen
    li.innerText = value;

    // Attribute hinzufügen 
    div.className = 'todos';
    span.className = 'delete1';
    i.className = 'fas fa-trash';
    secondI.className = 'far fa-circle';

    addTodoToLocalStorage(value);

    function create() {
        // Ins DOM hinzufügen
        span.appendChild(i);
        secondSpan.appendChild(secondI);
        div.appendChild(secondSpan);
        div.appendChild(li);
        div.appendChild(span);
        container.appendChild(div);

        // Das Feld wieder leer machen
        valueTodo.value = '';
    }

    // Ein if-Statement, dass überprüft, ob das Feld nicht leer ist
    if (valueTodo.value === '' || valueTodo.value === null) {

        // Fehlermeldung sichtbar machen
        alert('Das Feld darf nicht leer sein!')
    } else if (45 < valueTodo.value.length && valueTodo.value.search(' ') !== ' ') {
        li.style.wordWrap = 'break-word';
        create();
    } else {
        create();
    }
}

addButton.addEventListener('click', e => {
    addElements(e, valueTodo.value);
});

window.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        addElements(e, valueTodo.value);
    }
});

container.addEventListener('click', e => {
    const item = e.target;
    
    if (item.className === 'fas fa-trash') {
        removeLocalStorageTodos(item);
        const todo = item.parentElement.parentElement;
        todo.remove();
    }

    if (item.className === 'far fa-circle') {
        item.parentElement.nextSibling.className = 'todoCompleted';
        item.parentElement.innerHTML = '<i class="far fa-check-circle"></i>';
    }

    if (item.className === 'far fa-check-circle') {
        item.parentElement.nextSibling.removeAttribute('class');
        item.parentElement.innerHTML = '<i class="far fa-circle"></i>';
    }
});