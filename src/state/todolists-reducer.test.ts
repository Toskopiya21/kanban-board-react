import {
  AddTodoListAC,
  ChangeTodoListTitleAC,
  ChangeTodoListTitleActionType,
  RemoveTodoListAC,
  todolistsReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistType } from "./../App";

test("correct todolist should be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "Задачи", filter: "all" },
    { id: todoListId2, title: "В работе", filter: "all" },
  ];
  const endState = todolistsReducer(startState, RemoveTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  let newTodoListTitle = "Ожидает проверки";

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "Задачи", filter: "all" },
    { id: todoListId2, title: "В работе", filter: "all" },
  ];
  const endState = todolistsReducer(
    startState,
    AddTodoListAC(newTodoListTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "Ожидает проверки";

  const startState: Array<TodolistType> = [
    { id: todoListId1, title: "Задачи", filter: "all" },
    { id: todoListId2, title: "В работе", filter: "all" },
  ];

  // const action = {
  //   type: "CHANGE_TODOLIST_TITLE" as const,
  //...
  // };
  // or
  // const action: ChangeTodoListTitleActionType = {
  // ...
  // };
  const endState = todolistsReducer(
    startState,
    ChangeTodoListTitleAC(todoListId1, newTodoListTitle)
  );

  expect(endState[0].title).toBe(newTodoListTitle);
  expect(endState[1].title).toBe("В работе");
});
