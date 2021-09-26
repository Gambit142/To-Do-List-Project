import './style.css';
// eslint-disable-next-line import/no-cycle
import enterTask, {
  createToDoListDiv, clickEditButton,
  clickDeleteButton, deleteCompletedTask,
  restartTask,
} from './functionality.js';
import draggable, { draggover } from './draggable.js';

const textField = document.getElementById('text-field');
textField.focus();
textField.style.outline = 'none';
const todoListArray = JSON.parse(localStorage.getItem('listOfTasks')) || [];

const enterIcon = document.getElementById('enter-button');

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
    // document.getElementById('text-field').focus();
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
draggover(listContainer);
