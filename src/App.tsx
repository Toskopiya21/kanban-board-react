import "./App.css";
import { TaskType, TodoList } from "./TodoList";

function App() {
  let tasks1: Array<TaskType> = [
    { id: 1, title: "Сырки", isDone: true },
    { id: 2, title: "Конфеты", isDone: false },
    { id: 3, title: "Чай", isDone: true },
  ];
  let tasks2: Array<TaskType> = [
    { id: 1, title: "Omsk", isDone: true },
    { id: 2, title: "Kurgan", isDone: true },
    { id: 3, title: "Moscow", isDone: false },
  ];
  return (
    <div className="App">
      <TodoList title="Что купить" tasks={tasks1} />
      <TodoList title="Куда поехать" tasks={tasks2} />
    </div>
  );
}
export default App;
