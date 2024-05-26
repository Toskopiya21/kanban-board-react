import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./App.css";

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
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  removeTodoList: (todolistId: string) => void;
  filter: FilterValuesType;
};
export function TodoList(props: PropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState<string>("");
  let [error, setError] = useState<string | null>(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.ctrlKey && e.key === "Enter") {
      addTask();
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const addTask = () => {
    setError(null);

    newTaskTitle.trim() !== ""
      ? props.addTask(newTaskTitle.trim(), props.id)
      : setError("Title is required");
    setNewTaskTitle("");
  };
  const onremoveTodoList = () => props.removeTodoList(props.id);
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  return (
    <div>
      {/* <button onClick={onremoveTodoList}>x</button> */}
      <h3>
        {props.title}
        <button onClick={onremoveTodoList}>x</button>
      </h3>

      <input
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={handleKeyPress}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-massage">{error}</div>}
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
