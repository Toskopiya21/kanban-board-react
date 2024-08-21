import { Button, Input } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./app.scss";
import "./addItemForm.scss";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  // changeTaskTitle: (
  //   taskId: string,
  //   newTitle: string,
  //   todolistId: string
  // ) => void;
  //   id: string;
};
export function AddItemForm(props: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };
  const addItem = () => {
    setError(null);

    newTaskTitle.trim() !== ""
      ? props.addItem(newTaskTitle.trim())
      : setError("Title is required");
    setNewTaskTitle("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.ctrlKey && e.key === "Enter") {
      addItem();
    }
  };
  let [error, setError] = useState<string | null>(null);
  let [textField, setTextField] = useState<boolean>(false);
  const addItemNew = () => {
    setTextField(true);
  };
  return (
    <div className="add">
      {/* <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={handleKeyPress}
          className={error ? "error" : ""}
        />
        {error && <div className="error-massage">{error}</div>}
      </div> */}

      {/* <Button className="newItemFormBtn" onClick={addItem} variant="text">
        Add
      </Button> */}
      {textField ? (
        <div
          className="focutAddTaskTitle .active"
          onBlur={() => {
            setTextField(false);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? setTextField(false) : 0)}
        >
          <Input autoFocus />
        </div>
      ) : (
        <Button className="newItemFormBtn" onClick={addItemNew} variant="text">
          + Добавить задачу
        </Button>
      )}
    </div>
  );
}
