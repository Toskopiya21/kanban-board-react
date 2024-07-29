import { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

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

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todoListId1, title: "Что купить", filter: "active" },
    { id: todoListId2, title: "Что изучить", filter: "completed" },
  ]);

  let [tasksObj, settasksObj] = useState<TaskStateType>({
    [todoListId1]: [
      { id: v1(), title: "Сырки", isDone: false },
      { id: v1(), title: "Конфеты", isDone: false },
      { id: v1(), title: "Чай", isDone: false },
      { id: v1(), title: "Авокадо", isDone: false },
      { id: v1(), title: "Зелень", isDone: false },
      { id: v1(), title: "Сыр", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "JS", isDone: true },
    ],
  });

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
    setTodolists([todolist, ...todolists]);
    settasksObj({ ...tasksObj, [todolist.id]: [] });
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />

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
          />
        );
      })}
    </div>
  );
}
export default App;
