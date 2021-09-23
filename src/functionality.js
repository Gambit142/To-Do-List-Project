// eslint-disable-next-line import/no-cycle
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

export const editTasks = (array) => {
  const individualTasks = document.querySelectorAll('.task-description');
  individualTasks.forEach((tasks, taskIndex) => {
    tasks.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        array.filter((object, objectIndex) => {
          if (taskIndex === objectIndex) {
            object.description = tasks.value;
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