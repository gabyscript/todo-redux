import React from "react";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoForm from "./components/TodoForm";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoForm />
    </div>
  );
};

export default App;
