import React, {useCallback} from "react";
import "./styles/App.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import "./styles/todoList.scss";
import {LongMenu} from "./Menu";
import useRandomColor from "./hooks/useRandomColor";
import {addTasksAC} from "./state/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import {Task} from "./Task.tsx";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
export type PropsType = {
    id: string;
    title: string;
    addItem: (title: string) => void;
    removeTodoList: (todolistId: string) => void;
    changeTodoListTitle: (newTitle: string, todolistId: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {
    console.log("TodoList");

    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, Array<TaskType>>(
        (state) => state.tasks[props.id]
    );

    const {color, handleColorChange} = useRandomColor();
    const borderTop = `solid 7px ${color.hex}`;
    const backgroundColor = `${color.rgb}`;

    const onRemoveTodoList = useCallback(() => props.removeTodoList(props.id), [props.id, props.removeTodoList]);
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }, [props.id, props.changeTodoListTitle]);

    const addItem = useCallback((title: string) => {
        dispatch(addTasksAC(props.id, title))
    }, [props.id, dispatch])

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
                            <DeleteIcon fontSize="inherit"/>
                            Удалить
                        </div>
                    </MenuItem>
                </LongMenu>
            </div>
            <AddItemForm addItem={addItem} title="+ Добавить задачу"/>
            <ul className="todoItem">
                {tasks.map((t) => <Task
                    key={t.id}
                    // onRemoveHandler={() => dispatch(removeTasksAC(t.id, props.id))}
                    // onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeTasksStatusAC(props.id, t.id, e.currentTarget.checked))}
                    // onCheckedTitleHandler={(newValue: string) => dispatch(changeTaskTitleAC(t.id, props.id, newValue))}
                    task={t}
                    todoListId={props.id}/>)}
            </ul>
        </div>
    );
});
