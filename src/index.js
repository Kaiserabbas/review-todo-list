/* importing files from the modules */
import './modules/index.css';
import { saveTasks, addTasks, tasksForm, tasks } from './modules/print.js';

// Function to display the books ingetElementById the list
export const showTasks = () => {
  const taskList = document.getElementById('todo-list');
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const tasksDiv = document.createElement('div');
    tasksDiv.setAttribute('class', 'tasks-div');

    const inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute('type', 'checkbox');
    inputCheckBox.setAttribute('data-index', task.index); // Use task.index instead of i
    inputCheckBox.classList.add('checkbox'); // Add a class for styling
    inputCheckBox.id = 'checkbox';

    if (task.completed) {
      inputCheckBox.checked = true;
    }
    inputCheckBox.addEventListener('change', () => {
      task.completed = inputCheckBox.checked;
      saveTasks();
      showTasks();
    });

    tasksDiv.appendChild(inputCheckBox);

    const listItemTitle = document.createElement('p');
    listItemTitle.innerHTML = `${task.description}`;
    tasksDiv.appendChild(listItemTitle);

    const removeButton = document.createElement('span');
    removeButton.setAttribute('class', 'close');
    removeButton.setAttribute('id', 'remove-icon');
    removeButton.innerHTML = '🗑';
    removeButton.addEventListener('click', () => {
      taskList.removeChild(tasksDiv);
      taskList.removeChild(hr3);
      removeTask(task.index);
      saveTasks();
      showTasks();
    });
    removeButton.style.display = task.completed ? 'inline' : 'none';
    tasksDiv.appendChild(removeButton);

    const handle = document.createElement('span');
    handle.setAttribute('class', 'handle');
    handle.innerHTML = '&#8942;';
    tasksDiv.appendChild(handle);
    handle.style.display = task.completed ? 'none' : 'inline';

    listItemTitle.addEventListener('click', () => {
      listItemTitle.contentEditable = true;
      listItemTitle.focus();
    });

    listItemTitle.addEventListener('blur', () => {
      listItemTitle.contentEditable = false;
      tasks[i].description = listItemTitle.innerHTML;
      saveTasks();
    });

    taskList.appendChild(tasksDiv);
    const hr3 = document.createElement('hr');
    taskList.appendChild(hr3);

    // Update the text decoration style based on the checkbox state
    if (inputCheckBox.checked) {
      listItemTitle.style.textDecoration = 'line-through';
    } else {
      listItemTitle.style.textDecoration = 'none';
    }
  }

  const hasCompletedTasks = tasks.some((task) => task.completed);

  if (hasCompletedTasks) {
    const clearCompletedButton = document.createElement('button');
    clearCompletedButton.setAttribute('class', 'clear-button');
    clearCompletedButton.textContent = 'Clear All Completed';
    clearCompletedButton.disabled = tasks.every((task) => !task.completed);

    clearCompletedButton.addEventListener('click', function () {
      tasks = tasks.filter((task) => !task.completed);
      saveTasks();
      showTasks();
    });
    taskList.appendChild(clearCompletedButton);
  }
};
tasksForm.addEventListener('submit', addTasks);
showTasks();
