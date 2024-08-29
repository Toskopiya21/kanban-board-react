import { v1 } from "uuid";
import { TaskStateType } from "./../App";

export type RemoveTasksActionType = {
  type: "REMOVE_TASK";
  taskId: string;
  todoListId: string;
};
export type AddTasksActionType = {
  type: "ADD_TASK";
  todoListId: string;
  newTaskTitle: string;
};
export type ChangeTaskTitleActionType = {
  type: "CHANGE_TASK_TITLE";
  todoListId: string;
  taskId: string;
  title: string;
};
export type ChangeTasksStatusActionType = {
  type: "CHANGE_TASK_STATUS";
  todoListId: string;
  taskId: string;
  isDone: boolean;
};

type ActionsTypes =
  | RemoveTasksActionType
  | AddTasksActionType
  | ChangeTaskTitleActionType
  | ChangeTasksStatusActionType;

export const tasksReducer = (
  state: TaskStateType,
  action: ActionsTypes
): TaskStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todoListId] = filteredTasks;
      return stateCopy;
    }
    case "ADD_TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const newTask = { id: v1(), title: action.newTaskTitle, isDone: false };
      const newtasks = [newTask, ...tasks];
      stateCopy[action.todoListId] = newtasks;
      return stateCopy;
    }
    case "CHANGE_TASK_STATUS": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE_TASK_TITLE": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }

    default:
      throw new Error("i dont understand this action type");
  }
};

export const removeTasksAC = (
  taskId: string,
  todoListId: string
): RemoveTasksActionType => {
  return {
    type: "REMOVE_TASK",
    taskId,
    todoListId,
  };
};
export const addTasksAC = (
  todoListId: string,
  newTaskTitle: string
): AddTasksActionType => {
  return {
    type: "ADD_TASK",
    todoListId,
    newTaskTitle,
  };
};
export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE_TASK_TITLE",
    todoListId,
    taskId,
    title,
  };
};
export const changeTasksStatusAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
): ChangeTasksStatusActionType => {
  return {
    type: "CHANGE_TASK_STATUS",
    todoListId,
    taskId,
    isDone,
  };
};
