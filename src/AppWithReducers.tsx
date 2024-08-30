import { useReducer } from "react";
import "./styles/App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import Logo from "./Logo";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTasksAC,
  changeTaskTitleAC,
  changeTasksStatusAC,
  removeTasksAC,
  tasksReducer,
} from "./state/tasks-reducer";
export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  let todoListId1 = v1();
  let todoListId2 = v1();
  let todoListId3 = v1();
  let todoListId4 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todoListId1, title: "Задачи", filter: "all" },
    { id: todoListId2, title: "В работе", filter: "all" },
    { id: todoListId3, title: "Ожидает проверки", filter: "all" },
    { id: todoListId4, title: "Готово", filter: "all" },
  ]);

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: "Добавить прелоадер", isDone: false },
      { id: v1(), title: "Выполнить редизайн проекта", isDone: false },
    ],
    [todoListId2]: [],
    [todoListId3]: [],
    [todoListId4]: [],
  });

  // Tasks
  function changeStatus(
    taskId: string,
    changeIsDone: boolean,
    todoListId: string
  ) {
    dispatchToTasksReducer(
      changeTasksStatusAC(todoListId, taskId, changeIsDone)
    );
  }
  function changeTaskTitle(
    todoListId: string,
    taskId: string,
    newTitle: string
  ) {
    dispatchToTasksReducer(changeTaskTitleAC(todoListId, taskId, newTitle));
  }
  function addTask(todoListId: string, title: string) {
    dispatchToTasksReducer(addTasksAC(todoListId, title));
  }
  function removeTask(id: string, todoListId: string) {
    dispatchToTasksReducer(removeTasksAC(id, todoListId));
  }
  // TodoList
  function removeTodoList(todoListId: string) {
    dispatchToTodolistsReducer(removeTodoListAC(todoListId));
    dispatchToTasksReducer(removeTodoListAC(todoListId));
  }
  function addTodolist(title: string) {
    dispatchToTodolistsReducer(addTodoListAC(title));
    dispatchToTasksReducer(addTodoListAC(title));
  }
  function changeTodoListTitle(todoListId: string, newtitle: string) {
    dispatchToTodolistsReducer(changeTodoListTitleAC(todoListId, newtitle));
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
export default AppWithReducers;
