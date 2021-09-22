import './style.css';
import interaction from './interactive.js';

const TODOLIST_CONTAINER = document.querySelector('.todo-lists-div');
let todoListArray = [
  {
    description: 'Do the laundry',
    completed: false,
    index: 2,
  },
  {
    description: 'Visit Parents',
    completed: false,
    index: 1,
  },
  {
    description: 'Bathe the dog',
    completed: false,
    index: 3,
  },
];

const CURRENT_STORAGE = JSON.parse(localStorage.getItem('listOfTasks'));
if (CURRENT_STORAGE) {
  todoListArray = CURRENT_STORAGE;
}

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

const sortingFunction = (a, b) => {
  let comparison = 0;
  if (a.index > b.index) {
    comparison = 1;
  } else if (a.index < b.index) {
    comparison = -1;
  }
  return comparison;
};

todoListArray.sort(sortingFunction);

createToDoListDiv(todoListArray);
