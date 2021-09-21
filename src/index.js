import _ from 'lodash';
import './style.css';

const TODOLIST_CONTAINER = document.querySelector('.todo-lists-div');
const TODOLIST_ARRAY = [
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

const createToDoListDiv = (array) => {
  let task = '';
  array.forEach((div) => {
    task += `<div class="task-div">
    <div>
    <input type="checkbox" id="task-${div.index}" name="task-${div.index}" value="${div.completed}">
    <label for="task-${div.index}" class="task-description">${div.description}</label><br>
    </div>
    <div><i class="fas fa-ellipsis-v"></i></div>
    </div>`;
  });
  TODOLIST_CONTAINER.innerHTML = task;
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

TODOLIST_ARRAY.sort(sortingFunction);
createToDoListDiv(TODOLIST_ARRAY);