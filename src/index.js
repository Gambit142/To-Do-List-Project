import './style.css';
import interaction from './interactive.js';
import enterTask from './functionality.js';

const TODOLIST_CONTAINER = document.querySelector('.todo-lists-div');
const textField = document.getElementById('text-field');
console.log(textField);
const todoListArray = JSON.parse(localStorage.getItem('listOfTasks')) || [];

const enterIcon = document.getElementById('enter-button');
console.log(enterIcon);

const createToDoListDiv = (array) => {
  let task = '';
  array.forEach((div) => {
    let checked = '';
    let state = 'none';
    if (div.completed) {
      checked = 'checked';
      state = 'line-through';
    }
    task += `<div class="task-div">
    <div>
    <input type="checkbox" data-target="task-${div.index}" id="${div.index}" name="task-${div.index}" ${checked}>
    <label style="text-decoration: ${state};" for="task-${div.index}" id="task-${div.index}" class="task-description">${div.description}</label><br>
    </div>
    <div><i class="fas fa-ellipsis-v"></i></div>
    </div>`;
  });
  TODOLIST_CONTAINER.innerHTML = task;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const textDescription = document.getElementById(checkbox.dataset.target);
    checkbox.addEventListener('change', (e) => {
      interaction(e, todoListArray, textDescription);
    });
  });
};

enterIcon.addEventListener('click', (e) => {
  enterTask(e, textField, todoListArray);
  createToDoListDiv(todoListArray);
});

textField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (textField.value === '') return;
    enterTask(e, textField, todoListArray);
    createToDoListDiv(todoListArray);
  }
});

createToDoListDiv(todoListArray);
