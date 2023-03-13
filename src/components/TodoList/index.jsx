import React, {useEffect, useState} from "react";
import "./styles.css";
import TodoListItem from "../../components/TodoListItem/index";
import { useSelector, useDispatch } from "react-redux";
import { getTodosData, checkTodo, deleteTodo } from "../../redux/todoSlice";
import {ToastContainer, toast} from 'react-toastify';
import { Container } from "react-bootstrap";
import { RingLoader } from "react-spinners";

import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos);
  const [loading, setLoading] = useState(false);

  const Toast = {
    position: 'top-right',
    autoClose: 3000,
  }

  const loadPage = () => {
    setLoading(true);
    new Promise(resolve => setTimeout(() => { setLoading(false);}, 2000))
  }

  useEffect(() => {
    loadPage()
    dispatch(getTodosData())
  }, [dispatch])


  const handleDelete = (todoId) => {
    dispatch(deleteTodo({todoId}))
  };

  const toggleCheck = (todoId, isChecked) => {
    dispatch(checkTodo({todoId, isChecked: !isChecked}))
    
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        {loading ?  (
          <Container fluid className="d-flex justify-content-center align-items-center" >
            <RingLoader size={150} color={'#e40d0d'} loading={loading} />
          </Container> ) : 
          (todos.length === 0 ? (
            <div className="no-todos">
              Looks like you&apos;re absolutely free today! 
            </div>) : 
          todos.map(todo => {
            return (<TodoListItem key={todo.id} id={todo.id} label={todo.label} checked={todo.checked} 
              onCheck={() => {toggleCheck(todo.id, todo.checked) }} 
              onDelete={() => {handleDelete(todo.id)}}/>)}))}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default TodoList;
