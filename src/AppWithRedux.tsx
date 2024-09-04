import "./styles/App.css";
import { TaskType, TodoList } from "./TodoList";
import { AddItemForm } from "./AddItemForm";
import {Logo} from "./Logo";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todolists-reducer";

import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import {useCallback} from "react";

export type TodolistType = {
  id: string;
  title: string;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {

  console.log("AppWithRedux");
  // debugger
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );

  const removeTodoList = useCallback((todoListId: string) => {
  // function removeTodoList(todoListId: string) {
    dispatch(removeTodoListAC(todoListId));
  },[dispatch]);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodoListAC(title));
  }, [dispatch]);

  const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
  // function changeTodoListTitle(todoListId: string, newTitle: string) {
    dispatch(changeTodoListTitleAC(todoListId, newTitle));
  },[dispatch]);

  return (
    <div className="App">
      <Logo />
      <section>
        <div className="todoList">
          {todoLists.map((item) => {
            return (
              <TodoList
                key={item.id}
                id={item.id}
                title={item.title}
                addItem={addTodolist}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
              />
            );
          })}
          <AddItemForm
            addItem={addTodolist}
            title="+ Создать новую колонку"
          ></AddItemForm>
        </div>
      </section>
    </div>
  );
}
export default AppWithRedux;