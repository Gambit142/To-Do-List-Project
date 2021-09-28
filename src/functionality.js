// eslint-disable-next-line import/no-cycle
import interaction from './interactive.js';

export default (e, textField, todoListArray) => {
  if (textField.value === '') return;
  e.preventDefault();
  const localStorageObject = {
    description: textField.value,
    completed: false,
    index: todoListArray.length + 1,
  };
  todoListArray.push(localStorageObject);
  localStorage.setItem('listOfTasks', JSON.stringify(todoListArray));
};

const setLocalStorage = (array) => {
  localStorage.setItem('listOfTasks', JSON.stringify(array));
  window.location.reload();
};

const editTasks = (array) => {
  const individualTasks = document.querySelectorAll('.task-description');
  individualTasks.forEach((tasks, taskIndex) => {
    tasks.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        array.filter((object, objectIndex) => {
          if (taskIndex === objectIndex) {
            object.description = tasks.value;
            tasks.style.outline = 'none';
            tasks.blur();
          }
          return false;
        });
      }
      localStorage.setItem('listOfTasks', JSON.stringify(array));
    });
  });
};

export const clickEditButton = () => {
  const editHandler = document.querySelectorAll('.edit');
  editHandler.forEach((edit) => {
    const textDescription = document.getElementById(edit.dataset.target);
    edit.addEventListener('click', () => {
      textDescription.focus();
      const moreButton = document.querySelectorAll('.more');
      moreButton.forEach((btn) => {
        const dropdownMenu = document.getElementById(btn.dataset.target);
        dropdownMenu.classList.remove('show');
      });
    });
  });
};

export const clickDeleteButton = (array) => {
  const deleteHandler = document.querySelectorAll('.delete');
  deleteHandler.forEach((handler, index) => {
    handler.addEventListener('click', () => {
      const filteredArray = array.filter((task) => array.indexOf(task) !== index);
      filteredArray.forEach((obj, index) => {
        obj.index = index + 1;
      });
      setLocalStorage(filteredArray);
    });
  });
};

export const deleteCompletedTask = (array) => {
  const deleteCompletedBtn = document.querySelector('.clear-div');
  deleteCompletedBtn.addEventListener('click', () => {
    const filteredArray = array.filter((obj) => obj.completed !== true);
    filteredArray.forEach((obj, index) => {
      obj.index = index + 1;
    });
    setLocalStorage(filteredArray);
  });
};

export const restartTask = () => {
  const reloadButton = document.querySelector('.reload');
  reloadButton.addEventListener('click', () => {
    setLocalStorage([]);
  });
};

export const createToDoListDiv = (array) => {
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
  const TODOLIST_CONTAINER = document.querySelector('.todo-lists-div');
  TODOLIST_CONTAINER.innerHTML = task;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const textDescription = document.getElementById(checkbox.dataset.target);
    checkbox.addEventListener('change', (e) => {
      interaction(e, array, textDescription);
    });
  });
  const moreButton = document.querySelectorAll('.more');

  moreButton.forEach((btn) => {
    const dropdownMenu = document.getElementById(btn.dataset.target);
    btn.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });
  });

  editTasks(array);
};