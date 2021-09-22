export default (e, todoListArray, textDescription) => {
  todoListArray.forEach((object) => {
    if (object.index === parseInt(e.target.id, 10)) {
      object.completed = e.target.checked;
    }
  });
  localStorage.setItem('listOfTasks', JSON.stringify(todoListArray));
  if (e.target.checked) {
    textDescription.style.textDecoration = 'line-through';
  } else {
    textDescription.style.textDecoration = 'none';
  }
};