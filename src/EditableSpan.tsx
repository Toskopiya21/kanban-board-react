import { Input, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return editMode ? (
    <Input
      defaultValue={title}
      onChange={editTitle}
      onBlur={activateViewMode}
      onKeyDown={(e) => (e.key === "Enter" ? activateViewMode() : 0)}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
