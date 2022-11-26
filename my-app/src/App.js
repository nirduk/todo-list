import React from "react";
import "./main.css";

const App = () => {
  const todoData = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = React.useState(todoData || []);

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Todo List</h1>
        <AddTodo setTodos={setTodos} todos={todos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
      <Footer />
    </div>
  );
};

const TodoList = ({ todos, setTodos }) => {
  const handleToggleTodo = (item) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id
        ? {
          ...todo,
          done: !todo.done
        }
        : todo
    );
    setTodos(updatedTodos);
  };

  if (!todos.length) {
    return <p>No tasks for today</p>;
  }

  return (
    <ul>
      {todos.map((item) => (
        <li key={item.id} >
          <span className="li-text"
            onClick={() => handleToggleTodo(item)}
            style={{textDecoration: item.done ? "line-through 2px var(--red-dark)" : ""}}
          >
            {item.text}
          </span>
          <div className="line"></div>
          <DeleteTodo item={item} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
};

const AddTodo = ({ setTodos, todos }) => {
  const inputRef = React.useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const newTask = {
      id: Math.random(),
      text,
      done: false
    };

    setTodos((prevTodos) => {
      return text === "" ? prevTodos : prevTodos.concat(newTask);
    });

    inputRef.current.value = "";
  };

  localStorage.setItem("todos", JSON.stringify(todos));

  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" ref={inputRef} placeholder="add new todo item" />
      <div className="line-black"></div>
      <button type="submit">add new</button>
    </form>
  );
};

const DeleteTodo = ({ item, setTodos }) => {
  const handleDeleteTodo = () => {
    const confirmed = window.confirm("Do you want to delete this item?");

    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== item.id);
      });
    }
  };

  return (
    <button className="delete" onClick={handleDeleteTodo}>
      delete
    </button>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      by{" "}
      <a href="https://github.com/nirduk" target="_blank" rel="noreferrer">
        <span className="f1">K</span>
        <span className="f2">u</span>
        <span className="f3">d</span>
        <span className="f4">r</span>
        <span className="f5">i</span>
        <span className="f6">n</span>
      </a>
    </div>
  );
};

export default App;