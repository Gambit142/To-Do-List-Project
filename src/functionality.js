export default (e, textField, todoListArray) => {
  if (textField.value === '') return;
  e.preventDefault();
  const localStorageObject = {
    description: textField.value,
    completed: false,
    index: todoListArray.length + 1,
  };
  todoListArray.push(localStorageObject);
  console.log(todoListArray);
  localStorage.setItem('listOfTasks', JSON.stringify(todoListArray));
//   createToDoListDiv(todoListArray);
};
