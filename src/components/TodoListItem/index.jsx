import React from "react";
import "./styles.css";
import { Button } from "react-bootstrap";

const TodoListItem = ({ onCheck, checked, onDelete, label }) => (
  <div className="todo-list-item">
    <div
      tabIndex="0"
      role="checkbox"
      aria-checked
      className="todo-list-item-content"
    >
      <input
        tabIndex="-1"
        type="checkbox"
        checked={checked}
        onChange={onCheck}
      />
      <span className={checked ? "todo-list-item-checked" : ""}>{label}</span>
    </div>
    <Button variant="danger" className="d-flex justify-content-center align-items-center" id="todo-list-item-delete" onClick={onDelete}>X</Button>
  </div>
);

export default TodoListItem;
