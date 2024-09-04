import {v1} from "uuid";
import {TaskStateType} from "./../AppWithRedux";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    // todoListId1,
    // todoListId2,
    // todoListId3,
    // todoListId4,
} from "./todolists-reducer";

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
    | ChangeTasksStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType;
const initialState = {
    // [todoListId1]: [
    //   { id: v1(), title: "Добавить прелоадер", isDone: false },
    //   { id: v1(), title: "Выполнить редизайн проекта", isDone: false },
    // ],
    // [todoListId2]: [],
    // [todoListId3]: [],
    // [todoListId4]: [],
};
export const tasksReducer = (
    state: TaskStateType = initialState,
    action: ActionsTypes
): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case "ADD_TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const newTask = {id: v1(), title: action.newTaskTitle, isDone: false};
            const newtasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newtasks;
            return stateCopy;
        }
        case "CHANGE_TASK_STATUS": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = tasks
                .map((t) => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t)
            // const task = tasks.find((t) => t.id === action.taskId);
            // if (task) {
            //   task.isDone = action.isDone;
            // }
            return stateCopy;
        }
        case "CHANGE_TASK_TITLE": {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            stateCopy[action.todoListId] = tasks
                .map((t) => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            return stateCopy;
        }
        case "ADD_TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.id] = [];
            return stateCopy;
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }

        default:
            return state;
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
