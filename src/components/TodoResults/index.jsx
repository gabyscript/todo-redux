import React, {useEffect, useState} from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const todos = useSelector((state) => state.todos)
  const [doneTodosQuantity, setDoneTodosQuantity] = useState(0)
  const [missingTodoQuantity, setMissingTodoQuantity] = useState(todos.length)

  useEffect(() => {
    const backupTodos = todos;
    const filteredMissingTodos = backupTodos.filter((t) => {return t.checked === false})
    const filteredDoneTodos = backupTodos.filter((t) =>{ return t.checked === true});
    setDoneTodosQuantity(filteredDoneTodos.length);
    setMissingTodoQuantity(filteredMissingTodos.length)
  }, [todos])

  return <div className="todo-results">Done: {doneTodosQuantity} <br/> Missing Task: {missingTodoQuantity} </div>;
};

export default TodoResults;
