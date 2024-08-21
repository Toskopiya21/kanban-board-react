import { Button } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./addItemForm.scss";
export type AddItemFormPropsType = {
  addItem: (title: string) => void;
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

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={handleKeyPress}
        className={error ? "error" : ""}
      />
      <Button onClick={addItem} variant="contained" className="newItemFormBtn">
        +
      </Button>
      {error && <div className="error-massage">{error}</div>}
    </div>
  );
}
