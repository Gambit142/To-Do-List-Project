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

const createToDoListDiv = array => {
  let task = '';
  array.forEach(div => {
    task += `<div>
    <div>
    <input type="checkbox" id="task-${div.index}" name="task-${div.index}" value="${div.completed}">
    <label for="task-${div.index}">${div.description}</label><br>
    </div>
    <div><i class="fas fa-ellipsis-v"></i></div>
    </div>`
  });
  TODOLIST_CONTAINER.innerHTML = task;
}

TODOLIST_ARRAY.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0));

createToDoListDiv(TODOLIST_ARRAY);