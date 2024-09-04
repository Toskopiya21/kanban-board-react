import { Input } from "@mui/material";
import {ChangeEvent, useCallback, useState} from "react";
import * as React from "react";

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) =>{
  console.log("EditableSpan")

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);

  const activateEditMode = useCallback(() => {
    setEditMode(true);
  }, [])

  const activateViewMode = useCallback(() => {
    setEditMode(false);
    props.onChange(title);
  }, [props.onChange])

  const editTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [])

  return editMode ? (
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
})
