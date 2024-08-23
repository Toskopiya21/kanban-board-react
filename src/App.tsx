import { useState } from "react";
import "./styles/App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import Logo from "./Logo";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();
  let todoListId3 = v1();
  let todoListId4 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todoListId1, title: "Задачи", filter: "all" },
    { id: todoListId2, title: "В работе", filter: "all" },
    { id: todoListId3, title: "Ожидает проверки", filter: "all" },
    { id: todoListId4, title: "Готово", filter: "all" },
  ]);

  let [tasksObj, settasksObj] = useState<TaskStateType>({
    [todoListId1]: [
      { id: v1(), title: "Добавить прелоадер", isDone: false },
      { id: v1(), title: "Выполнить редизайн проекта", isDone: false },
    ],
    [todoListId2]: [],
    [todoListId3]: [],
    [todoListId4]: [],
  });
  function changeTodoListTitle(newtitle: string, todolistId: string) {
    let todolist = todolists.find((item) => item.id == todolistId);
    if (todolist) {
      todolist.title = newtitle;
      setTodolists([...todolists]);
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((item) => item.id == todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  function changeStatus(
    taskId: string,
    changeIsDone: boolean,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId];

    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = changeIsDone;
      settasksObj({ ...tasksObj });
    }
  }
  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId];

    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      settasksObj({ ...tasksObj });
    }
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newtasksObj = [newTask, ...tasks];
    tasksObj[todolistId] = newtasksObj;
    settasksObj({ ...tasksObj });
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTask = tasks.filter((item) => item.id !== id);
    tasksObj[todolistId] = filteredTask;
    settasksObj({ ...tasksObj });
  }

  function removeTodoList(todolistId: string) {
    let filteredTask = todolists.filter((item) => item.id !== todolistId);
    setTodolists(filteredTask);

    delete tasksObj[todolistId];
    settasksObj({ ...tasksObj });
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodolists([...todolists, todolist]);
    settasksObj({ ...tasksObj, [todolist.id]: [] });
  }

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
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={item.filter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
              />
            );
          })}
          <AddItemForm addItem={addTodolist} title="+ Создать новую колонку">
            {/* <Fab aria-label="add" className="fab" color="secondary">
              <AddIcon />
            </Fab> */}
          </AddItemForm>
        </div>
      </section>
    </div>
  );
}
export default App;
