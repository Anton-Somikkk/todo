// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/actions/creators/todo";

import styles from "./index.module.css";

export function AddTodo() {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const onInputChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleAddTodo = () => {
    dispatch(addTodo(value));
    setValue("");
  };

  return (
    <div>
      <input type="text" value={value} onChange={onInputChange} />
      <button type="button" className={styles.addButton} onClick={handleAddTodo}>
        Add todo
      </button>
    </div>
  );
}
