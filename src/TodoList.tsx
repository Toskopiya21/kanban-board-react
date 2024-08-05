import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import "./App.css";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTodoList: (todolistId: string) => void;

  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
  // changeTodoListTitle(newTitle: string, todolistId: string) => void;
  filter: FilterValuesType;
};
export function TodoList(props: PropsType) {
  const onremoveTodoList = () => props.removeTodoList(props.id);
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };
  return (
    <div>
      {/* <AddItemForm addTask={props.addTask} id={props.id} /> */}
      {/* <button onClick={onremoveTodoList}>x</button> */}
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />

        <button onClick={onremoveTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((item) => {
          const onRemoveHandler = () => props.removeTask(item.id, props.id);
          const onCheckedStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeStatus(item.id, e.currentTarget.checked, props.id);

          const onCheckedTitleHandler = (newValue: string) =>
            props.changeTaskTitle(item.id, newValue, props.id);

          return (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={onCheckedStatusHandler}
                checked={item.isDone}
                className={item.isDone ? "is-done" : ""}
              />
              <span
                onChange={onCheckedStatusHandler}
                className={item.isDone ? "is-done" : ""}
              >
                {/* {item.title} */}
                <EditableSpan
                  title={item.title}
                  onChange={onCheckedTitleHandler}
                />
              </span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}
          className={props.filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={props.filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={props.filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
