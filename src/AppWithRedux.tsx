import "./styles/App.css";
import { TaskType, TodoList } from "./TodoList";
import { AddItemForm } from "./AddItemForm";
import Logo from "./Logo";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todolists-reducer";
import {
  addTasksAC,
  changeTaskTitleAC,
  changeTasksStatusAC,
  removeTasksAC,
} from "./state/tasks-reducer";
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
  const todolists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasksObj = useSelector<AppRootState, TaskStateType>(
    (state) => state.tasks
  );
  // Tasks
  function changeStatus(
    taskId: string,
    changeIsDone: boolean,
    todoListId: string
  ) {
    dispatch(changeTasksStatusAC(todoListId, taskId, changeIsDone));
  }
  function changeTaskTitle(
    todoListId: string,
    taskId: string,
    newTitle: string
  ) {
    dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
  }
  function addTask(todoListId: string, title: string) {
    dispatch(addTasksAC(todoListId, title));
  }
  function removeTask(id: string, todoListId: string) {
    dispatch(removeTasksAC(id, todoListId));
  }
  // TodoList
  function removeTodoList(todoListId: string) {
    dispatch(removeTodoListAC(todoListId));
    dispatch(removeTodoListAC(todoListId));
  }
  function addTodolist(title: string) {
    dispatch(addTodoListAC(title));
    dispatch(addTodoListAC(title));
  }
  function changeTodoListTitle(todoListId: string, newtitle: string) {
    dispatch(changeTodoListTitleAC(todoListId, newtitle));
  }
  // убрать
  // function changeFilter(value: FilterValuesType, todolistId: string) {
  //   let todolist = todolists.find((item) => item.id == todolistId);
  //   if (todolist) {
  //     todolist.filter = value;
  //     dispatchToTodolistsReducer([...todolists]);
  //   }
  // }
  return (
    <div className="App">
      <Logo />
      <section>
        {/* <AddItemForm addItem={addTodolist} /> */}
        <div className="todoList">
          {todolists.map((item) => {
            let tasksObjFilted = tasksObj[item.id];

            if (item.filter === "active") {
              tasksObjFilted = tasksObjFilted.filter((i) => i.isDone === false);
            }
            if (item.filter === "completed") {
              tasksObjFilted = tasksObjFilted.filter((i) => i.isDone === true);
            }
            return (
              <TodoList
                key={item.id}
                id={item.id}
                title={item.title}
                tasks={tasksObjFilted}
                removeTask={removeTask}
                // changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                // filter={item.filter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
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
