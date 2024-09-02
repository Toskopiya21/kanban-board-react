import "./styles/App.css";
import { TaskType, TodoList } from "./TodoList";
import { AddItemForm } from "./AddItemForm";
import Logo from "./Logo";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todolists-reducer";

import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );
  // const tasksObj = useSelector<AppRootState, TaskStateType>(
  //   (state) => state.tasks
  // );
  function removeTodoList(todoListId: string) {
    dispatch(removeTodoListAC(todoListId));
  }
  function addTodolist(title: string) {
    dispatch(addTodoListAC(title));
  }
  function changeTodoListTitle(todoListId: string, newTitle: string) {
    dispatch(changeTodoListTitleAC(todoListId, newTitle));
  }

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
