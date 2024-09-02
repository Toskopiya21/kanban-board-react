import { ChangeEvent, useState } from "react";
import "./styles/App.css";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import "./styles/todoList.scss";
import LongMenu from "./Menu";
import useRandomColor from "./hooks/useRandomColor";
import {addTasksAC, changeTasksStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type PropsType = {
  id: string;
  title: string;
  // changeFilter: (value: FilterValuesType, todolistId: string) => void;
  // addTask: (title: string, todoListId: string) => void;
  addItem: (title: string) => void;
  removeTodoList: (todolistId: string) => void;
  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
  // filter: FilterValuesType;
};

export function TodoList(props: PropsType) {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, Array<TaskType>>(
      (state) => state.tasks[props.id]
  );

  // function addTask(title: string) {
  //   // todoListId: string,
  //       dispatch(addTasksAC(todoListId, title));
  // }

  const onRemoveTodoList = () => props.removeTodoList(props.id);


  const editMode = useState(false)[0];

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);

  };

  const { color, handleColorChange } = useRandomColor();

  const borderTop = `solid 7px ${color.hex}`;
  const backgroundColor = `${color.rgb}`;

  const setAnchorEl = useState<null | HTMLElement>(null)[1];

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
      <AddItemForm addItem={(title)=> dispatch(addTasksAC(props.id, title))} title="+ Добавить задачу" />
      <ul className="todoItem">
        {tasks.map((t) => {
          // const onRemoveHandler = () => props.removeTask(t.id, props.id);
          const onRemoveHandler = () => dispatch(removeTasksAC(t.id, props.id));
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            // props.changeStatus(t.id, e.currentTarget.checked, props.id);
            // let newIsDoneValue = e.currentTarget.checked;
            // dispatch(changeTasksStatusAC(t.id, newIsDoneValue, t.id));
            // debugger
            console.log(tasks)

            dispatch(changeTasksStatusAC(props.id, t.id, e.currentTarget.checked));
            console.log(tasks)

            // setCurrentTarget(e.currentTarget.checked);
          };

          const onCheckedTitleHandler = (newValue: string) =>
            // props.changeTaskTitle(t.id, newValue, props.id);
            //   dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
          {
            dispatch(changeTaskTitleAC(t.id, props.id, newValue));
          }

          return (
            <li key={t.id}>
              <div className="tCheckbox">
                <input
                  type="checkbox"
                  onChange={onChangeHandler}
                  checked={t.isDone}
                  className={t.isDone ? "is-done" : ""}
                />
                <span
                  // onChange={onChangeHandler}
                  className={t.isDone ? "is-done" : ""}
                >
                  <EditableSpan
                    title={t.title}
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
