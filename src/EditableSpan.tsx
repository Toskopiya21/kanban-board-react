import { Input } from "@mui/material";
import { ChangeEvent, useState } from "react";

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
  edit: boolean;
};

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return editMode || props.edit ? (
    <Input
      defaultValue={title}
      onChange={editTitle}
      onBlur={activateViewMode}
      onKeyDown={(e) => (e.key === "Enter" ? activateViewMode() : 0)}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
}
