import { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "Сырки", isDone: false },
    { id: v1(), title: "Конфеты", isDone: false },
    { id: v1(), title: "Чай", isDone: false },
    { id: v1(), title: "Авокадо", isDone: false },
    { id: v1(), title: "Зелень", isDone: false },
    { id: v1(), title: "Сыр", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksFilted = tasks;
  if (filter === "active") {
    tasksFilted = tasks.filter((item) => item.isDone === false);
  }
  if (filter === "completed") {
    tasksFilted = tasks.filter((item) => item.isDone === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  function changeStatus(taskId: string, changeIsDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = changeIsDone;
    }
    setTasks([...tasks]);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function removeTask(id: string) {
    let filteredTask = tasks.filter((item) => item.id !== id);
    setTasks(filteredTask);
  }

  return (
    <div className="App">
      <TodoList
        title="Что купить"
        tasks={tasksFilted}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}
export default App;
