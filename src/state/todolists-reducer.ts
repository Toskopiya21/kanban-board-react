import { v1 } from "uuid";
import { TodolistType } from "./../App";

export type RemoveTodoListActionType = {
  type: "REMOVE_TODOLIST";
  id: string;
};
export type AddTodoListActionType = {
  type: "ADD_TODOLIST";
  title: string;
  id: string;
};
export type ChangeTodoListTitleActionType = {
  type: "CHANGE_TODOLIST_TITLE";
  id: string;
  title: string;
};

type ActionsTypes =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType;

export const todoListId1 = v1();
export const todoListId2 = v1();
export const todoListId3 = v1();
export const todoListId4 = v1();

const initialState: Array<TodolistType> = [
  { id: todoListId1, title: "Задачи", filter: "all" },
  { id: todoListId2, title: "В работе", filter: "all" },
  { id: todoListId3, title: "Ожидает проверки", filter: "all" },
  { id: todoListId4, title: "Готово", filter: "all" },
];
export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsTypes
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE_TODOLIST":
      return state.filter((item) => item.id !== action.id);
    case "ADD_TODOLIST":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          filter: "all",
        },
      ];
    case "CHANGE_TODOLIST_TITLE":
      let todolist = state.find((item) => item.id == action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];

    default:
      return state;
    // return [...state];
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return {
    type: "REMOVE_TODOLIST",
    id: todoListId,
  };
};
export const addTodoListAC = (title: string): AddTodoListActionType => {
  return {
    type: "ADD_TODOLIST",
    title: title,
    id: v1(),
  };
};
export const changeTodoListTitleAC = (
  todoListId: string,
  title: string
): ChangeTodoListTitleActionType => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    id: todoListId,
    title: title,
  };
};
