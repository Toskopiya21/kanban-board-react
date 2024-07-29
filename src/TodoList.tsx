import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import "./App.css";
import { AddItemForm } from "./AddItemForm";

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
  removeTodoList: (todolistId: string) => void;
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

  return (
    <div>
      {/* <AddItemForm addTask={props.addTask} id={props.id} /> */}
      {/* <button onClick={onremoveTodoList}>x</button> */}
      <h3>
        {props.title}
        <button onClick={onremoveTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((item) => {
          const onRemoveHandler = () => props.removeTask(item.id, props.id);
          const onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeStatus(item.id, e.currentTarget.checked, props.id);
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={onCheckedHandler}
                checked={item.isDone}
                className={item.isDone ? "is-done" : ""}
              />
              <span
                onChange={onCheckedHandler}
                className={item.isDone ? "is-done" : ""}
              >
                {item.title}
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
