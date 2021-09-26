export default (draggables) => {
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      const readArray = JSON.parse(localStorage.getItem('listOfTasks'));
      readArray.forEach((obj, i) => {
        obj.index = i + 1;
      });
      localStorage.setItem('listOfTasks', JSON.stringify(readArray));
    });
  });
};

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export const draggover = (container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
    const lists = [...document.querySelectorAll('.draggable')];
    const newStorage = [];
    lists.forEach((list) => {
      const idReplaced = parseInt(list.id.replace('draggable-', ''), 10);
      const readArray = JSON.parse(localStorage.getItem('listOfTasks'));
      const result = readArray.filter((task) => task.index === idReplaced);
      newStorage.push(...result);
      console.log(newStorage);
    });
    localStorage.setItem('listOfTasks', JSON.stringify(newStorage));
  });
//   const lists = [...document.querySelectorAll('.draggable')];
//   const newStorage = [];
//   console.log(lists);
//   lists.forEach((list) => {
//     const idReplaced = parseInt(list.id.replace('draggable-', ''), 10);
//     console.log(idReplaced);
//     const readArray = JSON.parse(localStorage.getItem('listOfTasks'));
//     const result = readArray.filter((task) => task.index === idReplaced);
//     newStorage.push(...result);
//   });
//   localStorage.setItem('listOfTasks', JSON.stringify(newStorage));
};
