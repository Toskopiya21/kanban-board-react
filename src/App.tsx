import { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "Сырки", isDone: true },
    { id: 2, title: "Конфеты", isDone: false },
    { id: 3, title: "Чай", isDone: true },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("completed");

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
  function removeTask(id: number) {
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
      />
    </div>
  );
}
export default App;
