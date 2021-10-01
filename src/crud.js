import { LocalStorage } from './localstorage.js';

export const storage = new LocalStorage();

export const addToDo = () => {
  const localStorageObject = {
    description: 'Task 1',
    index: storage.array.length + 1,
    completed: false,
  };
  storage.setLocalStorage(localStorageObject);
};

export const createHtmlDiv = (array) => {
  let task = '';
  array.forEach((element) => {
    task += `<div class="task-div draggable" draggable="true" id="draggable-${element.index}">
    <div>
    <input type="checkbox" data-target="task-${element.index}" id="${element.index}" name="task-${element.index}">
    <input type="text" value="${element.description}" id="task-${element.index}" class="task-description"><br>
    </div>
    <div><i class="fas fa-ellipsis-v more" data-target="button-${element.index}"></i></div>
    </div>`;
  });
  const TODOLIST_CONTAINER = document.querySelector('.todo-lists-div');
  TODOLIST_CONTAINER.innerHTML = task;
};

export const removeTodo = (index) => {
  const filteredArray = storage.array.filter((task) => storage.array.indexOf(task) !== index);
  filteredArray.forEach((obj, index) => {
    obj.index = index + 1;
  });
  storage.array = filteredArray;
};

export const editTodo = (array, index) => {
  const input = document.querySelector('.task-description');
  array.filter((object, objectIndex) => {
    if (index === objectIndex) {
      object.description = input.value;
    }
    return false;
  });
};

export const statusUpdate = (array, index) => {
  array.filter((object, objectIndex) => {
    if (index === objectIndex) {
      object.completed = true;
    }
    return false;
  });
};

export const deleteAllCompleted = (array) => {
  const filteredArray = array.filter((obj) => obj.completed !== true);
  filteredArray.forEach((obj, index) => {
    obj.index = index + 1;
  });
  storage.array = filteredArray;
};