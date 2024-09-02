import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
// import { TaskStateType, TodolistType } from "../AppWithRedux";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

// type AppRootState = {
//   todolists: Array<TodolistType>;
//   tasks: TaskStateType;
// };

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-expect-error add store property for window
window.store = store;
