import { TaskStateType, TodolistType } from "../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todolistsReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTaskState: TaskStateType = {};
  const startTodoListState: Array<TodolistType> = [];

  const action = addTodoListAC("new todolist");
  const endTaskState = tasksReducer(startTaskState, action);
  const endTodoListState = todolistsReducer(startTodoListState, action);

  const keys = Object.keys(endTaskState);
  const isFormTasks = keys[0];
  const isFormTodoLists = endTodoListState[0].id;

  expect(isFormTasks).toBe(action.id);
  expect(isFormTodoLists).toBe(action.id);
});
