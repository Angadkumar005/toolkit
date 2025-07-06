const input = document.getElementById('task-input');
const dateInput = document.getElementById('task-date');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Theme Toggle
themeToggle.onclick = () => {
  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
};

// Load theme on start
if (localStorage.getItem('theme') === 'dark') {
  body.dataset.theme = 'dark';
}

// Add Task
addBtn.onclick = () => {
  const text = input.value.trim();
  const dueDate = dateInput.value;
  if (text) {
    tasks.push({ text, completed: false, dueDate });
    saveTasks();
  }
};

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  const query = searchInput.value.toLowerCase();

  tasks.forEach((task, index) => {
    if (!task.text.toLowerCase().includes(query)) return;

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `${task.text} ${task.dueDate ? `(${task.dueDate})` : ''}`;
    if (task.completed) li.classList.add('completed');
    if (task.dueDate && new Date(task.dueDate) < new Date() && !task.completed) {
      li.classList.add('overdue');
    }

    // Inline editing
    span.ondblclick = () => {
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = task.text;
      editInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          task.text = editInput.value.trim();
          saveTasks();
        }
      };
      li.replaceChild(editInput, span);
      editInput.focus();
    };

    const actions = document.createElement('div');
    actions.className = 'actions';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✅';
    doneBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
    };

    actions.appendChild(doneBtn);
    actions.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

// Save and re-render
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  dateInput.value = '';
  renderTasks();
}

// Filter
searchInput.oninput = renderTasks;

// Initial render
renderTasks();
