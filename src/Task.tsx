import React, {ChangeEvent, useCallback, useState} from "react";
import "./styles/App.css";
import {EditableSpan} from "./EditableSpan";
import "./styles/todoList.scss";
import {LongMenu} from "./Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from '@mui/material/Checkbox';
import {TaskType} from "./TodoList.tsx";
import {changeTasksStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer.ts";
import {useDispatch} from "react-redux";


export type TaskPropsType = {
    // onRemoveHandler: (taskId: string, todoListId: string) => void;
    // onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    // onCheckedTitleHandler: (todoListId: string, taskId: string, title: string) => void;
    task: TaskType;
    todoListId: string
};

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = useCallback(() =>
        dispatch(removeTasksAC(props.task.id, props.todoListId)), [dispatch, props.task.id, props.todoListId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTasksStatusAC(props.todoListId, props.task.id, e.currentTarget.checked)), [dispatch, props.todoListId, props.task.id])
    const onCheckedTitleHandler = useCallback((newValue: string) =>
        dispatch(changeTaskTitleAC(props.task.id, props.todoListId, newValue)), [dispatch, props.task.id, props.todoListId])

    console.log("Task")
    // const onRemoveHandler =  useCallback(() => props.onRemoveHandler(props.task.id, props.todoListId),[props.task.id, props.todoListId, props.onRemoveHandler]);
    // const onChangeHandler =  useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     props.onChangeHandler(e);
    // },[props.todoListId, props.task.id, props.onChangeHandler]);
    //
    // const onCheckedTitleHandler = useCallback((newValue: string) => {
    //     props.onCheckedTitleHandler(props.task.id, props.todoListId, newValue)
    // },[props.task.id, props.todoListId, props.onCheckedTitleHandler]);

    const setAnchorEl = useState<null | HTMLElement>(null)[1];

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <li key={props.task.id}>
            <div className="tCheckbox">
                <Checkbox
                    onChange={onChangeHandler}
                    checked={props.task.isDone}
                    className={props.task.isDone ? "is-done" : ""}
                />
                <span
                    className={props.task.isDone ? "is-done" : ""}
                >
              <EditableSpan
                  title={props.task.title}
                  onChange={onCheckedTitleHandler}
              />
            </span>
            </div>
            <LongMenu onRemove={onRemoveHandler}>
                <MenuItem onClick={handleClose} className="menuItem">
                    <div onClick={onRemoveHandler} className="menuTask">
                        <DeleteIcon fontSize="inherit"/>
                        Удалить
                    </div>
                </MenuItem>
            </LongMenu>
        </li>
    )
})