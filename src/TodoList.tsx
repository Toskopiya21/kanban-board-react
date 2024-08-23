import { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./styles/App.css";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/todoList.scss";
import LongMenu from "./Menu";

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
  filter: FilterValuesType;
};
export function TodoList(props: PropsType) {
  const onRemoveTodoList = () => props.removeTodoList(props.id);
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
  const [currentTarget, setCurrentTarget] = useState<Boolean>(false);

  const [color, setColor] = useState(
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`
  );

  function hexToRgb(hex: string) {
    // Убедимся, что hex начинается с #
    if (hex.charAt(0) === "#") {
      hex = hex.slice(1);
    }

    // Преобразуем каждую пару символов в десятичное число
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgb(${r}, ${g}, ${b}, ${0.05})`;
  }
  const handleColor = (e: any) => {
    setColor(e.target.value);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className="todoBlock"
      style={{
        borderTop: `solid 7px ${color}`,
        backgroundColor: `${hexToRgb(color)}`,
      }}
    >
      <div className="todoBlock__title">
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <LongMenu onRemove={onRemoveTodoList}>
          <MenuItem className="menuItem">
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              value={color}
              onChange={handleColor}
              className="menuTask inputColor"
            />{" "}
            <label>Цвет</label>
          </MenuItem>
        </LongMenu>
      </div>
      <AddItemForm addItem={addTask} title="+ Добавить задачу" />
      <ul className="todoItem">
        {props.tasks.map((item) => {
          const onRemoveHandler = () => props.removeTask(item.id, props.id);
          const onCheckedStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(item.id, e.currentTarget.checked, props.id);
            setCurrentTarget(e.currentTarget.checked);
          };

          const onCheckedTitleHandler = (newValue: string) =>
            props.changeTaskTitle(item.id, newValue, props.id);

          return (
            <li key={item.id} style={{ borderLeft: `solid 5px` }}>
              <div className="itemCheckbox">
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
                  <EditableSpan
                    title={item.title}
                    onChange={onCheckedTitleHandler}
                  />
                </span>
              </div>
              <LongMenu onRemove={onRemoveHandler}>
                <MenuItem onClick={handleClose} className="menuItem">
                  <div onClick={onRemoveHandler} className="menuTask">
                    <DeleteIcon fontSize="inherit" />
                    Удалить
                  </div>
                </MenuItem>
                <MenuItem className="menuItem">
                  <LongMenu onRemove={onRemoveHandler}>
                    <MenuItem className="menuItem">Низкий</MenuItem>
                    <MenuItem className="menuItem">Средний</MenuItem>
                    <MenuItem className="menuItem">Высокий</MenuItem>
                  </LongMenu>
                  <div>Приоритет</div>
                </MenuItem>
              </LongMenu>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
