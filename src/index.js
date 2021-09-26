import './style.css';
import interaction from './interactive.js';
// eslint-disable-next-line import/no-cycle
import enterTask, {
  editTasks, clickEditButton,
  clickDeleteButton, deleteCompletedTask,
  restartTask,
} from './functionality.js';
import draggable, { draggover } from './draggable.js';

const TODOLIST_CONTAINER = document.querySelector('.todo-lists-div');
const textField = document.getElementById('text-field');
const todoListArray = JSON.parse(localStorage.getItem('listOfTasks')) || [];

const enterIcon = document.getElementById('enter-button');

const createToDoListDiv = (array) => {
  let task = '';
  array.forEach((div) => {
    let checked = '';
    let state = 'none';
    if (div.completed) {
      checked = 'checked';
      state = 'line-through';
    }
    task += `<div class="task-div draggable" draggable="true" id="draggable-${div.index}">
    <div>
    <input type="checkbox" data-target="task-${div.index}" id="${div.index}" name="task-${div.index}" ${checked}>
    <input type="text" value="${div.description}" style="text-decoration: ${state};" for="task-${div.index}" id="task-${div.index}" class="task-description"><br>
    </div>
    <div><i class="fas fa-ellipsis-v more" data-target="button-${div.index}"></i></div>
    </div>
    <div id="button-${div.index}" class="dropdown-menu">
    <a href="#" class="edit" data-target="task-${div.index}">Edit</a>
    <a href="#" class="delete">Delete</a>
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
  const moreButton = document.querySelectorAll('.more');

  moreButton.forEach((btn) => {
    const dropdownMenu = document.getElementById(btn.dataset.target);
    btn.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });
  });

  editTasks(todoListArray);
};

enterIcon.addEventListener('click', (e) => {
  enterTask(e, textField, todoListArray);
  createToDoListDiv(todoListArray);
  window.location.reload();
});

textField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (textField.value === '') return;
    enterTask(e, textField, todoListArray);
    createToDoListDiv(todoListArray);
    window.location.reload();
  }
});

createToDoListDiv(todoListArray);
clickEditButton();
clickDeleteButton(todoListArray);
deleteCompletedTask(todoListArray);
restartTask();

const draggables = document.querySelectorAll('.draggable');
const listContainer = document.querySelector('.list-container');
draggable(draggables);
console.log(draggables);
draggover(listContainer);
