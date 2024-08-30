import { tasksReducer } from "./tasks-reducer";
import { v1 } from "uuid";
import { TaskStateType } from "./../App";
import {
  addTasksAC,
  changeTasksStatusAC,
  changeTaskTitleAC,
  removeTasksAC,
} from "./tasks-reducer";
import { addTodoListAC, removeTodoListAC } from "./todolists-reducer";

let todoListId1 = v1();
let todoListId2 = v1();

const startState: TaskStateType = {
  [todoListId1]: [
    { id: "1", title: "Добавить прелоадер", isDone: false },
    { id: "2", title: "Выполнить редизайн проекта", isDone: false },
  ],
  [todoListId2]: [
    { id: "1", title: "Добавить прелоадер", isDone: false },
    { id: "2", title: "Выполнить редизайн проекта", isDone: false },
  ],
};

test("correct task should be deleted from correct array", () => {
  const action = removeTasksAC("1", todoListId2);
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1].length).toBe(2);

  expect(endState[todoListId2].length).toBe(1);

  // every метод массива. пробегается по массиву и возвращает true или false
  expect(endState[todoListId2].every((t) => t.id != "1")).toBeTruthy();
});

test("correct task should be addaed from correct array", () => {
  const action = addTasksAC(todoListId1, "Добавить прелоадер");
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoListId2].length).toBe(2);

  // id toBeDefined была определена
  expect(endState[todoListId1][0].id).toBeDefined();
  expect(endState[todoListId1][0].title).toBe("Добавить прелоадер");
  expect(endState[todoListId1][0].isDone).toBe(false);
});

test("correct todolist should change its name", () => {
  const action = changeTaskTitleAC(todoListId1, "2", "title");
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1][1].title).toBe("title");
});

test("correct todolist should change its isDone", () => {
  const action = changeTasksStatusAC(todoListId1, "2", true);
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1][1].isDone).toBeTruthy();
  expect(endState[todoListId2][1].isDone).toBeFalsy();
});

test("new property with new array should be added when new todolist is added", () => {
  const action = addTodoListAC("title no matter");
  const endState = tasksReducer(startState, action);
  // возврат ключей todoListId1 и todoListId2
  const keys = Object.keys(endState);

  const newKey = keys.find((k) => k != todoListId1 && k != todoListId2);
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = removeTodoListAC(todoListId1);
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  // expect(endState[todoListId1]).not.toBeDefined();
  expect(endState[todoListId1]).toBeUndefined();
});
