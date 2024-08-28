import { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./styles/App.css";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import "./styles/todoList.scss";
import LongMenu from "./Menu";
import useRandomColor, { Color } from "./hooks/useRandomColor";

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
  // changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTodoList: (todolistId: string) => void;

  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
  // filter: FilterValuesType;
};
export function TodoList(props: PropsType) {
  const onRemoveTodoList = () => props.removeTodoList(props.id);
  // const onAllClickHandler = () => props.changeFilter("all", props.id);
  // const onActiveClickHandler = () => props.changeFilter("active", props.id);
  // const onCompletedClickHandler = () =>
  //   props.changeFilter("completed", props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const [editMode, setEditMode] = useState(false);

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };
  const [currentTarget, setCurrentTarget] = useState<Boolean>(false);

  const { color, handleColorChange } = useRandomColor();

  let borderTop = `solid 7px ${color.hex}`;
  let backgroundColor = `${color.rgb}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="todoBlock"
      style={{
        borderTop: `${borderTop}`,
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <div className="todoBlock__title">
        <EditableSpan
          title={props.title}
          onChange={changeTodoListTitle}
          edit={false}
        />
        <LongMenu onRemove={onRemoveTodoList}>
          <MenuItem className="menuItem">
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              value={color.hex}
              onChange={(e) => handleColorChange(e.target.value)}
              className="menuTask inputColor"
            />{" "}
            <label>Цвет</label>
          </MenuItem>
          <MenuItem>
            <div onClick={onRemoveTodoList} className="menuTask">
              <DeleteIcon fontSize="inherit" />
              Удалить
            </div>
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
            <li key={item.id}>
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
                    edit={editMode}
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
                {/* <MenuItem className="menuItem">
                  <div
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Редактировать
                  </div>
                </MenuItem> */}
              </LongMenu>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
