import { tasksReducer } from "./tasks-reducer";
import { v1 } from "uuid";
import { TaskStateType } from "./../App";
import {
  addTasksAC,
  changeTasksStatusAC,
  changeTaskTitleAC,
  removeTasksAC,
} from "./tasks-reducer";

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
