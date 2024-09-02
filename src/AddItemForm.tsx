import { Button, Input } from "@mui/material";
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
import "./styles/app.scss";
import "./styles/addItemForm.scss";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  title: string;
  // addTask: (todoListId: string, title: string) => void;
  // children: React.ReactNode;
  // changeTaskTitle: (
  //   taskId: string,
  //   newTitle: string,
  //   todolistId: string
  // ) => void;
  //   id: string;
};
export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  // @ts-expect-error @typescript-eslint/no-unused-vars 'error'
  const [error, setError] = useState<string | null>(null);
  const [textField, setTextField] = useState<boolean>(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };
  const addItem = () => {
    setError(null);
    newTaskTitle.trim() !== ""
      ? props.addItem(newTaskTitle.trim())
      : setError("Title is required");
    setNewTaskTitle("");
    setNewTaskTitle("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.ctrlKey && e.key === "Enter") {
      addItem();
      setTextField(false);
    }
  };
  const handleOnBlur = (e: FocusEvent<HTMLDivElement, Element>) => {
    setError(null);
    const value = (e.target as HTMLInputElement).value;
    if (value) addItem();
    setTextField(false);

    // if (e.ctrlKey && e.key === "Enter") {
    //   addItem();
    // }
  };

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
          // className="focutAddTaskTitle"
          className="todoBlock"
          onBlur={handleOnBlur}
          onChange={onChangeHandler}
          onKeyDown={handleKeyPress}
        >
          <Input autoFocus multiline className="titleInput" />
        </div>
      ) : (
        <Button className="newItemFormBtn" onClick={addItemNew} variant="text">
          {props.title}
        </Button>

        // <Fab color="secondary" aria-label="add">
        //   <AddIcon />
        // </Fab>
        // <div onClick={addItemNew}>{props.title}</div>
      )}
    </div>
  );
}
