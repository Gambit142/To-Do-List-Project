/**
 * @jest-environment jsdom
 */

import {
  addToDo, createHtmlDiv,
  storage, removeTodo,
  editTodo, deleteAllCompleted,
  statusUpdate,
} from '../src/crud.js';

// Arrange

const todoListArray = storage.getLocalStorage() || [];
const divContainer = '<div class="todo-lists-div"></div>';
document.body.innerHTML = divContainer;

describe('Tests to check if CRUD functions works', () => {
  test('check if pushing to local storage works', () => {
    // Act
    addToDo();
    addToDo();
    createHtmlDiv(todoListArray);
    // const localStorageArray = ad(localStorageObject);

    // Assert
    expect(storage.array.length).toEqual(2);
    expect(storage.array[0]).toMatchObject({
      description: 'Task 1',
      index: 1,
      completed: false,
    });
  });

  test('check if task list is added to DOM', () => {
    // Act
    const list = document.querySelectorAll('.task-div');

    // Assert
    expect(list).toHaveLength(2);
    expect(list[0].id).toBe('draggable-1');
  });

  test('check if task list is deleted', () => {
    // Arrange and Act
    removeTodo(0);
    createHtmlDiv(storage.array);
    const list = document.querySelectorAll('.task-div');

    // Assert
    expect(storage.array.length).toEqual(1);
    expect(storage.array[0].completed).toBeFalsy();
    expect(list).toHaveLength(1);
  });
  test('check if description is edited', () => {
    // Arrange
    const inputted = '<input type="text" value="Edited Task" id="task-1" class="task-description">';

    // Act
    document.body.innerHTML = inputted;
    editTodo(storage.array, 0);

    // Assert
    expect(storage.array[0].description).toBe('Edited Task');
    expect(storage.array.length).toEqual(1);
  });
  test('check if status of completed state changed', () => {
    // Act
    statusUpdate(storage.array, 0);

    // Assert
    expect(storage.array[0].completed).toBeTruthy();
    expect(storage.array.length).toEqual(1);
  });
  test('check if completed task is deleted', () => {
    // Act
    deleteAllCompleted(storage.array);
    const list = document.querySelectorAll('.task-div');

    // Assert
    expect(storage.array.length).toEqual(0);
    expect(list).toHaveLength(0);
  });
});
