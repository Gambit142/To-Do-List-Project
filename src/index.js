import './style.css';
import { interaction } from './interactive.js';

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
    <input type="checkbox" data-target="task-${div.index}" id="${div.index}" name="task-${div.index}" value="${div.completed}">
    <label for="task-${div.index}" id="task-${div.index}" class="task-description">${div.description}</label><br>
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

// TODOLIST_ARRAY.forEach((object) => {
// });
localStorage.setItem('listOfTasks', JSON.stringify(TODOLIST_ARRAY));

createToDoListDiv(TODOLIST_ARRAY);
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
console.log(checkboxes);
checkboxes.forEach((checkbox) => {
  const textDescription = document.getElementById(checkbox.dataset.target);
  console.log(checkbox);
  checkbox.addEventListener('change', (e) => {
    console.log('Hello!');
    // TODOLIST_ARRAY.forEach((item) => {
    //   if (item.index === checkbox.id) {
    //     item.completed = e.target.checked;
    //     // console.log(item);
    //   }
    // });
    // localStorage.setItem('listOfTasks', JSON.stringify(TODOLIST_ARRAY));
    if (e.target.checked) {
      textDescription.style.textDecoration = 'line-through';
    } else {
      textDescription.style.textDecoration = 'none';
    }
    interaction(e);
  });
});

function onPageLoad() {
  if (JSON.parse(localStorage.getItem('listOfTasks'))) {
    const listTasks = JSON.parse(localStorage.getItem('listOfTasks'));
    createToDoListDiv(listTasks);
  }
}

window.addEventListener('load', () => {
  onPageLoad();
});
