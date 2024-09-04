import { Button, Input } from "@mui/material";
import React,{ ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
import "./styles/app.scss";
import "./styles/addItemForm.scss";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  title: string;
};
export const AddItemForm = React.memo((props: AddItemFormPropsType) =>{
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  console.log("AddItemForm");

  const [textField, setTextField] = useState<boolean>(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };
  const addItem = () => {
    newTaskTitle.trim() !== "" && props.addItem(newTaskTitle.trim())
    setNewTaskTitle("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      addItem();
      setTextField(false);
    }
  };
  const handleOnBlur = (e: FocusEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value) addItem();
    setTextField(false);
  };

  const addItemNew = () => {
    setTextField(true);
  };

  return (
    <div className="add">
      {textField ? (
        <div
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
      )}
    </div>
  );
});
